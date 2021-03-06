import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Container, Header } from 'semantic-ui-react'
import axios from 'axios';

import { authenticationService } from '../services/authentication.service'

import Message from '../components/Message'

import { api } from '../api';

const Login = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(api.auth.login, {
            username, email, password
        }).then(res => {
            localStorage.setItem('token', res.data.key)
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
            <Header>Login to your account!</Header>
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
                        value={password}
                        type='password'
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Field>
                <Button primary fluid type='submit' loading={loading} disabled={loading}>Submit</Button>
            </Form>
        </Container>
    )
}

export default Login
