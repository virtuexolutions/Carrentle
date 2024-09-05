import { put, get, post } from "./http_provider";

const SERVICE_URLS = {
    login: 'login',
    register: 'register'
}

const Login = data => {
    console.log(data, 'dataaaaaaaaaaaa')
    post(SERVICE_URLS.login, data);
}

const Signup = data =>  post(SERVICE_URLS.register, data)



export const apiServices = {
    Login,
    Signup
}
