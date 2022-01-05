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

export default authAxios