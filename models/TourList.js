import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model('TourList',
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true, // NOT NULL
            validate: {
                validator: (value) => value.length > 3,
                message: 'Username must be at least 3 characters'
            }
        },
        timeStart: {
            type: Date,
            validate: {
                validator: (value) => value >= new Date(),
                message: 'timeStart must be greater than current date'
            },
            required: true,
        },
        timeTo: {
            type: Date,
            validate: {
                validator: (value) => value >= this.timeStart,
                message: 'timeTo must be greater than timeStart'
            },
            required: true,
        },
        detail: {
            type: String,
        },
        numberPeople: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },

    })
)