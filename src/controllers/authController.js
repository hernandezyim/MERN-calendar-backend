import { isSignUp } from "../middlewares/validations/user.js";
import saveDB from "../helpers/saveDB.js";
import generateJwt from "../helpers/generateJwt.js";

export const signUp = async (req, res) => {
  try {
    const user = req.body;

    if (await isSignUp(user)) {
      return res.status(409).json({ ok: false, msg: "Email already in use" });
    }

    const { id } = await saveDB(user);

    const token = generateJwt(id);

    res.status(201).json({ ok: true, token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal error", error });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await isSignUp(req.body);

    if (!user)
      return res.status(401).json({
        ok: false,
        msg: "Email or password incorrect",
      });

    const token = generateJwt(user.id);

    res.json({ ok: true, token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal error", error });
  }
};

export const renewToken = (req, res) => {
  const { id } = req.payload;

  const token = generateJwt(id);

  res.json({ ok: true, token });
};
