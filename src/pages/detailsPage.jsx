import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import axios from 'axios'
import Cookies from 'js-cookie'
import { TailSpin } from 'react-loader-spinner'
import '../styles/prodsComponent.css'

const DetailsPage = (props) => {
  const [details, setDetails] = useState()
  useEffect(() => {
    const getData = () => {
      const { match } = props
      const id = match.params.id
      const token = Cookies.get('jwtToken')

      axios
        .get(`https://devstorebhargav.onrender.com/api/products/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setDetails(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    return () => getData()
  })

  const loadingScreen = () => {
    return (
      <div className='loader-container'>
        <TailSpin color='#00BFFF' height={100} width={100} />
      </div>
    )
  }

  return (
    <Layout>
      <div className='details-container'>
        {details !== undefined ? (
          <div className='product-view'>
            <div className='views'>
              <img
                src={details.image}
                alt={details.productName}
                width='350px'
                height='300px'
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
        ) : (
          loadingScreen()
        )}
      </div>
    </Layout>
  )
}

export default DetailsPage
