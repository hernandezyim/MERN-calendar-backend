import { body } from "express-validator";
import bcryptjs from "bcryptjs";
const { compareSync } = bcryptjs;

import validateResult from "./validateResult.js";
import User from "../../models/User.js";

const isMach = (password2, { req }) => {
  const password = req.body.password;

  if (password2 !== password) return Promise.reject();

  return Promise.resolve();
};

export const validateSignUp = [
  body("name").trim().exists(),
  body("email").trim().exists().isEmail(),
  body("password").trim().exists().isLength({ min: 6 }),
  body("password2").trim().exists().custom(isMach),
  validateResult,
];

export const validateSignIn = [
  body("email").exists(),
  body("password").exists(),
  validateResult,
];

export const isSignUp = async (email) => {
  const user = await User.findOne({ email });

  if (user) return user;
};

export const isPasswordEqual = (userCredentialsPassword, password) => {
  return compareSync(userCredentialsPassword, password);
};
