import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
const jwt = require("jsonwebtoken");

import { User } from "../models/users.model";

import { jsonWebToken } from "../env";
import { handleAsync, sendResponse } from "../utils";

const { secretKey } = jsonWebToken;

export const protect = handleAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get token from header
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return sendResponse(res, 401, "Provide token to authenticate");
    }

    //if token exists, verify this token
    const decoded = await promisify(jwt.verify)(token, secretKey);
    const { id, iat } = decoded;
    //if verified, check whether employee exists
    const user = await User.findById(id);
    //if not user, return error
    if (!user) {
      return sendResponse(res, 401, "No users exist with this token");
    }
    req.user = user;
    next();
  }
);
