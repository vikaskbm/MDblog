import React, { useState, useEffect } from 'react'
import { Header } from 'semantic-ui-react'
import axios from 'axios'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'


const BASE_URL = 'http://localhost:8000'

const PostDetail = () => {
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const {postSlug} = useParams()

    useEffect(() => {
        setLoading(true) 
        async function fetchData() {
            setLoading(true)
            try {
                const res = await axios.get(`${BASE_URL}/api/post/${postSlug}`)
                setPost(res.data)
                setLoading(false)
            } catch(err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Header>{post && post.title}</Header>
            {error && <Message negative message={error}/>}
            {loading && <Loader />}
            {post && (
                <p>
                    {post.content}
                </p>
            )}
        </>
    )
}

export default PostDetail
