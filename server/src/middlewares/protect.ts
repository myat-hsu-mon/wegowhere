import { NextFunction, Request, Response } from "express";
import { promisify } from "util";

const jwt = require("jsonwebtoken");

import { jsonWebToken } from "../env";
import { User } from "../models/users.model";

const { secretKey } = jsonWebToken;

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("protect");
    //get token from header
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.json({
        status: 401,
        message: "Provide token to authenticate",
      });
    }

    //if token exists, verify this token
    const decoded = await promisify(jwt.verify)(token, secretKey);
    const { id, iat } = decoded;
    //if verified, check whether employee exists
    const user = await User.findById(id);
    //if not user, return error
    if (!user) {
      return res.json({
        status: 401,
        message: "No users exist with this token",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("protect Error: >>> \b", err);
  }
};
