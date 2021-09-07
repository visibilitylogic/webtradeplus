import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { useSelector } from 'react-redux'
import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import ForgotPassword from '../pages/ForgotPassword'

import PrivateRoute from './PrivateRoute'

const Routes = () => {
  const { webData } = useSelector((state) => state.web)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [toggleRegister, setToggleRegister] = useState(false)

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
      case '/login':
        if (toggleRegister) {
          setToggleRegister(false)
        }
        break
      case '/signup':
        if (!toggleRegister) {
          setToggleRegister(true)
        }
        break
      default:
        break
    }
  }, [toggleRegister])

  return (
    <>
      {!isAuthenticated && (
        <Header
          data={webData}
          path={toggleRegister ? '/' : '/signup'}
          title={toggleRegister ? 'Login' : 'Register'}
          setToggleRegister={setToggleRegister}
        />
      )}

      <div style={{ background: '#f2f2f2' }}>
        <Switch>
          <Route
            path={['/', '/login']}
            exact
            component={(props) => (
              <Login
                {...props}
                data={webData}
                setToggleRegister={setToggleRegister}
              />
            )}
          />
          <Route
            path="/signup"
            exact
            render={(props) => (
              <Register
                {...props}
                data={webData}
                setToggleRegister={setToggleRegister}
              />
            )}
          />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path={`/dashboard`} component={Dashboard} />
          <PrivateRoute path={`/dashboard/:slug`} exact component={Admin} />
          <PrivateRoute path={`/dashboard`} component={Dashboard} />
          <PrivateRoute path={`/dashboard/admin/:slug`} component={Admin} />
        </Switch>
      </div>
      {!isAuthenticated && <Footer data={webData} />}
    </>
  )
}

export default Routes
