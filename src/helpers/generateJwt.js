import jwt from "jsonwebtoken";

const generateJwt = (uid, name) => {
  const payload = { uid, name };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

export default generateJwt;
