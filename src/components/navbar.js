import React from 'react';

function Navbar() {
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="/#/" className="navbar-brand">
          AprendiGame
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="usuarios.html">
                Cursos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="lancamentos.html">
                Classes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
