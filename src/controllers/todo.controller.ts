import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import { User, Todo } from "../models";
import Api from "../helpers/api";
import { jwtSecret } from "../config/database";

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const { token } = req.cookies;
    if (!title) {
      return Api.badRequest(res, "title required");
    }
    if (token) {
      const { id }: any = jwt.decode(token);
      if (id) {
        Todo.create({
          title,
          Author: id,
        })
          .then((todo: any) => {
            Api.created(res, "Todo created successfully", todo);
          })
          .catch((error: any) => {
            if (error.code === 11000) {
              return Api.badRequest(res, "Todo already created");
            } else {
              Api.badRequest(res, error);
            }
          });
      }
    } else {
      Api.unAuthorized(res, "Not authorized");
    }
  } catch (error: any) {
    Api.badRequest(res, error);
  }
};

const getTodoByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.cookies;
    const { id }: any = jwt.decode(token);
    const TodoListByUser = await Todo.find().where("Author").equals(id);
    if (TodoListByUser) {
      await Api.success(res, "ToDo List Get Successfully", TodoListByUser);
    } else {
      Api.badRequest(res, "Todo List Get Fail");
    }
  } catch (error: any) {
    Api.badRequest(res, error);
  }
};

const updateTodoStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title } = req.body;

  if (!id) {
    return Api.badRequest(res, "id not found");
  }
  if (!title) {
    return Api.badRequest(res, "title required");
  }

  try {
    Todo.findByIdAndUpdate(id, { title }, { new: true }).then((result: any) => {
      Api.created(res, "Todo update successfully", result);
    });
  } catch (error: any) {
    Api.badRequest(res, error.message);
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await Todo.findById(id)
    .then((todo: any) => todo.remove())
    .then((todo: any) => Api.created(res, "Todo successfully deleted", todo))
    .catch((error: any) => Api.badRequest(res, error.message));
};

export default {
  createTodo,
  getTodoByUser,
  updateTodoStatus,
  deleteTodo,
};
