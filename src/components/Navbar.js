import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success py-2">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 fst-italic" to="/">
            <img src="/imgs/LOGO.png" style={{ width: "80px", height: "60px" }} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/about">About</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/weather">Weather</Link>

              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/recommendation">Recommendation</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/nearby-store">Nearby Store</Link>

              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>

              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
