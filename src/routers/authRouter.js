import { Router } from "express";

import { renewToken, signUp, signIn } from "../controllers/authController.js";
import {
  validateSignUp,
  validateSignIn,
  validateToken,
} from "../middlewares/validations/auth.js";

const authRouter = Router();

authRouter.post("/sign_up", validateSignUp, signUp);
authRouter.post("/sign_in", validateSignIn, signIn);
authRouter.get("/", validateToken, renewToken);

export default authRouter;
