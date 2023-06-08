import { print, OutputType } from "../helpers/print.js"
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong username or password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static WRONG_CONNECT_MONGOOSEBD = "cannot connect to mongoose"
    constructor(message) {
        super(message)
        print(message, OutputType.ERROR)
    }
}