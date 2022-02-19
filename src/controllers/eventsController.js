import jwt from "jsonwebtoken";

import eventIdTransform from "../helpers/EventIdTransform.js";
import saveDB from "../helpers/saveDB.js";
import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const eventsDB = await Event.find({ uid });

    const newEvents = eventsDB.map((event) => eventIdTransform(event));

    res.json({
      events: newEvents,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const addNewEvent = async (req, res) => {
  try {
    const event = req.body;
    event.uid = req.payload.uid;

    const eventDB = await saveDB(event);
    const newEvent = eventIdTransform(eventDB);

    res.json({ event: newEvent });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = req.body;
    event.uid = req.payload.id;

    const eventDB = await Event.findByIdAndUpdate(req.eventId, event, {
      new: true,
    });
    const newEvent = eventIdTransform(eventDB);

    res.json({
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.eventId });

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};
