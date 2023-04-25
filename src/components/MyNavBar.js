import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function MyNavBar({ toggleButton, setToggle }) {
  return (
    <>
      <Navbar bg="secondary" variant="dark" className='m-auto'>
        <Container>
          <Navbar.Brand>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>𝓛𝓞𝓖𝓞</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Registration</Link></Nav.Link>
            <Nav.Link><Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></Nav.Link>
            <Nav.Link><Link to='/todos' style={{ textDecoration: 'none', color: 'inherit' }}>Todo-List</Link></Nav.Link>

            {
              toggleButton ?
                <Nav.Link onClick={() => {
                  setToggle(false)
                  localStorage.removeItem('TOKEN')
                }}>
                  <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link></Nav.Link>
                :
                <Nav.Link><Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link></Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
