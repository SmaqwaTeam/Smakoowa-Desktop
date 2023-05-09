import { Component } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import authService from './services/auth-service'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: authService.loggedIn()
    }
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={this.state.loggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={this.state.loggedIn ? <Navigate to="/profile" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    )
  }
}
