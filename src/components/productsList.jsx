import { Link } from 'react-router-dom'
import { useContext } from 'react'
import CartContext from '../Context/CartContext'
import '../styles/prodsComponent.css'

const ProductList = (props) => {
  const { productName, id, image, price } = props.prods
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    addToCart(props.prods)
    alert('Item added to cart')
  }

  return (
    <>
      <div className='card'>
        <Link style={{ color: 'white' }} to={`/products/${id}`}>
          <img src={image} alt={id} className='image' />
          <h4>{productName}</h4>
        </Link>
        <h6>${price}</h6>
        <button className='btn btn-primary' onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </>
  )
}
export default ProductList
