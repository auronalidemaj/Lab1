import React from 'react'

function footer() {
  return (
      <><footer className="top">
          <img src="logo.svg" alt="Logo" />
          <div className="links">
              <div>
                  <h2>Platform</h2>
                  <a href="#">Directus Core</a>
              </div>
              <div>
                  <h2>Cloud</h2>
                  <a href="#">Directus Core</a>
              </div>
          </div>
      </footer><footer className="bottom">
              <div className="legal">
                  <span>© 2023 All rights reserved</span>
                  <a href="#">License</a>
                  {/* more links */}
              </div>
              <div className="links">
                  <a className="fa-brands fa-github" href="#"></a>
                  <a className="fa-brands fa-linkedin" href="#"></a>
                  <a className="fa-brands fa-docker" href="#"></a>
              </div>
          </footer></>

  )
}

export default footer