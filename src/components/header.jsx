import Cookies from 'js-cookie'
import React from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'

function Header() {
  const history = useHistory()
  const logout = () => {
    Cookies.remove('jwtToken')
    return history.replace('/login')
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Dev Store
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav d-flex'>
            <li className='nav-item '>
              <Link className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/products'>
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/cart'>
                Cart
              </Link>
            </li>
            <li>
              <button onClick={logout} className='btn btn-outline-primary'>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
