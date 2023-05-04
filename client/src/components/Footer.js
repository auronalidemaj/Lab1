import React from 'react';
import { NavLink} from 'react-router-dom';
import './style/footer.css';
import fb from './icons/icon1.png'
import twitter from './icons/icon2.png'
import instagram from './icons/icon3.png'



function Footer() {
  return (
    <>
      <div className="footer">
        <div className="sb__footer section__padding">
          <div className="sb__footer-links">
            <div className="sb__footer-links_div">
              <h4>Navigate</h4>
              <NavLink to="/"><p>Home</p></NavLink>
              <NavLink to="/products"><p>Products</p></NavLink>
              <NavLink to="/login"><p>Login</p></NavLink>
            </div>
            <div className="sb__footer-links_div">
              <h4>Contact Information</h4>
                <p>bookstore@gmail.com</p>
                <p>+383 49 000 000</p>
                <p>Str. Bill Clinton, 5</p>
            </div>
            <div className="sb__footer-links_div">
              <h4>Social Media</h4>
              <div className="socialmedia">
                <p><img src={fb} alt=""/></p>
                <p><img src={twitter} alt=""/></p>
                <p><img src={instagram} alt=""/></p>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="sb__footer-below">
            <div className="sb__footer-copyright">
              <p>
                @{new Date().getFullYear()} Bookstore. All rights reserved.
              </p>
            </div>
            <div className="sb__footer-below-links">
              <a href="/terms"><div><p>Terms and Conditions</p></div></a> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
