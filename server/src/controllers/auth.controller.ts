import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

import { jsonWebToken } from "../env";
import { User } from "../models/users.model";
import { handleAsync, sendResponse, verifyPassword } from "../utils";

declare module "express" {
  interface Request {
    user?: any;
  }
}

const { secretKey, expiresIn } = jsonWebToken;

const signToken = (id: string) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: expiresIn,
  });
};

export const signIn = handleAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, 400, "Please fill email and password");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await verifyPassword(password, user.password))) {
    return sendResponse(res, 400, "Invalid email or password");
  }

  const token = signToken(user._id.toString());

  return sendResponse(res, 200, "You are signed in successfully", {
    token,
    user,
  });
});

export const signUp = handleAsync(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return sendResponse(res, 400, "User already exists");
  }

  const newUser = await User.create(req.body);
  newUser.save();
  const token = signToken(newUser._id.toString());

  return sendResponse(res, 200, "You are signed up successfully", {
    user: newUser,
    token,
  });
});
