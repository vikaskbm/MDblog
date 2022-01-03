import React, {useState} from 'react'
import { Container, Header, Image, Divider, Button, Modal } from 'semantic-ui-react'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'

import { api } from '../api'
import { useFetch } from '../helpers'


const DeleteModal = ({title, thumbnail}) => {
    const [open, toggle] = useState(false)

    return (
        <Modal
            trigger={<Button secondary floated='right' onClick={() => toggle(true)}>Delete</Button>}
            open={open}
            onClose={() => toggle(false)}
            size='small'
        >
            <Modal.Header>Delete Post</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={thumbnail} wrapped />
                <Modal.Description>
                <Header>Delete {title} </Header>
                <p>Are you sure you want to delete this post ?</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggle(false)}>
                    No
                </Button>
                <Button
                    positive
                    icon='checkmark'
                    content="Confirm"
                    labelPosition='right'
                    onClick={() => toggle(false)}
                />
            </Modal.Actions>
            
        </Modal>
    )
}


const PostDetail = () => {
    const {postSlug} = useParams()
    const { data, loading, error } = useFetch(api.posts.retrieve(postSlug))

    return (
        <Container>
            {error && <Message negative message={error}/>}
            {loading && <Loader />}
            {data && (
                <div>
                    <Image src={ data.thumbnail }/>
                    <Header as="h1">{data.title}</Header>
                    <Header as="h4">Last updated: {`${new Date(data.updated_at).toLocaleDateString()}`}</Header>
                    <p>
                        {data.content}
                    </p>
                    <Divider />
                    <DeleteModal props={data}/>
                </div>
            )}
        </Container>
    )
}

export default PostDetail
