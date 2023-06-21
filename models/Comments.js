import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "Comments",
  new Schema({
    id: { type: ObjectId },
    UserId: {
      type: String,
    },
    name: {
      type: String,
    },
    numberPhone: {
      type: String,
    },
    commentsDetail: {
      type: String,
    },
    TourId: {
      type: String,
    },
  })
);
