import { Request, Response, NextFunction } from "express";
import todo from "../controllers/todo.controller";
// @ts-ignore
import verifyUser from "../middleware/verifyUser";

export const TodoRoute = (app: any) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
    next();
  });

  app.post("/api/todo/create", verifyUser, todo.createTodo);

  app.get("/api/user/todo", verifyUser, todo.getTodoByUser);

  app.patch("/api/todo/:id", verifyUser, todo.updateTodoStatus);

  app.delete("/api/todo/:id", verifyUser, todo.deleteTodo);
};
