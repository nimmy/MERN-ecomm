import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

// import products from '../data/Product';


const Home = () => {

  const {data: products, isLoading, error} = useGetProductsQuery();
  // console.log(products, isLoading, error, 'Nimesh Mehra');
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products');
  //     setProducts(data);
  //   }

  //   fetchProducts();
  // }, []);

  return (
    <>
      {isLoading ? (<Loader />) : error ? (<Message variant='danger'><h2>{error?.message || error?.errror}</h2></Message>) : (
        <>
          <h1>Latest Products</h1>
          <Row>
              {products.map((product) => {
                  return <Col key={product._id} sm={12} md={6} lg={4} xl={3}><Product product={product} /></Col>
              })}
          </Row>
        </>
      ) }
    </>
  )
}

export default Home