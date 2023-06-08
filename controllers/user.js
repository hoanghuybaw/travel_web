import { body, validationResult } from "express-validator";
import {
    userRepositories,
} from "../repositories/index.js";
import { EventEmitter } from 'node:events'
import HttpStatusCode from '../exception/HttpStatusCode.js'

const myEvent = new EventEmitter()
myEvent.on('event.register.user', (params) => {
    console.log(`they talk ablout: ${JSON.stringify(params)}`);
})

const login = async (req, res) => {
    debugger;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //call repository
    await userRepositories.login({ email, password });
    res.status(HttpStatusCode.OK).json({
        message: "Login user successfully",
        data: "detail user",
    });
};

const register = async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
    await userRepositories.register({ name, email, password, phoneNumber, address })
    myEvent.emit('event.register.user',  req.body )
    res.status(HttpStatusCode.INSERT_OK).json({
        message: "Register user successfully",
    });
};

const getDetailUser = async (req, res) => { };

export default {
    login,
    register,
    getDetailUser,
};
