import React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Up";
export default function Form() {
  const navigate = useNavigate();

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-none d-md-block">
          <img src="/imgs/7341255.jpg" className="img-fluid rounded" alt="Phone image" />
        </div>
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" defaultChecked />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="text-primary">Forgot password?</a>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success">Sign In</button>
              <button type="button" className="btn btn-primary" onClick={() => navigate("/Signup")}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
