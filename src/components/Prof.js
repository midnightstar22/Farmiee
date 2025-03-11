import React from "react";
import { User, Mail, Phone, MapPin, Sprout } from "lucide-react";

const Prof = ({
  name = "John Doe",
  cropType = "Wheat",
  location = "Kansas, USA",
  email = "john.doe@example.com",
  address = "123 Farm Road, Countryside, KS 12345",
  phone = "(123) 456-7890",
  profileImage = null,
}) => {
  return (
    <div className="container py-5">
      {/* Profile Header */}
      <div className="text-center mb-5">
        <div className="mx-auto rounded-circle border border-success p-2 shadow-lg" style={{ width: "150px", height: "150px", overflow: "hidden" }}>
          {profileImage ? (
            <img src={profileImage} alt={`${name}'s profile`} className="img-fluid rounded-circle" />
          ) : (
            <User size={96} className="text-success mt-3" />
          )}
        </div>
        <h2 className="mt-3">{name}</h2>
        <p className="text-success fw-bold">
          <Sprout size={20} className="me-2" />
          {cropType} Farmer
        </p>
      </div>

      {/* Contact Information */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2">Contact Information</h5>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center mb-2">
              <Mail size={24} className="text-success me-3" />
              <div>
                <h6 className="mb-1">Email</h6>
                <p className="text-muted mb-0">{email}</p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center mb-2">
              <Phone size={24} className="text-success me-3" />
              <div>
                <h6 className="mb-1">Phone</h6>
                <p className="text-muted mb-0">{phone}</p>
              </div>
            </div>
            <div className="col-md-12 d-flex align-items-center mt-3">
              <MapPin size={24} className="text-success me-3" />
              <div>
                <h6 className="mb-1">Address</h6>
                <p className="text-muted mb-0">{address}</p>
                <p className="text-muted mb-0">{location}</p>
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
                <p className="text-success">{cropType}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded text-center">
                <h6 className="fw-bold">Soil Type</h6>
                <p className="text-success">Loamy</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded text-center">
                <h6 className="fw-bold">Farm Size</h6>
                <p className="text-success">45 Acres</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fertilizer Recommendations */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title">Fertilizer Recommendations</h5>
            <button className="btn btn-success">View All</button>
          </div>
          <p className="text-muted fst-italic">
            Personalized fertilizer recommendations based on your crop type, soil analysis, and local climate conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prof;
