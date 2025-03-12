import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudLightning, Sun, Wind, Droplets, Search } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = "dc45fd9866453b89bfcfa98bc372635d"; // Replace with your OpenWeatherMap API Key

const Forecasting = () => {
  const [location, setLocation] = useState('Brooklyn, New York, USA');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentWeather, setCurrentWeather] = useState({
    temp: 13,
    condition: 'Rainy',
    wind: '2.4 km/h',
    humidity: '70%'
  });

  // Function to fetch weather data from OpenWeatherMap API
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) throw new Error(data.message);

      setCurrentWeather({
        temp: data.main.temp,
        condition: data.weather[0].main,
        wind: `${data.wind.speed} km/h`,
        humidity: `${data.main.humidity}%`
      });

      setLocation(data.name);
    } catch (error) {
      alert(`Error fetching weather: ${error.message}`);
    }
  };

  // Fetch weather data for default location on component mount
  useEffect(() => {
    fetchWeather(location);
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery);
      setSearchQuery('');
    }
  };

  // Function to get appropriate weather icon
  const getWeatherIcon = (condition) => {
    if (condition.includes('Rain')) {
      if (condition.includes('Storm') || condition.includes('Thunder')) {
        return <CloudLightning size={120} className="text-light" />;
      }
      return <CloudRain size={120} className="text-light" />;
    } else if (condition.includes('Clear') || condition.includes('Sunny')) {
      return <Sun size={120} className="text-warning" />;
    } else {
      return <Cloud size={120} className="text-light" />;
    }
  };

  // Function to get background class based on weather condition
  const getBackgroundClass = (condition) => {
    if (condition.includes('Clear') || condition.includes('Sunny')) return 'clear-sky';
    if (condition.includes('Cloudy')) return 'cloudy';
    if (condition.includes('Rain')) return 'rain';
    if (condition.includes('Storm')) return 'storm-with-rain';
    return 'clear-sky'; // Default background
  };

  return (
    <div className={`weather-container ${getBackgroundClass(currentWeather.condition)} d-flex align-items-center justify-content-center`}>
      <div className="container">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="d-flex mb-4">
          <div className="input-group">
            <span className="input-group-text bg-success text-white">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city..."
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success ms-2">Search</button>
        </form>

        {/* Weather Information Box */}
        <div className="weather-box p-4 rounded shadow-lg text-center text-white">
          <h3 className="mb-3">{location}</h3>
          <div className="display-1 fw-bold">{currentWeather.temp}°C</div>
          <h4 className="mt-2 mb-4">{currentWeather.condition}</h4>

          <div className="d-flex justify-content-center gap-4">
            <div className="d-flex flex-column align-items-center">
              <Wind size={30} className="text-info" />
              <span>Wind: {currentWeather.wind}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Droplets size={30} className="text-primary" />
              <span>Humidity: {currentWeather.humidity}</span>
            </div>
          </div>

          <div className="mt-4">{getWeatherIcon(currentWeather.condition)}</div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>
        {`
          .weather-container {
            min-height: 100vh;
            width: 100%;
            background-size: cover;
            background-position: center;
            transition: background 0.5s ease-in-out;
            padding: 20px;
          }
          .clear-sky { background-image: url('/imgs/clear-sky.png'); }
          .cloudy { background-image: url('/imgs/cloudy.png'); }
          .rain { background-image: url('/imgs/rainy.jpg'); }
          .storm-with-rain { background-image: url('/imgs/stormy.jpg'); }
          
          .weather-box {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
          }
        `}
      </style>
    </div>
  );
};

export default Forecasting;
