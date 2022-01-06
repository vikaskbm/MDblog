import React from 'react'
import {
  Container,
  Image,
  Menu,
  Dropdown
} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png';
import { authenticationService } from '../services/authentication.service';

const linkStyle = {  
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center'
}

const Navbar = () => {
  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='tiny' src={logo} style={{ marginRight: '1.5em' }} />
            MDblog
          </Menu.Item>
          <NavLink to='/' style={linkStyle}><Menu.Item as='li' > Posts </Menu.Item></NavLink>
          {authenticationService.isAuthenticated ? (
            <>
                <NavLink to='/create' style={linkStyle}><Menu.Item as='li' > Create </Menu.Item></NavLink>
                <Dropdown text='Profile' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={authenticationService.logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </>
          ) : (
            <>
              <NavLink to='/login' style={linkStyle}><Menu.Item as='li' > Login </Menu.Item></NavLink>
              <NavLink to='/signup' style={linkStyle}><Menu.Item as='li' > Signup </Menu.Item></NavLink>
            </>
          )}
        </Container>
      </Menu>
    </div>
  )
}

export default Navbar