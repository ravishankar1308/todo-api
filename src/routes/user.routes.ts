import { Request, Response, NextFunction } from "express";
import user from "../controllers/user.controller";

export const UserRoute = (app: any) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
    );
    next();
  });

  app.post("/api/login", user.login);

  app.post("/api/register", user.register);

  app.get("/api/profile", user.getProfile);
};
