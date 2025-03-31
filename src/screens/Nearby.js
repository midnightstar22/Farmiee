import React, { useState, useEffect, useRef } from 'react';

const FertilizerStoreLocator = () => {
  const [location, setLocation] = useState('');
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState(null);
  const [service, setService] = useState(null);
  const [apiError, setApiError] = useState(null);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const markersRef = useRef([]);

  // Styles
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      textAlign: 'center',
      color: '#2e7d32',
      marginBottom: '30px',
    },
    searchBox: {
      display: 'flex',
      maxWidth: '600px',
      margin: '0 auto 30px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '25px',
      overflow: 'hidden',
    },
    searchInput: {
      flex: 1,
      padding: '15px',
      border: 'none',
      fontSize: '16px',
      outline: 'none',
    },
    searchButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      padding: '0 25px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    searchButtonHover: {
      backgroundColor: '#388e3c',
    },
    resultsContainer: {
      display: 'flex',
      gap: '20px',
    },
    map: {
      flex: 2,
      height: '500px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    storeList: {
      flex: 1,
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxHeight: '500px',
      overflowY: 'auto',
    },
    storeItem: {
      padding: '15px 0',
      borderBottom: '1px solid #eee',
    },
    loading: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 0',
    },
    spinner: {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#4caf50',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      animation: 'spin 1s linear infinite',
      marginBottom: '15px',
    },
    error: {
      color: '#d32f2f',
      textAlign: 'center',
      padding: '20px',
    },
  };

  // Animation for spinner
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Load Google Maps API
  useEffect(() => {
    let script;
    let cleanupFunction;

    const initializeMap = () => {
      try {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
          throw new Error('Google Maps API failed to load properly');
        }

        if (mapRef.current && !map) {
          const newMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 20.5937, lng: 78.9629 }, // Default to India
            zoom: 5,
          });

          const newService = new window.google.maps.places.PlacesService(newMap);
          setMap(newMap);
          setService(newService);

          // Add autocomplete to input
          const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types: ['geocode'] }
          );
          
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              setLocation(place.formatted_address);
              searchStores(place.geometry.location);
            }
          });
        }
      } catch (error) {
        console.error('Google Maps initialization error:', error);
        setApiError('Failed to initialize Google Maps. Please try again later.');
      }
    };

    if (!window.google) {
      script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=key&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Sometimes the API appears loaded but isn't fully ready
        const checkReady = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.places) {
            clearInterval(checkReady);
            initializeMap();
          }
        }, 100);
        
        // Timeout if API doesn't load properly
        setTimeout(() => {
          if (!window.google || !window.google.maps) {
            clearInterval(checkReady);
            setApiError('Google Maps API failed to load. Please check your connection.');
          }
        }, 5000);
      };
      
      script.onerror = () => {
        setApiError('Failed to load Google Maps API. Please check your connection.');
      };
      
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    cleanupFunction = () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      if (script) {
        document.head.removeChild(script);
      }
    };

    return cleanupFunction;
  }, []);

  const searchStores = (location) => {
    if (!service || !location) {
      setApiError('Service not initialized. Please try again.');
      return;
    }

    setIsLoading(true);
    setStores([]);
    setApiError(null);
    
    // Clear previous markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const request = {
      location: location,
      radius: '5000', // 5km radius
      keyword: 'fertilizer store',
      type: 'store',
    };

    try {
      service.nearbySearch(request, (results, status) => {
        setIsLoading(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setStores(results);
          
          // Center map on the searched location
          map.setCenter(location);
          map.setZoom(14);
          
          // Add markers for each store
          results.forEach(place => {
            if (place.geometry && place.geometry.location) {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name
              });
              markersRef.current.push(marker);
            }
          });
        } else {
          setApiError(`Could not find stores in this location. (Status: ${status})`);
        }
      });
    } catch (error) {
      setIsLoading(false);
      setApiError('Error searching for stores. Please try again.');
      console.error('Search error:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setApiError('Please enter a location');
      return;
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          searchStores(results[0].geometry.location);
        } else {
          setApiError('Location not found. Please try a different search term.');
        }
      });
    } catch (error) {
      setApiError('Geocoding service error. Please try again.');
      console.error('Geocoding error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Fertilizer Store Locator</h1>
      
      <form onSubmit={handleSearch}>
        <div style={styles.searchBox}>
          <input
            ref={inputRef}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location (city, address, or zip)"
            style={styles.searchInput}
          />
          <button 
            type="submit" 
            style={styles.searchButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.searchButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.searchButton.backgroundColor}
          >
            Search
          </button>
        </div>
      </form>
      
      {apiError && <div style={styles.error}>{apiError}</div>}
      
      {isLoading ? (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Finding fertilizer stores near you...</p>
        </div>
      ) : (
        <div style={styles.resultsContainer}>
          <div ref={mapRef} style={styles.map}></div>
          
          <div style={styles.storeList}>
            <h3>Nearby Fertilizer Stores</h3>
            {stores.length === 0 && !apiError ? (
              <p>No stores found. Try a different location.</p>
            ) : (
              <ul style={{ padding: 0, listStyle: 'none' }}>
                {stores.map((store, index) => (
                  <li key={index} style={styles.storeItem}>
                    <h4>{store.name}</h4>
                    <p>{store.vicinity}</p>
                    <p>Rating: {store.rating || 'Not rated'}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerStoreLocator;
