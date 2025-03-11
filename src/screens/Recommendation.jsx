import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Recommendation = () => {
  const [cropType, setCropType] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecommendation(`Recommended fertilizers for ${cropType} will be displayed here.`);
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/imgs/apple.jpg')",  // Set the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",  // Keep the card positioned properly
      }}
    >
      {/* Overlay to create a fade effect */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Light overlay effect
          backdropFilter: "blur(5px)", // Blurred background effect
        }}
      ></div>

      <Card className="p-4 shadow-lg w-50 bg-white bg-opacity-75" style={{ zIndex: 1 }}>
        <h2 className="text-center mb-4 text-success">Fertilizer Recommendation</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="cropType">
            <Form.Label className="fw-bold">Enter Crop Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Wheat, Rice, Corn"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3 w-100">
            Get Recommendation
          </Button>
        </Form>

        {recommendation && (
          <Card className="mt-4 p-3 bg-light border-success">
            <h4 className="text-success">Recommendation</h4>
            <p>{recommendation}</p>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default Recommendation;
