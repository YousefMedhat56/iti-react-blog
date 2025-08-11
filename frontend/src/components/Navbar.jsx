import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';
import './Navbar.css';

function CustomNavbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Navbar.Brand href="/" className="brand">My Blog</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" className="toggle-btn" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto">
          <Nav.Link href="/" className="nav-link">Home</Nav.Link>
          <Nav.Link href="/dashboard" className="nav-link">Dashboard</Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-light" type="submit" className="search-btn">Go</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
