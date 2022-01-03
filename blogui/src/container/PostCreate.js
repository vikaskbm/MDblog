import React, { useRef, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Message from '../components/Message'
import { api } from '../api'

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    
    const mdParser = new MarkdownIt();
    const fileInputRef = useRef()
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("thumbnail", thumbnail)
        axios
            .post(api.posts.create, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Token 4fd7510ac0dfb69e7e501334e8405c88ddf76a8e"
                }
            }).then(res => {
                setLoading(false)
                console.log('posts')
                navigate('/');
            }).catch(err => {
                setLoading(false)
                setError(err.message)
            })
    }
    return (
        <div>
            <Header>Create a post</Header>
            {error && <Message negative message={error}/>}
            {thumbnail && <Message info message={`Selected Image: ${thumbnail.name}`}/>}
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input 
                        placeholder='Title of your post' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>
                </Form.Field>

                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={({text}) => setContent(text) }
                />
                
                <Form.Field>
                    <Button 
                        fluid
                        content='Choose a thumbnail' 
                        labelPosition='left' 
                        icon='file'
                        type='button'
                        onClick={ () => fileInputRef.current.click() }    
                    />
                    <input 
                        ref={fileInputRef} 
                        type="file" 
                        hidden
                        onChange={e => setThumbnail(e.target.files[0])}
                    />
                </Form.Field>

                <Button primary fluid type='submit' loading={loading} disabled={loading}>Submit</Button>
            </Form>
        </div>
    )
}

export default PostCreate