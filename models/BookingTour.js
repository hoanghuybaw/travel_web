import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('BookingTour',
    new Schema({
        id: { type: ObjectId },
        tourId: {
            type: String,
            required: true, // NOT NULL
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        numberChildren: {
            type: String,
            required: true,
        },
        numberPeople: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
    })
)