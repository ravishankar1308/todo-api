import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/database";
import Api from "../helpers/api";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || "";
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return Api.unAuthorized(res, "Not authorized");
      } else {
        if (decodedToken) {
          return Api.unAuthorized(res, "Not authorized");
        } else {
          next();
        }
      }
    });
  } else {
    return Api.unAuthorized(res, "Not authorized, token not available");
  }
};

module.exports = verifyUser;
