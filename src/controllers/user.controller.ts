import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";
import Api from "../helpers/api";
import { jwtSecret } from "../config/database";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return Api.badRequest(res, "user name , password fields are required");
    }

    if (password.length < 6) {
      return Api.badRequest(res, "Password less than 6 characters");
    }
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
      })
        .then((user: { _id: any; role: any }) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id, username }, jwtSecret, {
            expiresIn: maxAge,
          });
          Api.created(res, "User Register successfully", { token: token });
        })
        .catch((error: any) => {
          if (error.code === 11000) {
            return Api.badRequest(res, "User already register");
          }
          Api.badRequest(res, error.message);
        });
    });
  } catch (error: any) {
    Api.badRequest(res, error);
  }
};
const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    Api.badRequest(res, "user name , password fields are required");
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      Api.badRequest(res, "Invalid Credential");
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id, username }, jwtSecret, {
            expiresIn: maxAge,
          });
          Api.ok(res, "Login successfully", { token: token });
        } else {
          Api.badRequest(res, "Invalid Credential");
        }
      });
    }
  } catch (error: any) {
    Api.badRequest(res, error.message);
  }
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization || "";
    const { id, username }: any = jwt.decode(token);
    if (id) {
      await Api.success(res, "Profile detail fetch successfully", {
        id,
        username,
      });
    } else {
      Api.badRequest(res, "Profile detail Get Fail");
    }
  } catch (error: any) {
    console.log("basd");
    Api.badRequest(res, error);
  }
};

export default {
  register,
  login,
  getProfile,
};
