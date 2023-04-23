import React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Hamburger } from './icons/menu.svg';
import { ReactComponent as Brand } from './icons/logo4.svg';
import { ReactComponent as SearchIcon } from './icons/download-5.svg';
import { ReactComponent as WishlistIcon } from './icons/wishlist-1.svg';
import { ReactComponent as CartIcon } from './icons/cart.svg';
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

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = "/";
  }
  
  const handleSignout = () => {
    fetch("/logout", { credentials: "include" })
      .then(() => {
        // Clear session cookie and redirect to homepage
        document.cookie = 'userId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // window.location.href = "/";
      })
  }

  return (
    <nav className="navbar">
      <div className="container">
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
              <form onSubmit={handleSearch}>
                <div className="search-box">
                  <SearchIcon className="search-icon"/>
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
            <Link to="/login">
      <button className="nav-login-btn" >Login</button>
      </Link>
      <button className="nav-login-btn" onClick={handleSignout}>Signout</button>
    </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
