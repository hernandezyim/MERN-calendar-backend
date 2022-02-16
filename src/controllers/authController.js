import { isSignUp } from "../middlewares/validations/user.js";
import saveDB from "../helpers/saveDB.js";
import generateJwt from "../helpers/generateJwt.js";

export const signUp = async (req, res) => {
  try {
    const userCredentials = req.body;

    if (await isSignUp(userCredentials)) {
      return res
        .status(409)
        .json({ ok: false, msg: "El correo electrónico esta en uso" });
    }

    const { id, name } = await saveDB(userCredentials);

    const token = generateJwt(id, name);

    res.status(201).json({ id, name, token });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await isSignUp(req.body);

    if (!user) {
      return res.status(400).json({
        msg: "Correo electrónico y/o contraseña incorrecta",
      });
    }
    const { id, name } = user;
    const token = generateJwt(id, name);

    res.json({ id, name, token });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const renewToken = (req, res) => {
  const { id, name } = req.payload;

  const token = generateJwt(id, name);

  res.json({ id, name, token });
};
