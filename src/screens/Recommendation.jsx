import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Spinner, Alert, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecommendationSystem = () => {
  // State management
  const [formData, setFormData] = useState({
    crop: '',
    location: '',
    useCoordinates: false,
    lat: '',
    lon: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestedCrops, setSuggestedCrops] = useState([]);

  // Common crop suggestions (fallback if API fails)
  const commonCrops = [
    "Tomato", "Mint", "Coriander", "Pumpkin", "Okra", 
    "Chili", "Spinach", "Curry Leaves", "Brinjal", "Rice",
    "Wheat", "Corn", "Potato", "Onion", "Banana"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Show suggestions as user types
    if (name === 'crop' && value.length > 1) {
      const filtered = commonCrops.filter(crop => 
        crop.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedCrops(filtered.slice(0, 5));
    } else {
      setSuggestedCrops([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Basic validation
      if (!formData.crop.trim()) {
        throw new Error('Please enter a crop name');
      }

      let location = formData.location;
      if (formData.useCoordinates) {
        if (!formData.lat || !formData.lon) {
          throw new Error('Please enter both latitude and longitude');
        }
        location = [parseFloat(formData.lat), parseFloat(formData.lon)];
      }

      const response = await axios.post('http://localhost:5000/recommend', {
        crop: formData.crop.trim(),
        location: location
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (crop) => {
    setFormData(prev => ({ ...prev, crop }));
    setSuggestedCrops([]);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4">
                <h2 className="text-success">
                  <i className="bi bi-tree me-2"></i> Fertilizer Recommendation System
                </h2>
              </Card.Title>
              
              {/* Recommendation Form */}
              <Form onSubmit={handleSubmit}>
                {/* Crop Input (text field instead of select) */}
                <Form.Group controlId="crop" className="mb-3">
                  <Form.Label>Crop Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    placeholder="Enter crop name (e.g., Tomato, Rice)"
                    required
                  />
                  {/* Crop suggestions */}
                  {suggestedCrops.length > 0 && (
                    <ListGroup className="mt-2">
                      {suggestedCrops.map((crop) => (
                        <ListGroup.Item 
                          key={crop}
                          action
                          onClick={() => handleSuggestionClick(crop)}
                          className="py-1"
                        >
                          {crop}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Form.Group>

                {/* Location Type Toggle */}
                <Form.Group controlId="useCoordinates" className="mb-3">
                  <Form.Check
                    type="switch"
                    label="Use GPS Coordinates Instead of City Name"
                    checked={formData.useCoordinates}
                    onChange={() => setFormData(prev => ({
                      ...prev,
                      useCoordinates: !prev.useCoordinates
                    }))}
                  />
                </Form.Group>

                {/* Location Input */}
                {!formData.useCoordinates ? (
                  <Form.Group controlId="location" className="mb-3">
                    <Form.Label>City Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter city name (e.g., Aluva)"
                      required
                    />
                  </Form.Group>
                ) : (
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="lat">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control
                          type="number"
                          name="lat"
                          value={formData.lat}
                          onChange={handleChange}
                          placeholder="e.g., 10.1076"
                          step="0.0001"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="lon">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control
                          type="number"
                          name="lon"
                          value={formData.lon}
                          onChange={handleChange}
                          placeholder="e.g., 76.3516"
                          step="0.0001"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                {/* Submit Button */}
                <Button
                  variant="success"
                  type="submit"
                  className="w-100 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Processing...
                    </>
                  ) : (
                    'Get Recommendation'
                  )}
                </Button>
              </Form>

              {/* Error Display */}
              {error && (
                <Alert variant="danger" className="mt-4">
                  <Alert.Heading>Error</Alert.Heading>
                  <p>{error}</p>
                </Alert>
              )}

              {/* Result Display */}
              {result && (
                <div className="mt-4">
                  <Card className="border-success">
                    <Card.Header className="bg-success text-white">
                      <h5 className="mb-0">Recommendation Result</h5>
                    </Card.Header>
                    <Card.Body>
                      {/* Recommendation */}
                      <Card className="mb-3 border-0 bg-light">
                        <Card.Body className="text-center">
                          <h5 className="text-muted">Recommended Fertilizer</h5>
                          <h3 className="text-success fw-bold">{result.fertilizer}</h3>
                        </Card.Body>
                      </Card>

                      <Row>
                        {/* Location Data */}
                        <Col md={6} className="mb-3">
                          <Card>
                            <Card.Header>Location Data</Card.Header>
                            <Card.Body>
                              <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <strong>City:</strong> {result.location}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <strong>Soil Type:</strong> {result.soil.SoilType}
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </Col>

                        {/* Weather Conditions */}
                        <Col md={6} className="mb-3">
                          <Card>
                            <Card.Header>Weather Conditions</Card.Header>
                            <Card.Body>
                              <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <strong>Temperature:</strong> {result.weather.Temperature}°C
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <strong>Humidity:</strong> {result.weather.Humidity}%
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </Col>

                        {/* Soil Nutrients */}
                        <Col md={6} className="mb-3">
                          <Card>
                            <Card.Header>Soil Nutrients</Card.Header>
                            <Card.Body>
                              <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <strong>Nitrogen (N):</strong> {result.soil.Nitrogen}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <strong>Phosphorus (P):</strong> {result.soil.Phosphorus}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <strong>Potassium (K):</strong> {result.soil.Potassium}
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </Col>

                        {/* Additional Data */}
                        <Col md={6} className="mb-3">
                          <Card>
                            <Card.Header>Additional Data</Card.Header>
                            <Card.Body>
                              <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <strong>Soil Moisture:</strong> {result.soil.Moisture}%
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecommendationSystem;
