from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Load dataset
file_path = "Updated_Fertilizer_Prediction_Kerala.csv"  # Ensure correct path
df = pd.read_csv(file_path)
df.columns = df.columns.str.strip()
df = df.drop(columns=['District'])  # Drop unnecessary column

# Encode categorical features
label_encoders = {}
categorical_columns = ['SoilType', 'CropType', 'City', 'Fertilizer Name']
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Prepare data
X = df.drop(columns=["Fertilizer Name"])
y = df["Fertilizer Name"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Save model and encoders
pickle.dump(rf_model, open("fertilizer_model.pkl", "wb"))
pickle.dump(label_encoders, open("label_encoders.pkl", "wb"))

# Load model and encoders
rf_model = pickle.load(open("fertilizer_model.pkl", "rb"))
label_encoders = pickle.load(open("label_encoders.pkl", "rb"))

# Define the expected feature names and order
expected_features = X.columns.tolist()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # JSON input from frontend
        input_data = pd.DataFrame([data])  # Convert to DataFrame
        
        # Encode categorical values
        for col in categorical_columns[:-1]:  # Exclude 'Fertilizer Name'
            input_data[col] = label_encoders[col].transform([data[col]])[0]
        
        # Ensure all required features are present and in the correct order
        input_data = input_data.reindex(columns=expected_features, fill_value=0)
        
        # Make prediction
        prediction = rf_model.predict(input_data)
        predicted_fertilizer = int(np.round(prediction[0]))  # Convert to class label
        
        # Decode fertilizer name
        fertilizer_name = label_encoders['Fertilizer Name'].inverse_transform([predicted_fertilizer])[0]

        return jsonify({'fertilizer': fertilizer_name})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)