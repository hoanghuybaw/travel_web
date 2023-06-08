import { print, OutputType } from "../helpers/print.js"

const login = async ({email, password}) => {
    print('login user in repo', OutputType.INFORMATION);
}

const register = async ({ name , email, password , phoneNumber, address }) => {
    // validation done
    print(' resgister with params with name ' + name + email + password + phoneNumber + address, OutputType.INFORMATION);
}

export default {
    login, 
    register
}