import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaSeedling, FaGlobe } from "react-icons/fa";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "", // Fixed to match backend
    password: "",
    address: "",
    location: "",
    croptype: "", // Fixed to match backend
    soiltype: "", // Fixed to match backend
    farmsize: ""  // Fixed to match backend
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/createuser", formData);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center text-primary mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {[
            { name: "name", type: "text", icon: <FaUser />, placeholder: "Full Name" },
            { name: "email", type: "email", icon: <FaEnvelope />, placeholder: "Email" },
            { name: "phonenumber", type: "text", icon: <FaPhone />, placeholder: "Phone Number" },
            { name: "password", type: "password", icon: <FaLock />, placeholder: "Password" },
            { name: "address", type: "text", icon: <FaMapMarkerAlt />, placeholder: "Address" },
            { name: "location", type: "text", icon: <FaGlobe />, placeholder: "Location" },
            { name: "croptype", type: "text", icon: <FaSeedling />, placeholder: "Crop Type" },
            { name: "soiltype", type: "text", icon: <FaGlobe />, placeholder: "Soil Type" },
            { name: "farmsize", type: "text", icon: <FaMapMarkerAlt />, placeholder: "Farm Size (in acres)" },
          ].map(({ name, type, icon, placeholder }) => (
            <div className="mb-3 input-group" key={name}>
              <span className="input-group-text">{icon}</span>
              <input
                type={type}
                name={name}
                className="form-control"
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>

          <p className="text-center mt-3">
            Already have an account? <a href="/login" className="text-decoration-none text-primary">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
