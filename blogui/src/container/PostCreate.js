import React, { useRef, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import axios from 'axios'

import Message from '../components/Message'

import { history } from '../helpers';

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const [markdown, setMarkdown] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(title)
        console.log(markdown)
        console.log(thumbnail)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("markdown", markdown)
        formData.append("thumbnail", thumbnail)
        console.log(formData)
        axios
            .post('http://127.0.0.1/8000/api/posts/create/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res)
                setLoading(false)
                history.push('/posts')

            }).catch(err => {
                setLoading(false)
                setError(err.message)
            })
    }
    const fileInputRef = useRef()
    return (
        <div>
            <Header>Create a post</Header>
            {error && <Message danger message={error}/>}
            {thumbnail && <Message info message={`Selected Image: ${thumbnail.name}`}/>}
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input 
                        placeholder='Title of your post' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>
                </Form.Field>

                <Form.TextArea 
                    label='Markdown Content' 
                    placeholder='This is your post content...' 
                    value={markdown}
                    onChange={e => setMarkdown(e.target.value) }
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