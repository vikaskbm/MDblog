import React from 'react'
import { NavLink } from 'react-router-dom' 
import { Header, Divider, Item } from 'semantic-ui-react'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { useFetch } from '../helpers'


const PostList = () => {
    const { data, loading, error } = useFetch(api.posts.list)

    return (
        <>  
            <Header>Post List</Header>
            <Divider />
            {error && <Message negative message={error}/>}
            {loading && <Loader />}
            <Item.Group>
                {data?.map((post, id) => {
                    return (
                        <Item key={id}>
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
