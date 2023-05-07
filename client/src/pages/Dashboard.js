import React, { useState } from 'react';
import Users from '../components/Users';
import Contact from '../components/ContactList';
import '../components/style/dashboard.css';
import ProductsDash from '../components/ProductsDash';
import News from '../components/NewsList';
function Dashboard() {
  const [activeButton, setActiveButton] = useState('users');
  const handleUsersClick = () => {
    setActiveButton('users');
    // handle Users click logic
  };

  const handleContactClick = () => {
    setActiveButton('contact');
    // handle Contact click logic
  };
  const handleProductClick = () => {
    setActiveButton('product');
  };
  const handleNewsClick = () => {
    setActiveButton('news');
  };
  return (
    <>
      <div className="dash">
        <div className="leftD">
          <h2>Dashboard</h2>
          <div className="icons">
            <ul className="lists">
              <li>
                <button
                  className={`dashButton ${activeButton === 'users' ? 'active' : ''}`}
                  onClick={handleUsersClick}
                >
                  Users
                </button>
              </li>

              <li>
                <button
                  className={`dashButton ${activeButton === 'news' ? 'active' : ''}`}
                  onClick={handleNewsClick}>
                  News
                </button>
              </li>

              <li>
                <button
                  className={`dashButton ${activeButton === 'product' ? 'active' : ''}`}
                  onClick={handleProductClick}>
                  Products
                </button>
              </li>

              <li>
                <button
                  className={`dashButton ${activeButton === 'contact' ? 'active' : ''}`}
                  onClick={handleContactClick}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="centerD">
          {activeButton === 'users' && <Users />}
          {activeButton === 'contact' && <Contact />}
          {activeButton === 'product' && <ProductsDash />}
          {activeButton === 'news' && <News />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
