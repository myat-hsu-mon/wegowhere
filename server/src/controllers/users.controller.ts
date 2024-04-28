import { Request, Response } from "express";

import { User } from "../models/users.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json({
      status: 200,
      data: users,
    });
  } catch (err) {}
};

export const getOtherUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json({
      status: 200,
      data: user,
    });
  } catch (err) {}
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    console.log({ user });
    return res.json({
      status: 200,
      data: user,
    });
  } catch (err) {}
};

export const deleteMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user._id });
    return res.json({
      status: 204,
      data: user,
    });
  } catch (err) {}
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.json({
        status: 404,
        message: "No User found with this ID",
      });
    }
    return res.json({
      status: 200,
      data: updatedUser,
    });
  } catch (err) {}
};
