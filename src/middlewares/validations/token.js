import { header } from "express-validator";
import jwt from "jsonwebtoken";

import validateResult from "./validateResult.js";

const isValidToken = (token, { req }) => {
  try {
    req.payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return true;
  } catch (error) {
    return;
  }
};
export const validateToken = [
  header("x-access-token").exists().notEmpty().custom(isValidToken),
  validateResult,
];
