import { Response, Request } from "express";

const jwt = require("jsonwebtoken");

import { User } from "../models/users.model";
import { verifyPassword } from "../utils";
import { jsonWebToken } from "../env";

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

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: 400,
      message: "Please fill email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await verifyPassword(password, user.password))) {
    return res.json({
      status: 400,
      message: "Invalid email or password",
    });
  }

  const token = signToken(user._id.toString());

  res.status(200).json({
    status: "success",
    message: "You are signed in successfully!",
    data: {
      token,
      user,
    },
  });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        status: 400,
        message: "User already exists",
      });
    }

    const newUser = await User.create(req.body);
    newUser.save();
    const token = signToken(newUser._id.toString());

    res.json({
      status: 200,
      data: {
        user: newUser,
        token,
      },
    });
  } catch (err) {}
};
