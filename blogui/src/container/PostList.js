import React, { useState, useEffect } from 'react'
import { Header, Divider, Image, Item } from 'semantic-ui-react'
import axios from 'axios'

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
                console.log(res.data)
                setPosts(res.data)
                setLoading(false)
            } catch(err) {
                setError(err)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Header>Post List</Header>
            <Divider />
            <Item.Group>
                {posts?.map(post => {
                    return (
                    <Item>
                        <Item.Image size='small' src={post.thumbnail} />
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
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
