import React, { useRef, useState } from 'react'
import { Button, Form, Header, Image } from 'semantic-ui-react'

import { Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Message from '../components/Message'
import Loader from '../components/Loader'

import { authAxios } from '../services/authentication.service';
import { api } from '../api'
import { useFetch } from '../helpers'

const PostUpdateForm = ({postSlug, initialTitle, initialThumbnail, initialContent}) => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const [title, setTitle] = useState(initialTitle)
    const [content, setContent] = useState(initialContent)
    const [currentThumbnail, setCurrentThumbnail] = useState(initialThumbnail)
    const [thumbnail, setThumbnail] = useState(null)
    
    const mdParser = new MarkdownIt();
    const navigate = useNavigate();
    const fileInputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        if(thumbnail) {
            formData.append("thumbnail", thumbnail)
        }
        authAxios
            .put(api.posts.update(postSlug), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(res => {
                setLoading(false)
                navigate('/');
            }).catch(err => {
                setLoading(false)
                setError(err.message)
            })
    }
     
    return (
        <>
            <Header>Post Update</Header>
            {error && <Message negative message={error}/>}

            {currentThumbnail && <Image src={currentThumbnail} size="small" />}
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input 
                        placeholder='Title of your post' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>
                </Form.Field>

                <MdEditor 
                    value={content}
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
        </>
    )
}

const PostUpdate = () => {
    const {postSlug} = useParams()
    const { data, loading, error } = useFetch(api.posts.retrieve(postSlug))
    if(data && data.is_author === false) {
        return <Navigate to='/' />
    }
    return (
        <>
            {error && <Message negative message={error}/>}
            {loading && <Loader />}
            {data && <PostUpdateForm 
                postSlug={postSlug}
                initialTitle={data.title} 
                initialThumbnail={data.thumbnail} 
                initialContent={data.content}/>
            }
        </>
    )

}
export default PostUpdate
