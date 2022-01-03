import React, { useRef, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import Message from '../components/Message'

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const [markdown, setMarkdown] = useState('')
    const [thumbnail, setThumbnail] = useState('')

    const fileInputRef = useRef()
    return (
        <div>
            <Header>Create a post</Header>
            {thumbnail && <Message info message={`Selected Image: ${thumbnail.name}`}/>}
            <Form>
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
                        onClick={ () => fileInputRef.current.click() }    
                    />
                    <input 
                        ref={fileInputRef} 
                        type="file" 
                        hidden
                        onChange={e => setThumbnail(e.target.files[0])}
                    />
                </Form.Field>

                <Button primary fluid type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default PostCreate