import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  res.status(400).json({ ok: false, errors: errors.mapped() });
};

export default validateResult;
