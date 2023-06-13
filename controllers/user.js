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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //call repository
    try {
        let exsitingUser = await userRepositories.login({ email, password });
        res.status(HttpStatusCode.OK).json({
            message: "Login user successfully",
            data: exsitingUser,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(), 
        })
    }
};

const register = async (req, res) => {
    const { name, email, password, phoneNumber, address, gender, permissionUser } = req.body;
    myEvent.emit('event.register.user',  req.body )
    try {
       let user = await userRepositories.register({ name, email, password, phoneNumber, address , gender , permissionUser})
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Register user successfully",
            data: user
        });
    } catch (exception) {
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
