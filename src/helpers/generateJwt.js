import jwt from "jsonwebtoken";

const generateJwt = (id) => {
  const payload = { id };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

export default generateJwt;
