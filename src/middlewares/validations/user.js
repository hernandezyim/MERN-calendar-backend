import { body } from "express-validator";
import bcryptjs from "bcryptjs";
const { compareSync } = bcryptjs;

import validateResult from "./validateResult.js";
import User from "../../models/User.js";

export const validateSignUp = [
  body("name").exists().notEmpty(),
  body("email").exists().notEmpty().isEmail(),
  body("password").exists().notEmpty().isLength({ min: 6 }),
  validateResult,
];

export const validateSignIn = [
  body("email").exists().notEmpty().isEmail(),
  body("password").exists().notEmpty(),
  validateResult,
];

export const isSignUp = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) return;

  if (!compareSync(password, user.password)) return;

  return user;
};
