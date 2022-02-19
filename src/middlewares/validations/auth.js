import { body, header } from "express-validator";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const { compareSync } = bcryptjs;

import handleErrors from "./handleErrors.js";
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
  handleErrors,
];

export const validateSignIn = [
  body("email").exists(),
  body("password").exists(),
  handleErrors,
];

export const isSignUp = async (email) => {
  const user = await User.findOne({ email });

  if (user) return user;
};

export const isPasswordEqual = (userCredentialsPassword, password) => {
  return compareSync(userCredentialsPassword, password);
};

const isValidToken = (token, { req }) => {
  try {
    req.payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
export const validateToken = [
  header("x-access-token").trim().exists().notEmpty().custom(isValidToken),
  handleErrors,
];
