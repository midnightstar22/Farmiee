import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/loginuser", formData);

      if (response.data.success) {
        localStorage.setItem("userEmail", formData.email); // Save user email for profile
        alert("Login successful!");
        navigate("/profile");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Side Image */}
        <div className="col-md-6 d-none d-md-block">
          <img src="/imgs/7341255.jpg" className="img-fluid rounded" alt="Phone image" />
        </div>

        {/* Right Side Form */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center text-primary mb-4">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success">Sign In</button>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/createuser")}>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
