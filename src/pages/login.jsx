import { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import '../styles/landingpage.css'
import { TailSpin } from 'react-loader-spinner'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const loginSuccess = (token) => {
    Cookies.set('jwtToken', token, { expires: 30 })
    history.replace('/')
  }

  const verifyLogin = async (e) => {
    e.preventDefault()
    if (username === '' || password === '') {
      return setShowMessage('Please enter username and password')
    }
    setLoading(true)
    const encoded = btoa(password)
    await axios
      .post('https://devstorebhargav.onrender.com/api/login', {
        username,
        password: `${encoded}`,
      })
      .then((res) => {
        const token = res.data.token
        loginSuccess(token)
      })
      .catch((e) => {
        console.log(e)
        setShowMessage(e.response.data)
        setLoading(false)
      })
    setUsername('')
    setPassword('')
  }

  const registerUser = async (e) => {
    e.preventDefault()
    if (username === '' || password === '' || email === '' || phone === '') {
      return setShowMessage('Please enter all the details')
    }
    await axios
      .post('https://devstorebhargav.onrender.com/api/register', {
        username,
        password,
        email,
        phone,
      })
      .then((res) => {
        alert(res.data)
        setShowLogin(true)
      })
      .catch((e) => {
        console.log(e)
        setShowMessage(e.response)
      })
    setUsername('')
    setPassword('')
    setEmail('')
    setPhone('')
  }

  const loginForm = () => {
    return (
      <form className='login-card'>
        <input
          id='username'
          required={true}
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id='password'
          type='password'
          required={true}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <span onClick={() => setShowLogin(false)}>Not a User? signUp</span>
        </div>
        <div>{showMessage}</div>
        <button type='submit' onClick={verifyLogin}>
          Login
        </button>
      </form>
    )
  }

  const registerForm = () => {
    return (
      <form className='register-card'>
        <input
          id='username'
          required={true}
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id='password'
          type='password'
          required={true}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id='email'
          type='email'
          required={true}
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id='phone'
          type='tel'
          placeholder='Mobile Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div>
          <span onClick={() => setShowLogin(true)}>Already a User? Login</span>
        </div>
        <div>{showMessage}</div>
        <button type='submit' onClick={registerUser}>
          Submit
        </button>
      </form>
    )
  }

  const jwtToken = Cookies.get('jwtToken')
  if (jwtToken !== undefined) {
    return <Redirect to='/' />
  } else {
    if (loading) {
      return (
        <div className='loader-container'>
          <TailSpin color='#00BFFF' height={100} width={100} />
        </div>
      )
    } else {
      return (
        <div className='main-container'>
          {showLogin ? loginForm() : registerForm()}
        </div>
      )
    }
  }
}

export default LandingPage
