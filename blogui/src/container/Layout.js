import React from 'react'
import Navbar from '../components/Navbar'
import { Container } from 'semantic-ui-react'


const Layout = ({children}) => {
    return (
        <>
            <Navbar />
            <Container text style={{ marginTop: '7em' }}>
                {children}
            </Container>
        </>
    )
}

export default Layout
