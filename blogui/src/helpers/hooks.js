import {useState, useEffect } from "react"
import axios from "axios"
import { authAxios, authenticationService } from "../services/authentication.service"

function useFetch(url, initialState=null ) {
    const [data, setData] = useState(initialState)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true) 
        async function fetchData() {
            setLoading(true)
            try {
                let ax = axios
                if(authenticationService.isAuthenticated) {
                    ax = authAxios
                }
                const res = await ax.get(url) 
                setData(res.data)
                setLoading(false)
            } catch(err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return {
        data,
        error,
        loading
    }
}

export {useFetch}