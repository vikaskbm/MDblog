import React, { useState } from 'react'
import { Form, Button, Container, Header } from 'semantic-ui-react'

import Message from '../components/Message'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
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
                        value={userName}
                        type='text'
                        onChange={e => setUserName(e.target.value)}/>
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
