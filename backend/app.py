from flask import Flask, request, jsonify
import pandas as pd
import joblib
from geopy.geocoders import Nominatim
import requests
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS  # <-- Add this import

app = Flask(__name__)
CORS(app, resources={r"/recommend": {"origins": "http://localhost:5173"}})  # <-- Allow only your frontend

# Load the trained model bundle
model_data = joblib.load('model.pkl')
model = model_data['model']
label_encoders = model_data['label_encoders']
feature_names = model_data['feature_names']

# Weather API Configuration
WEATHER_API_KEY = 'dc45fd9866453b89bfcfa98bc372635d'
BASE_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?"

# Soil data (should match your training data)
SOIL_DATA = {
    "Vadakara": {"SoilType": "Sandy", "Nitrogen": 37, "Phosphorus": 0, "Potassium": 0, "Moisture": 38},
    "Uppala": {"SoilType": "Loamy", "Nitrogen": 12, "Phosphorus": 36, "Potassium": 0, "Moisture": 45},
    "Kottarakkara": {"SoilType": "Black", "Nitrogen": 7, "Phosphorus": 30, "Potassium": 9, "Moisture": 62},
    "Manjeri": {"SoilType": "Red", "Nitrogen": 22, "Phosphorus": 20, "Potassium": 0, "Moisture": 34},
    "Shoranur": {"SoilType": "Clayey", "Nitrogen": 35, "Phosphorus": 0, "Potassium": 0, "Moisture": 46},
    "Neyyattinkara": {"SoilType": "Sandy", "Nitrogen": 12, "Phosphorus": 13, "Potassium": 10, "Moisture": 35},
    "Chittur": {"SoilType": "Red", "Nitrogen": 9, "Phosphorus": 10, "Potassium": 0, "Moisture": 64},
    "Perumbavoor": {"SoilType": "Sandy", "Nitrogen": 21, "Phosphorus": 18, "Potassium": 0, "Moisture": 42},
    "Thalassery": {"SoilType": "Clayey", "Nitrogen": 13, "Phosphorus": 40, "Potassium": 0, "Moisture": 28},
    "Cheruvathur": {"SoilType": "Sandy", "Nitrogen": 14, "Phosphorus": 12, "Potassium": 15, "Moisture": 48},
    "Aluva": {"SoilType": "Loamy", "Nitrogen": 36, "Phosphorus": 0, "Potassium": 0, "Moisture": 65},
    "Cherthala": {"SoilType": "Clayey", "Nitrogen": 24, "Phosphorus": 22, "Potassium": 0, "Moisture": 41},
    "Kodungallur": {"SoilType": "Red", "Nitrogen": 14, "Phosphorus": 41, "Potassium": 0, "Moisture": 31},
    "Pandalam": {"SoilType": "Black", "Nitrogen": 10, "Phosphorus": 14, "Potassium": 13, "Moisture": 49},
    "Kattappana": {"SoilType": "Clayey", "Nitrogen": 38, "Phosphorus": 0, "Potassium": 0, "Moisture": 34},
    "Ranni": {"SoilType": "Sandy", "Nitrogen": 21, "Phosphorus": 19, "Potassium": 0, "Moisture": 39},
    "Ottapalam": {"SoilType": "Black", "Nitrogen": 39, "Phosphorus": 0, "Potassium": 0, "Moisture": 65},
    "Nilambur": {"SoilType": "Loamy", "Nitrogen": 13, "Phosphorus": 36, "Potassium": 0, "Moisture": 52},
    "Kunnamkulam": {"SoilType": "Sandy", "Nitrogen": 10, "Phosphorus": 9, "Potassium": 0, "Moisture": 44},
    "Ettumanoor": {"SoilType": "Loamy", "Nitrogen": 12, "Phosphorus": 12, "Potassium": 14, "Moisture": 53},
    "Mannarkkad": {"SoilType": "Red", "Nitrogen": 11, "Phosphorus": 37, "Potassium": 0, "Moisture": 33},
    "Haripad": {"SoilType": "Black", "Nitrogen": 36, "Phosphorus": 0, "Potassium": 0, "Moisture": 37},
    "Varkala": {"SoilType": "Red", "Nitrogen": 9, "Phosphorus": 29, "Potassium": 9, "Moisture": 63},
    "Attingal": {"SoilType": "Black", "Nitrogen": 12, "Phosphorus": 39, "Potassium": 0, "Moisture": 32},
    "Kalpetta": {"SoilType": "Loamy", "Nitrogen": 8, "Phosphorus": 31, "Potassium": 10, "Moisture": 61},
    "Kanhangad": {"SoilType": "Loamy", "Nitrogen": 8, "Phosphorus": 28, "Potassium": 8, "Moisture": 48},
    "Pala": {"SoilType": "Red", "Nitrogen": 11, "Phosphorus": 15, "Potassium": 12, "Moisture": 63},
    "Thiruvalla": {"SoilType": "Black", "Nitrogen": 23, "Phosphorus": 24, "Potassium": 0, "Moisture": 43},
    "Nedumangad": {"SoilType": "Black", "Nitrogen": 24, "Phosphorus": 20, "Potassium": 0, "Moisture": 64},
    "North Paravur": {"SoilType": "Loamy", "Nitrogen": 8, "Phosphorus": 33, "Potassium": 8, "Moisture": 55},
    "Feroke": {"SoilType": "Clayey", "Nitrogen": 9, "Phosphorus": 22, "Potassium": 10, "Moisture": 42},
    "Thodupuzha": {"SoilType": "Black", "Nitrogen": 14, "Phosphorus": 35, "Potassium": 0, "Moisture": 65},
    "Adoor": {"SoilType": "Loamy", "Nitrogen": 10, "Phosphorus": 32, "Potassium": 7, "Moisture": 58},
    "Ambalappuzha": {"SoilType": "Red", "Nitrogen": 22, "Phosphorus": 24, "Potassium": 0, "Moisture": 34},
    "Mananthavady": {"SoilType": "Sandy", "Nitrogen": 8, "Phosphorus": 15, "Potassium": 0, "Moisture": 37},
    "Punalur": {"SoilType": "Red", "Nitrogen": 15, "Phosphorus": 40, "Potassium": 0, "Moisture": 62},
    "Koyilandy": {"SoilType": "Red", "Nitrogen": 23, "Phosphorus": 21, "Potassium": 0, "Moisture": 31},
    "Chalakudy": {"SoilType": "Loamy", "Nitrogen": 23, "Phosphorus": 19, "Potassium": 0, "Moisture": 48},
    "Perinthalmanna": {"SoilType": "Clayey", "Nitrogen": 24, "Phosphorus": 18, "Potassium": 0, "Moisture": 43},
    "Paravur": {"SoilType": "Red", "Nitrogen": 39, "Phosphorus": 0, "Potassium": 0, "Moisture": 32},
    "Ramanattukara": {"SoilType": "Clayey", "Nitrogen": 12, "Phosphorus": 41, "Potassium": 0, "Moisture": 37}
}


