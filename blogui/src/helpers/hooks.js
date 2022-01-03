import {useState, useEffect } from "react"
import axios from "axios"

function useFetch(url, initialState=null ) {
    const [data, setData] = useState(initialState)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true) 
        async function fetchData() {
            setLoading(true)
            try {
                const res = await axios.get(url) 
                setData(res.data)
                setLoading(false)
            } catch(err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return {
        data,
        error,
        loading
    }
}

export {useFetch}