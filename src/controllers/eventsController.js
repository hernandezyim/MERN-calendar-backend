import saveDB from "../helpers/saveDB.js";
import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const events = await Event.find().populate("User", "name");

  res.json({
    ok: "true",
    events,
  });
};

export const createEvent = async (req, res) => {
  try {
    const event = req.body;
    const userId = req.payload.id;

    event.user = userId;

    const eventSaved = await saveDB(event);

    res.json({ ok: true, event: eventSaved });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal error", error });
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
      ok: true,
      eventUpdated,
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal error", error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = req.event;
    await Event.deleteOne({ _id: event.id });

    res.json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal error", error });
  }
};
