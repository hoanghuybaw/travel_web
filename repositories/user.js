const login = async ({email, password}) => {
    console.log('login user in repo');
}

const register = async ({ name , email, password , phoneNumber, address }) => {
    // validation done
    console.log(' resgister with params with name ' + name + email + password + phoneNumber + address);
}

export default {
    login, 
    register
}