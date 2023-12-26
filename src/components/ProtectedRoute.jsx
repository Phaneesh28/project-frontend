import Cookies from 'js-cookie'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get('jwtToken')
  if (jwtToken === undefined) {
    return <Redirect to='/login' />
  } else {
    return <Route {...props} />
  }
}
export default ProtectedRoute
