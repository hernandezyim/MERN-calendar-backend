import saveDB from "../helpers/saveDB.js";
import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const events = await Event.find().populate("User", "name");

  res.json({
    events,
  });
};

export const createEvent = async (req, res) => {
  try {
    const event = req.body;
    const userId = req.payload.id;

    event.user = userId;

    const eventSaved = await saveDB(event);

    res.json({ event: eventSaved });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = req.event;

    const newEvent = {
      ...req.body,
      user: req.payload.id,
    };

    const eventUpdated = await Event.findByIdAndUpdate(event.id, newEvent, {
      new: true,
    });

    res.json({
      eventUpdated,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = req.event;
    await Event.deleteOne({ _id: event.id });

    res.status(200).json({});
    // TODO: refactorizar
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error });
  }
};
