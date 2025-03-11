import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaSeedling, FaGlobe } from "react-icons/fa";

const Up = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    location: "",
    crop_type: "",
    soil_type: "",
    farm_size: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", formData);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.error || "Signup failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-primary mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaUser /></span>
            <input type="text" name="name" className="form-control" placeholder="Full Name" onChange={handleChange} required />
          </div>

          {/* Email Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
          </div>

          {/* Phone Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaPhone /></span>
            <input type="text" name="phone" className="form-control" placeholder="Phone Number" onChange={handleChange} required />
          </div>

          {/* Password Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaLock /></span>
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
          </div>

          {/* Address Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaMapMarkerAlt /></span>
            <input type="text" name="address" className="form-control" placeholder="Address" onChange={handleChange} required />
          </div>

          {/* Location Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaGlobe /></span>
            <input type="text" name="location" className="form-control" placeholder="Location" onChange={handleChange} required />
          </div>

          {/* Crop Type Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaSeedling /></span>
            <input type="text" name="crop_type" className="form-control" placeholder="Crop Type" onChange={handleChange} required />
          </div>

          {/* Soil Type Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaGlobe /></span>
            <input type="text" name="soil_type" className="form-control" placeholder="Soil Type" onChange={handleChange} required />
          </div>

          {/* Farm Size Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaMapMarkerAlt /></span>
            <input type="text" name="farm_size" className="form-control" placeholder="Farm Size (in acres)" onChange={handleChange} required />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-3">
            Already have an account? <a href="/login" className="text-decoration-none text-primary">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Up;
