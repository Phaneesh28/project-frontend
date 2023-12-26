import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import ProductList from '../components/productsList'
import { TailSpin } from 'react-loader-spinner'
import '../styles/products.css'
import Cookies from 'js-cookie'

const Products = () => {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwtToken')
      await axios
        .get('https://devstorebhargav.onrender.com/api/products', {
          headers: { authorization: `Bearer ${jwtToken}` },
        })
        .then((res) => {
          setProductList(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    return () => getData()
  }, [productList])

  const loadingScreen = () => {
    return (
      <div className='loader-container'>
        <TailSpin color='#00BFFF' height={100} width={100} />
      </div>
    )
  }

  return (
    <Layout>
      <div className='product-container'>
        <h1>products</h1>
        {productList.length === 0 ? (
          loadingScreen()
        ) : (
          <div className='card-container'>
            {productList.map((item) => {
              return <ProductList prods={item} key={item.id} />
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Products
