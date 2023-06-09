import { body, validationResult } from "express-validator";
import {
    userRepositories,
} from "../repositories/index.js";
import { EventEmitter } from 'node:events'
import HttpStatusCode from '../exception/HttpStatusCode.js'
import Exception from "../exception/Exception.js";

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
    const { name, email, password, phoneNumber, address, gender } = req.body;
    myEvent.emit('event.register.user',  req.body )
    try {
        debugger
       let user = await userRepositories.register({ name, email, password, phoneNumber, address , gender })
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Register user successfully",
            data: user
        });
    } catch (exception) {
        debugger
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(), 
        })
    }
};

const getDetailUser = async (req, res) => { };

export default {
    login,
    register,
    getDetailUser,
};
