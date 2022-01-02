import React from 'react'
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png';

const Navbar = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='tiny' src={logo} style={{ marginRight: '1.5em' }} />
          MDblog
        </Menu.Item>
        <NavLink to='/'><Menu.Item as='li' > Posts </Menu.Item></NavLink>
        <NavLink to='/create'><Menu.Item as='li' > Create </Menu.Item></NavLink>
      </Container>
    </Menu>
  </div>
)

export default Navbar