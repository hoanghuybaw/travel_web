import { body, validationResult } from "express-validator";
import {
    userRepositories,
} from "../repositories/index.js";
import { EventEmitter } from 'node:events'
const myEvent = new EventEmitter()
myEvent.on('event.register.user', (params) => {
    console.log(`they talk ablout: ${JSON.stringify(params)}`);
})

const login = async (req, res) => {
    debugger;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //call repository
    await userRepositories.login({ email, password });
    res.status(200).json({
        message: "Login user successfully",
        data: "detail user",
    });
};

const register = async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
    await userRepositories.register({ name, email, password, phoneNumber, address })
    myEvent.emit('event.register.user',  req.body )
    res.status(201).json({
        message: "Register user successfully",
    });
};

const getDetailUser = async (req, res) => { };

export default {
    login,
    register,
    getDetailUser,
};
