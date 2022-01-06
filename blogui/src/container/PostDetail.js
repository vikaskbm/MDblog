import React from 'react'
import { Container, Header, Image, Divider, Button } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams, NavLink } from 'react-router-dom'

import PostDeleteModal from './PostDelete'

import { api } from '../api'
import { useFetch } from '../helpers'


const PostDetail = () => {
    const {postSlug} = useParams()
    const { data, loading, error } = useFetch(api.posts.retrieve(postSlug))

    return (
        <Container style={{ paddingTop: 10, paddingBottom: 10}}>
            {error && <Message negative message={error}/>}
            {loading && <Loader />}
            {data && (
                <div>
                    <Image src={ data.thumbnail }/>
                    <Header as="h1">{data.title}</Header>
                    <Header as="h4">Last updated: {`${new Date(data.updated_at).toLocaleDateString()}`}</Header>
                    <ReactMarkdown>
                        {data.content}
                    </ReactMarkdown>
                    <Divider />
                    <NavLink to={`/post/${postSlug}/update`}>
                        <Button color='yellow'>
                            Update
                        </Button>
                    </NavLink>
                    <PostDeleteModal title={ data.title } postSlug={ postSlug } thumbnail={ data.thumbnail } />
                </div>
            )}
        </Container>
    )
}

export default PostDetail
