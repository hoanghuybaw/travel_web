import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model('User',
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
        email: {
            type: String,
            validate: {
                validator: (value) => isEmail,
                message: 'Email not incoreect formmat'
            }
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: (phoneNumber) => phoneNumber.length > 9,
                message: 'Phone Number must be at least 9 characters'
            }
        },
        address: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'female'],
                message: '{VALUE} is not support'
            },
        },
        permissionUser: {
            type: String,
            required: true,
        }
    })
)