import React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Hamburger } from './icons/menu.svg';
import { ReactComponent as Brand } from './icons/logo4.svg';
import './style/header.css';

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

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
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <Link to="/login">
                <button className="nav-login-btn">Login</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
