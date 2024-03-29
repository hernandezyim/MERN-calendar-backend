import Event from "../models/Event.js";
import User from "../models/User.js";
import encryptPassword from "./encryptPassword.js";

const saveDB = async (value) => {
  let element = {};

  if (!value.email) element = new Event(value);
  else {
    element = new User(value);
    element.password = encryptPassword(value.password);
  }
  await element.save();
  return element;
};

export default saveDB;
