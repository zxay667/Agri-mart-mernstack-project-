import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');

  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, selectedCategory));
  }, [dispatch, keyword, pageNumber, selectedCategory]);

  const categories = ['Tools', 'Seeds', 'Fertilizers', 'Pesticides', 'Other'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <div className='hero-section'>
            <Container>
              <Row>
                <Col md={8} className='mx-auto text-center'>
                  <h1 className='hero-title'>AgriMart - Farming Supplies</h1>
                  <p className='hero-subtitle'>
                    High-quality farming tools, seeds, and fertilizers. Boost your farm's productivity with trusted products!
                  </p>
                  <Button variant='success' size='lg'>
                    Shop Now
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
          <ProductCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      
      <div className='mb-4'>
        <Row>
          <Col className='d-flex justify-content-center flex-wrap'>
            <Button 
              variant={selectedCategory === '' ? 'success' : 'outline-success'} 
              className='m-1 category-pill'
              onClick={() => setSelectedCategory('')}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'success' : 'outline-success'}
                className='m-1 category-pill'
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </Col>
        </Row>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
