import React from 'react'
import Header from './header'
import '../App.css'

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  )
}

export default Layout
