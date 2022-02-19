import { Router } from "express";

import {
  getEvents,
  addNewEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsController.js";
import {
  validateEvent,
  validateId,
} from "../middlewares/validations/events.js";
import { validateToken } from "../middlewares/validations/token.js";

const eventsRouter = Router();

eventsRouter.use(validateToken);

eventsRouter.get("/", getEvents);
eventsRouter.post("/", validateEvent, addNewEvent);
eventsRouter.put("/:id", validateEvent, validateId, updateEvent);
eventsRouter.delete("/:id", validateId, deleteEvent);

export default eventsRouter;
