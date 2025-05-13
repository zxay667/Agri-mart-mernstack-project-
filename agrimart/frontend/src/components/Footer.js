import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={4} className='text-center py-3'>
            <h5>AgriMart</h5>
            <p>Your trusted source for high-quality farming supplies</p>
          </Col>
          <Col md={4} className='text-center py-3'>
            <h5>Quick Links</h5>
            <ul className='list-unstyled'>
              <li><a href='/' className='text-white'>Home</a></li>
              <li><a href='/about' className='text-white'>About Us</a></li>
              <li><a href='/contact' className='text-white'>Contact</a></li>
              <li><a href='/terms' className='text-white'>Terms & Conditions</a></li>
            </ul>
          </Col>
          <Col md={4} className='text-center py-3'>
            <h5>Contact Us</h5>
            <p>Email: info@agrimart.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            <p>&copy; {new Date().getFullYear()} AgriMart - All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
