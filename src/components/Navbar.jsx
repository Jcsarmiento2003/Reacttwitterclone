import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import twitterright from '../assets/logoright.jpg';
import './Navbar.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NavbarComponent = ({ user, handleLogout }) => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Navbar data-bs-theme="dark">
      <Container>
        <Row>
          <Col sm={12}>
            <Navbar.Brand href="#home">
              <img src={twitterright} width="60px" alt="Twitter right" />
            </Navbar.Brand>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Nav style={{ marginLeft: '10px' }} className="mt-1">
              <Nav.Link href="#for-you">For You</Nav.Link>
            </Nav>
          </Col>
          <Col sm={6}>
            <Nav style={{ marginLeft: '100px' }} className="mt-1">
              <Nav.Link href="#following">Following</Nav.Link>
            </Nav>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavDropdown
                  title={user ? `:User  ${user.username}` : 'Dropdown'}
                  id="basic-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('/settings')}>Settings</NavDropdown.Item>
                  <NavDropdown.Item href="#" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
  