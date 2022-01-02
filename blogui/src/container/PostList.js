import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom' 
import { Header, Divider, Item } from 'semantic-ui-react'
import axios from 'axios'

import Loader from '../components/Loader'
import Message from '../components/Message'


const BASE_URL = 'http://localhost:8000'

const PostList = () => {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true) 
        async function fetchData() {
            setLoading(true)
            try {
                const res = await axios.get(`${BASE_URL}/api/posts`)
                setPosts(res.data)
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
            <Header>Post List</Header>
            <Divider />
            {error && <Message negative message={error}/>}
            {loading && <Loader />}
            <Item.Group>
                {posts?.map(post => {
                    return (
                        <Item>
                                <Item.Image size='small' src={post.thumbnail} />
                                <Item.Content >
                                    <NavLink to={`/post/${post.slug}`}>
                                        <Item.Header as='h3'>{post.title}</Item.Header>
                                    </NavLink>
                                    <Item.Description>{post.content}</Item.Description>
                                </Item.Content>
                            </Item>
                    )
                })}
            </Item.Group>
        </>
    )
}

export default PostList
