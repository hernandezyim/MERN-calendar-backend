import { Router } from "express";

import { renewToken, signUp, signIn } from "../controllers/authController.js";
import { validateToken } from "../middlewares/validations/token.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middlewares/validations/user.js";

const authRouter = Router();

authRouter.post("/sign_up", validateSignUp, signUp);
authRouter.post("/sign_in", validateSignIn, signIn);
authRouter.get("/", validateToken, renewToken);

export default authRouter;
