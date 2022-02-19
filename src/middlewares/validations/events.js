import { body, param } from "express-validator";
import moment from "moment";

import Event from "../../models/Event.js";
import handleErrors from "./handleErrors.js";

const isValidId = async (eventId, { req }) => {
  try {
    await Event.findById(eventId);

    req.eventId = eventId;

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

const isValidDate = (date) => {
  if (!moment(date).isValid()) return Promise.reject();

  return Promise.resolve();
};

export const validateEvent = [
  body("title").trim().exists().notEmpty(),
  body("start").trim().exists().notEmpty().custom(isValidDate),
  body("end").trim().exists().notEmpty().custom(isValidDate),
  handleErrors,
];

export const validateId = [
  param("id").trim().exists().notEmpty().custom(isValidId),
  handleErrors,
];
