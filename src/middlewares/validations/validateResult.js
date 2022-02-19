import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();
  console.log(errors);
  res.status(400).json({ errors: errors.mapped() });
};

export default validateResult;
