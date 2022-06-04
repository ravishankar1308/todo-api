import { Request, Response, NextFunction } from "express";
import todo from "../controllers/todo.controller";

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

  app.post("/api/todo/create", todo.createTodo);

  app.get("/api/user/todo", todo.getTodoByUser);

  app.patch("/api/todo/:id", todo.updateTodoStatus);

  app.delete("/api/todo/:id", todo.deleteTodo);
};
