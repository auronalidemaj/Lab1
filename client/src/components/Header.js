import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Hamburger } from './icons/menu.svg';
import { ReactComponent as Brand } from './icons/logo4.svg';
import { ReactComponent as SearchIcon } from './icons/download-5.svg';
import { ReactComponent as WishlistIcon } from './icons/wishlist-1.svg';
import { ReactComponent as CartIcon } from './icons/cart.svg';
import Axios from 'axios'
import './style/header.css';


const Header = ({ loggedIn, }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Perform search action with query: ${searchQuery}`);
    setSearchQuery('');
  };

  const handleLogout = () => {
    Axios.post("http://localhost:3001/logout", {
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        // do something after the user logs out successfully
        console.log('User logged out successfully');
      }
    })
      .catch(error => console.error('Error logging out:', error));
  };

  const [role, setRole] = useState('')
  const [logged, setLogged] = useState(false)
  
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (Boolean(response.data.loggedIn)) {
        setRole(response.data.user[0].role);
        setLogged(true);
      }
    });
  }, []);
  


  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Brand />
          <p className="emri">Bookstore</p>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <form onSubmit={handleSearch}>
                <div className="search-box">
                  <SearchIcon className="search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books..."
                  />
                </div>
              </form>
            </li>
            <li>
              <Link to="/cart">
                <CartIcon className="cart-icon" />
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                <WishlistIcon className="wishlist-icon" />
              </Link>
            </li>

            <li>
            {logged == true ?<button className="nav-login-btn" onClick={handleLogout}>
                Sign out
              </button> : <Link to="/login">
                <button className="nav-login-btn" >Login</button>
              </Link>}
              
            </li>
            <li>
  {role === 'admin' ? <NavLink to="/dashboard">Dashboard</NavLink> : null}
</li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
