import { print, OutputType } from "../helpers/print.js";
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong username or password";
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
    static WRONG_CONNECT_MONGOOSEBD = "cannot connect to mongoose";
    static USER_EXIT = "User already exists";
    static CANNOT_REGISTER_USER = "Cannot register user";
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password";
    constructor(message, validationErrors = {}) {
        super(message);
        print(message, OutputType.ERROR);
        this.validationErrors = validationErrors
    }
}
