import { Request, Response } from "express";

import { User } from "../models/users.model";
import { handleAsync, sendResponse } from "../utils";

export const getAllUsers = handleAsync(async (req: Request, res: Response) => {
  const users = await User.find();
  return sendResponse(res, 200, "All users are retrieved", users);
});

export const getOtherUser = handleAsync(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  return sendResponse(res, 200, "Other User is retrieved", user);
});

export const getMe = handleAsync(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  return sendResponse(res, 200, "Logged In user is retrieved", user);
});

export const deleteMe = handleAsync(async (req: Request, res: Response) => {
  const user = await User.findOneAndDelete({ _id: req.user._id });
  return sendResponse(res, 204, "Deactivated successfully", user);
});

export const updateMe = handleAsync(async (req: Request, res: Response) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return sendResponse(res, 404, "No User found with this ID");
  }
  return sendResponse(res, 200, "User is updated successfully", updatedUser);
});
