import React, {useState, useEffect} from 'react'

const BASE_URL = 'http://localhost:8000/'
const BlogList = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        fetch(BASE_URL+'api/blog/posts')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setData(data)
            setLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setLoading(false)
        })
    }, [])

    return (
        <div style={{ margin: 10, padding: 10}}>
            <h1>Post List</h1>
            {error && (
                <h4 style={{padding: 5, color: "red"}}> An error occured: {error} </h4>
            )}
            {loading ? <div>Loading...</div> : (
                <div>
                    {data && (
                        <div>There is data</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default BlogList
