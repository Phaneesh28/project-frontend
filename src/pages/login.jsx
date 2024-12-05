import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/landingpage.css';
import { TailSpin } from 'react-loader-spinner';

const BACKEND_URL = 'https://project-backend-sxfe.onrender.com';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const loginSuccess = (token) => {
    Cookies.set('jwtToken', token, { expires: 30 });
    history.replace('/');
  };

  const verifyLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setShowMessage('Please enter username and password');
    }
    setLoading(true);
    await axios
      .post(`${BACKEND_URL}/api/login`, {
        username,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        loginSuccess(token);
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data) {
          setShowMessage(e.response.data);
        } else {
          setShowMessage('Something went wrong. Please try again.');
        }
        setLoading(false);
      });
    setUsername('');
    setPassword('');
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!username || !password || !email || !phone) {
      return setShowMessage('Please enter all the details');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setShowMessage('Please enter a valid email');
    }
    if (phone.length < 10 || phone.length > 15) {
      return setShowMessage('Please enter a valid phone number');
    }
    await axios
      .post(`${BACKEND_URL}/api/register`, {
        username,
        password,
        email,
        phone,
      })
      .then((res) => {
        setShowMessage('Registration successful! Please log in.');
        setShowLogin(true);
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data) {
          setShowMessage(e.response.data);
        } else {
          setShowMessage('Something went wrong. Please try again.');
        }
      });
    setUsername('');
    setPassword('');
    setEmail('');
    setPhone('');
  };

  const loginForm = () => (
    <form className="login-card">
      <input
        id="username"
        required
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="password"
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <span onClick={() => setShowLogin(false)}>Not a User? Sign Up</span>
      </div>
      <div>{showMessage}</div>
      <button type="submit" onClick={verifyLogin}>
        Login
      </button>
    </form>
  );

  const registerForm = () => (
    <form className="register-card">
      <input
        id="username"
        required
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="password"
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        id="email"
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="phone"
        type="tel"
        placeholder="Mobile Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div>
        <span onClick={() => setShowLogin(true)}>Already a User? Login</span>
      </div>
      <div>{showMessage}</div>
      <button type="submit" onClick={registerUser}>
        Submit
      </button>
    </form>
  );

  const jwtToken = Cookies.get('jwtToken');
  if (jwtToken) {
    return <Redirect to="/" />;
  }
  if (loading) {
    return (
      <div className="loader-container">
        <TailSpin color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
  return (
    <div className="main-container">
      {showLogin ? loginForm() : registerForm()}
    </div>
  );
};

export default LandingPage;
