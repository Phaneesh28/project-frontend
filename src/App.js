import { Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './pages/login'
import Home from './pages/home'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './pages/products'
import Cart from './pages/cart'
import DetailsPage from './pages/detailsPage'
import Error from './pages/error'

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={LandingPage} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/products' component={Products} />
      <ProtectedRoute exact path='/products/:id' component={DetailsPage} />
      <ProtectedRoute exact path='/cart' component={Cart} />
      <Route exact path='/404-Error' component={Error} />
      <Redirect to='/404-Error' />
    </Switch>
  )
}

export default App
