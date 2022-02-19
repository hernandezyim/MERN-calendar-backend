import { validationResult } from "express-validator";

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();
  console.log(errors);
  res.status(400).send({ errors: errors.mapped() });
};

export default handleErrors;
