import route, { Router } from "express";

import * as authController from "../controllers/auth.controller";

export const authRouter: Router = route.Router();

authRouter.post("/sign-in", authController.signIn);
authRouter.post("/sign-up", authController.signUp);
