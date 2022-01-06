import axios from "axios";

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
function isAuthenticated() {
    const token = localStorage.getItem("token")
    return token !== null && token !== undefined
}

const authenticationService = {
    isAuthenticated: isAuthenticated(),
    logout
}

export { authAxios, authenticationService }