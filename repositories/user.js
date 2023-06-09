import { print, OutputType } from "../helpers/print.js"
import { User } from '../models/index.js'
import Exception from "../exception/Exception.js";
import bcrypt from 'bcrypt'

const login = async ({email, password}) => {
    print('login user in repo', OutputType.INFORMATION);
}

const register = async ({ name , email, password , phoneNumber, address , gender }) => {
    // validation done
    debugger
    let exsitingUser = await User.findOne({email}).exec()
    if (!!exsitingUser) {
        throw new Exception(Exception.USER_EXIT)
    }
    // const isMatched = await bcrypt.compare(password, exsitingUser.password)
    // if(!!isMatched) {

    // }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND))
    //isert to db 
    const newUser = await User.create({
        name, 
        email, 
        password: hashedPassword,
        phoneNumber,
        address,
        gender,
    })
    return {
        ...newUser._doc,
        password: 'Not show'
    }
    // print(' resgister with params with name ' + name + email + password + phoneNumber + address, OutputType.INFORMATION);
}

export default {
    login, 
    register
}