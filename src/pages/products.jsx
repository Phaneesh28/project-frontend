import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import ProductList from '../components/productsList';
import '../styles/products.css';
import Cookies from 'js-cookie';
import { TailSpin } from 'react-loader-spinner';

// Centralize backend URL for easier updates
const BACKEND_URL = 'https://project-backend-sxfe.onrender.com';

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwtToken');
      if (!jwtToken) {
        setErrorMessage('You are not authorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/products`, {
          headers: { authorization: `Bearer ${jwtToken}` },
        });
        setProductList(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Authorization failed. Please log in again.');
        } else {
          setErrorMessage('Failed to fetch products. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const loadingScreen = () => (
    <div className="loader-container">
      <TailSpin color="#00BFFF" height={100} width={100} />
    </div>
  );

  const errorScreen = () => (
    <div className="error-message">
      <h2>{errorMessage}</h2>
    </div>
  );

  return (
    <Layout>
      <div className="product-container">
        <h1>Products</h1>
        {loading ? (
          loadingScreen()
        ) : errorMessage ? (
          errorScreen()
        ) : (
          <div className="card-container">
            {productList.map((item) => (
              <ProductList key={item.id} prods={item} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
