import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('TourismTypes',
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true, // NOT NULL
        },
        location: {
            type: Array,
        },
    })
)