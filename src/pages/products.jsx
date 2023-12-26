import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import ProductList from '../components/productsList'
import '../styles/products.css'
import Cookies from 'js-cookie'

const Products = () => {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwtToken')
      axios
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

  return (
    <Layout>
      <div className='product-container'>
        <h1>products</h1>
        <div className='card-container'>
          {productList.map((item) => {
            return <ProductList prods={item} key={item.id} />
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Products
