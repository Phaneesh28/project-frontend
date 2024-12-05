import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TailSpin } from 'react-loader-spinner';
import '../styles/prodsComponent.css';

// Centralize backend URL
const BACKEND_URL = 'https://project-backend-sxfe.onrender.com';

const DetailsPage = (props) => {
  const [details, setDetails] = useState(null); // Initial state is null for better handling
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  useEffect(() => {
    const getData = async () => {
      const { match } = props;
      const id = match.params.id;
      const token = Cookies.get('jwtToken');

      if (!token) {
        setErrorMessage('You are not authorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setDetails(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Authorization failed. Please log in again.');
        } else if (error.response && error.response.status === 404) {
          setErrorMessage('Product not found.');
        } else {
          setErrorMessage('Failed to fetch product details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const productDetails = () => (
    <div className="product-view">
      <div className="views">
        <img
          src={details.image}
          alt={details.productName}
          width="350px"
          height="300px"
        />
      </div>
      <div>
        <h3>{details.productName}</h3>
        <p>{details.description}</p>
        <p>Price: ${details.price}</p>
        <p>Ram: {details.specs.ram}</p>
        <p>Storage: {details.specs.storage}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="details-container">
        {loading ? loadingScreen() : errorMessage ? errorScreen() : productDetails()}
      </div>
    </Layout>
  );
};

export default DetailsPage;
