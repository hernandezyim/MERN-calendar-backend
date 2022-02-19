import { isPasswordEqual, isSignUp } from "../middlewares/validations/user.js";
import saveDB from "../helpers/saveDB.js";
import generateJwt from "../helpers/generateJwt.js";

export const signUp = async (req, res) => {
  try {
    const userCredentials = req.body;

    if (await isSignUp(userCredentials.email)) {
      return res.status(409).json({ msg: "El correo electrónico esta en uso" });
    }
    const { id, name } = await saveDB(userCredentials);

    const token = generateJwt(id, name);

    res.status(201).json({ uid: id, name, token });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await isSignUp(email);

    if (!user || !isPasswordEqual(password, user.password)) {
      return res.status(400).json({
        msg: "Correo electrónico y/o contraseña incorrecta",
      });
    }
    const { id, name } = user;
    const token = generateJwt(id, name);

    res.json({ uid: id, name, token });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const renewToken = (req, res) => {
  const { uid, name } = req.payload;

  const token = generateJwt(uid, name);

  res.json({ uid, name, token });
};
