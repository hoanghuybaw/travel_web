import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('Discount',
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
        code: {
            type: String,
        },
        percentDiscount: {
            type: String,
        }
    })
)