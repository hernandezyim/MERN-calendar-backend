import bcryptjs from "bcryptjs";

const { genSaltSync, hashSync } = bcryptjs;

const encryptPassword = (password) => {
  const salt = genSaltSync();

  return hashSync(password, salt);
};

export default encryptPassword;
