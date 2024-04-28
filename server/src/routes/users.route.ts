import route, { Router } from "express";

import * as userController from "../controllers/users.controller";

export const usersRouter: Router = route.Router();

usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/me", userController.getMe);
usersRouter.get("/:id", userController.getOtherUser);
usersRouter.patch("/me", userController.updateMe);
usersRouter.delete("/me", userController.deleteMe);
