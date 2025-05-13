import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded product-card'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='div' className='my-2'>
          <span className='badge bg-success'>{product.category}</span>
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>

        <Link to={`/product/${product._id}`}>
          <Button variant='primary' className='w-100'>
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
