import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventsShema = new Schema(
  {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    uid: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Event", eventsShema, "Events");
