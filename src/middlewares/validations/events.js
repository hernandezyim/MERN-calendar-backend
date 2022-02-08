import { body, param } from "express-validator";
import Event from "../../models/Event.js";

import validateResult from "./validateResult.js";

const isValidId = async (eventId, { req }) => {
  try {
    const event = await Event.findById(eventId);
    const currentUserId = req.payload.id;
    const eventUserId = event.user.toString();

    if (!event || eventUserId !== currentUserId) return Promise.reject();

    req.event = event;

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
export const validateEvent = [
  body("title").exists().notEmpty(),
  body("start").exists().notEmpty().isDate(),
  body("end").exists().notEmpty().isDate(),
  validateResult,
];

export const validateId = [
  param("id")
    .exists()
    .notEmpty()
    .custom(isValidId)
    .withMessage("Unauthorized access or invalid id"),
  validateResult,
];
