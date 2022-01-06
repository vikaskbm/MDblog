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

function logout() {
    localStorage.removeItem("token")
}

function login(username, email, password) {
    axios.post(api.auth.login, {
        username, email, password
    }).then(res => {
        localStorage.setItem('token', res.data.key)
    })
}
function isAuthenticated() {
    const token = localStorage.getItem("token")
    return token !== null && token !== undefined
}

const authenticationService = {
    isAuthenticated: isAuthenticated(),
    logout,
    login
}

export { authAxios, authenticationService }