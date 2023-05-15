import { Component } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import About from './pages/About'
import SearchBar from './pages/SearchBar'
import AddRecipe from './pages/AddRecipe'
import Recipe from './pages/Recipe'
import Categories from './pages/Categories'
import Liked from './pages/Liked'

import authService from './services/auth-service'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: authService.loggedIn() //Token i logowanie remember
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
            path="/liked"
            element={this.state.loggedIn ? <Liked /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={this.state.loggedIn ? <Navigate to="/profile" /> : <Login />}
          />
          <Route
            path="/addrecipe"
            element={this.state.loggedIn ? <AddRecipe /> : <Navigate to="/login" />}
          />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/register"
            element={this.state.loggedIn ? <Navigate to="/profile" /> : <Register />}
          />
          <Route path="/recipe/:id" element={<Recipe />} />{' '}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    )
  }
}
