import React, { useContext } from 'react'
import Layout from '../components/layout'
import CartContext from '../Context/CartContext'
import '../styles/cart.css'
import { Link } from 'react-router-dom'
import { RiDeleteBin5Fill } from 'react-icons/ri'

function Cart() {
  const { cartItems, clearItem, addToCart, removeOneItem } =
    useContext(CartContext)

  return (
    <Layout>
      <div className='cart-container'>
        <h1>Cart</h1>
        {cartItems.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        width='80px'
                        height='50px'
                      />

                      <Link to={`/products/${item.id}`}> {item.name}</Link>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className='btn btn-secondary'
                        onClick={() => {
                          addToCart(item)
                        }}>
                        +
                      </button>
                      <button
                        className='btn btn-secondary'
                        onClick={() => removeOneItem(item)}>
                        -
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() => clearItem(item)}>
                        <RiDeleteBin5Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='4'>Total</td>
                  <td>
                    {cartItems
                      .reduce((total, item) => total + item.price, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <button className='btn btn-danger'>Checkout</button>
          </>
        ) : (
          <div className='nothing-container'>
            <h4>Cart is Empty</h4>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Cart
