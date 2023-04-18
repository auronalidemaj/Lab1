import React from 'react';
import './style/footer.css';
import fb from './icons/facebook.png'
import twitter from './icons/twitter.png'
import instagram from './icons/instagram.png'
import linkedin from './icons/linkedin.png'

function footer() {
  return (
    <>
      <div className="footer">
        <div className="sb__footer section__padding">
          <div className="sb__footer-links">
            <div className="sb__footer-links_div">
              <h4>Bookstore</h4>
              <a href="/employer">
                <p>Employer</p>
              </a>
              <a href="/health">
                <p>Health</p>
              </a>
              <a href="/absd">
                <p>Absd</p>
              </a>
            </div>
            <div className="sb__footer-links_div">
              <h4>Resources</h4>
              <a href="/employer">
                <p>Employer</p>
              </a>
              <a href="/employer">
                <p>Employer</p>
              </a>
              <a href="/employer">
                <p>Employer</p>
              </a>
              
            </div>
            <div className="sb__footer-links_div">
              <h4>Resources</h4>
              <a href="/employer">
                <p>Employer</p>
              </a>
              <a href="/employer">
                <p>Employer</p>
              </a>
              <a href="/employer">
                <p>Employer</p>
              </a>
            </div>
            <div className="sb__footer-links_div">
              <h4>Social Media</h4>
              <div className="socialmedia">
                <p><img src={fb} alt=""/></p>
                <p><img src={twitter} alt=""/></p>
                <p><img src={instagram} alt=""/></p>
                <p><img src={linkedin} alt=""/></p>
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
              <a href="/terms"><div><p>Terms and Conditions</p></div></a>
              <a href="/terms"><div><p>Terms and Conditions</p></div></a>
              <a href="/terms"><div><p>Terms and Conditions</p></div></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default footer;
