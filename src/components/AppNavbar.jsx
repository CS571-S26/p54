import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function AppNavbar() {
  const location = useLocation()

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          CommercePulse
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/">
              Executive Overview
            </Nav.Link>
            <Nav.Link as={Link} to="/forecast">
              Forecast Lab
            </Nav.Link>
            <Nav.Link as={Link} to="/simulator">
              Scenario Simulator
            </Nav.Link>
            <Nav.Link as={Link} to="/data">
              Data Upload
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}