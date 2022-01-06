import axios from "axios";
import { api } from "../api";

const authAxios = axios.create()

authAxios.interceptors.request.use(config => {
    const newConfig = config;
    const token = localStorage.getItem("token")
    newConfig.headers = {
        "Authorization": `Token ${token}`
    }
    return newConfig
})

function isAuthenticated() {
    const token = localStorage.getItem("token")
    return token !== null && token !== undefined
}

function login(username, email, password) {
    axios.post(api.auth.login, {
        username, email, password
    }).then(res => {
        localStorage.setItem('token', res.data.key)
    })
}

function logout() {
    localStorage.removeItem("token")
}

function signup(username, email, password1, password2) {
    axios.post(api.auth.signup, {
        username, email, password1, password2
    }).then(res => {
        localStorage.setItem('token', res.data.key)
    })
}


const authenticationService = {
    isAuthenticated: isAuthenticated(),
    logout,
    login,
    signup
}

export { authAxios, authenticationService }