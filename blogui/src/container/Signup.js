import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Container, Header } from 'semantic-ui-react'

import { authenticationService } from '../services/authentication.service'

import Message from '../components/Message'

import { api } from '../api';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(api.auth.signup, {
            username, email, password1, password2
        }).then(res => {
            console.log("", res)
            setLoading(false)
            navigate('/')
        }).catch(err => {
            setLoading(false)
            setError(err.message || err)
        })
    }
    
    if(authenticationService.isAuthenticated) {
        return <Navigate replace to="/" />
    }

    return (
        <Container>
            <Header>Create a new account!</Header>
            {error && (
                <Message negative message={error} />
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input 
                        placeholder='Username' 
                        value={username}
                        type='text'
                        onChange={e => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input 
                        placeholder='Email' 
                        value={email}
                        type='email'
                        onChange={e => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input 
                        placeholder='********' 
                        value={password1}
                        type='password'
                        onChange={e => setPassword1(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input 
                        placeholder='********' 
                        value={password2}
                        type='password'
                        onChange={e => setPassword2(e.target.value)}/>
                </Form.Field>
                <Button primary fluid type='submit' loading={loading} disabled={password1!==password2}>Submit</Button>
            </Form>
        </Container>
    )
}

export default Login
