import React, { useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OPENWEATHER_API_KEY = "dc45fd9866453b89bfcfa98bc372635d"; // Replace with your API key

const Recommendation = () => {
  const [cropType, setCropType] = useState("");
  const [location, setLocation] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      return {
        temperature: data.main.temp,
        humidity: data.main.humidity,
      };
    } catch (err) {
      throw new Error("Error fetching weather data. Check the location.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecommendation(null);
    setError(null);
    setLoading(true);

    try {
      if (!location) throw new Error("Please enter a valid location.");

      const weatherData = await fetchWeatherData(location);
      const response = await fetch("http://127.0.0.1:5000/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cropType, location, temperature: weatherData.temperature, humidity: weatherData.humidity }),
      });
      

      if (!response.ok) throw new Error("Failed to fetch recommendation");

      const data = await response.json();
      setRecommendation(data.fertilizer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/imgs/apples.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
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

          <Form.Group controlId="location" className="mt-3">
            <Form.Label className="fw-bold">Enter Location (City)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., New Delhi, Mumbai, Bengaluru"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3 w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Get Recommendation"}
          </Button>
        </Form>

        {recommendation && (
          <Card className="mt-4 p-3 bg-light border-success">
            <h4 className="text-success">Recommendation</h4>
            <p>{recommendation}</p>
          </Card>
        )}

        {error && (
          <Card className="mt-4 p-3 bg-danger text-white">
            <h4>Error</h4>
            <p>{error}</p>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default Recommendation;
