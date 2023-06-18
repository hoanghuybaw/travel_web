import mongoose, { Schema, ObjectId } from "mongoose";

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
            type: String,
            // validate: {
            //     validator: (value) => value >= new Date(),
            //     message: 'timeStart must be greater than current date'
            // },
            required: true,
        },
        timeTo: {
            type: String,
            // validate: {
            //     validator: (value) => value >= new Date(),
            //     message: 'timeStart must be greater than current date'
            // },
            required: true,
        },
        detail: {
            type: String,
        },
        numberPeople: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        Service: {
            type: Array,
        },
        day: {
            type: String,
            required: true,
        },
        night: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        priceChildren: {
            type: String,
        },
        thumbNail: {
            type: String,
            required: true,
        },
        images: [String]
    })
)