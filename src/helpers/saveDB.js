import Event from "../models/Event.js";
import User from "../models/User.js";
import encryptPassword from "./encryptPassword.js";

const saveDB = async (value) => {
  let element = {};

  if (value.email) {
    element = new User(value);

    element.password = encryptPassword(value.password);

    await element.save();
  } else {
    element = new Event(value);

    await element.save();
  }
  return element;
};

export default saveDB;