def get_weather(lat, lon):
    """Fetch current weather data"""
    url = f"{BASE_WEATHER_URL}lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
    response = requests.get(url).json()
    if response['cod'] != 200:
        raise ValueError(f"Weather API error: {response.get('message', 'Unknown error')}")
    return {
        'Temperature': response['main']['temp'],
        'Humidity': response['main']['humidity']
    }

def get_coordinates(location_name):
    """Convert location name to coordinates"""
    geolocator = Nominatim(user_agent="fert_rec_app")
    location = geolocator.geocode(location_name)
    if not location:
        raise ValueError("Location not found")
    return location.latitude, location.longitude

def prepare_input(crop, city, weather_data, soil_data):
    """Prepare input for model prediction"""
    # Encode categorical features
    input_data = {
        'Temperature': weather_data['Temperature'],
        'Humidity': weather_data['Humidity'],
        'Moisture': soil_data['Moisture'],
        'SoilType': label_encoders['SoilType'].transform([soil_data['SoilType']])[0],
        'Nitrogen': soil_data['Nitrogen'],
        'Potassium': soil_data['Potassium'],
        'Phosphorus': soil_data['Phosphorus'],
        'City': label_encoders['City'].transform([city])[0],
        'CropType': label_encoders['CropType'].transform([crop])[0]
    }
    # Ensure correct feature order
    return pd.DataFrame([input_data])[feature_names]

@app.route('/recommend', methods=['POST'])
def recommend():
    """Main recommendation endpoint"""
    try:
        data = request.json
        
        # Validate input
        if not all(k in data for k in ['crop', 'location']):
            return jsonify({"error": "Missing crop or location"}), 400
        
        crop = data['crop']
        location = data['location']
        
        # Get location data
        if isinstance(location, str):
            city = location
            lat, lon = get_coordinates(location)
        else:  # Assume [lat, lon]
            lat, lon = location
            city = "Unknown"  # In production, implement reverse geocoding
        
        # Get required data
        weather = get_weather(lat, lon)
        soil = SOIL_DATA.get(city)
        if not soil:
            return jsonify({"error": f"Soil data not available for {city}"}), 400
        
        # Prepare and predict
        input_df = prepare_input(crop, city, weather, soil)
        prediction = model.predict(input_df)[0]
        fertilizer = label_encoders['Fertilizer Name'].inverse_transform([prediction])[0]
        
        return jsonify({
            "fertilizer": fertilizer,
            "location": city,
            "weather": weather,
            "soil": soil
        })
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/crop_types', methods=['GET'])
def get_crop_types():
    """Get available crop types"""
    return jsonify({
        "crop_types": list(label_encoders['CropType'].classes_)
    })

@app.route('/soil_types', methods=['GET'])
def get_soil_types():
    """Get available soil types"""
    return jsonify({
        "soil_types": list(label_encoders['SoilType'].classes_)
    })

if __name__ == '__main__':
    print("Model loaded with features:", feature_names)
    print("Available crops:", label_encoders['CropType'].classes_)
    print("Available soils:", label_encoders['SoilType'].classes_)
    app.run(host='0.0.0.0', port=5000, debug=True)
