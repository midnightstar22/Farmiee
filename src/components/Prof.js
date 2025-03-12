import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Sprout } from "lucide-react";

const Prof = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return; // If no email, do nothing

      try {
        const response = await axios.get(`http://localhost:5000/api/getuser/${email}`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          alert("User not found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <h3 className="text-center">Loading profile...</h3>;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div className="mx-auto rounded-circle border border-success p-2 shadow-lg" style={{ width: "150px", height: "150px", overflow: "hidden" }}>
          <User size={96} className="text-success mt-3" />
        </div>
        <h2 className="mt-3">{user.name}</h2>
        <p className="text-success fw-bold">
          <Sprout size={20} className="me-2" />
          {user.croptype} Farmer
        </p>
      </div>

      {/* Contact Info */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2">Contact Information</h5>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center mb-2">
              <Mail size={24} className="text-success me-3" />
              <div>
                <h6 className="mb-1">Email</h6>
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center mb-2">
              <Phone size={24} className="text-success me-3" />
              <div>
                <h6 className="mb-1">Phone</h6>
                <p className="text-muted mb-0">{user.phonenumber}</p>
              </div>
            </div>
            <div className="col-md-12 d-flex align-items-center mt-3">
              <MapPin size={24} className="text-success me-3" />
              <div>
                <h6 className="mb-1">Address</h6>
                <p className="text-muted mb-0">{user.address}</p>
                <p className="text-muted mb-0">{user.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Details */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2">Farm Details</h5>
          <div className="row">
            <div className="col-md-4">
              <div className="bg-light p-3 rounded text-center">
                <h6 className="fw-bold">Primary Crop</h6>
                <p className="text-success">{user.croptype}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded text-center">
                <h6 className="fw-bold">Soil Type</h6>
                <p className="text-success">{user.soiltype}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded text-center">
                <h6 className="fw-bold">Farm Size</h6>
                <p className="text-success">{user.farmsize} Acres</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prof;
