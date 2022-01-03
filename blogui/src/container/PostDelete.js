import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal, Button, Image, Header } from 'semantic-ui-react'

import Message from '../components/Message'

import { api } from '../api'


const PostDeleteModal = ({title, postSlug, thumbnail}) => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [open, toggle] = useState(false)
    
    const navigate = useNavigate();

    function handleSubmit() {
        console.log('vikas');
        console.log(api.posts.delete(postSlug));
        setLoading(true);
        
        axios.delete(api.posts.delete(postSlug), {
            headers: {
                "Authorization": "Token 4fd7510ac0dfb69e7e501334e8405c88ddf76a8e"
            }
        }).then(res => {
            setLoading(false)
            navigate('/');
        }).catch(err => {
            setLoading(false)
            setError(err.message || err)
        })
    }

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
                    <Header>{title} </Header>
                    {error && <Message negative message={error}/>}
                    <p>Are you sure you want to delete this post?</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={ () => toggle(false) }>
                    No
                </Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content="Confirm"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                />
            </Modal.Actions>       
            
        </Modal>
    )
}

export default PostDeleteModal
