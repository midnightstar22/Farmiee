import { useState } from "react";

export default function Recommendation() {
    const [formData, setFormData] = useState({
        SoilType: "",
        CropType: "",
        City: "",
        Temperature: "",
        Humidity: "",
        Moisture: ""
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending request with data:", formData);
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Received response:", data);
            if (response.ok) {
                setResult(data.fertilizer);
                setError(null);
            } else {
                setError(data.error || "An error occurred");
                setResult(null);
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while fetching the prediction");
            setResult(null);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Fertilizer Recommendation</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="SoilType" placeholder="Soil Type" onChange={handleChange} required className="border p-2 w-full mb-2"/>
                <input type="text" name="CropType" placeholder="Crop Type" onChange={handleChange} required className="border p-2 w-full mb-2"/>
                <input type="text" name="City" placeholder="City" onChange={handleChange} required className="border p-2 w-full mb-2"/>
                <input type="number" name="Temperature" placeholder="Temperature" onChange={handleChange} required className="border p-2 w-full mb-2"/>
                <input type="number" name="Humidity" placeholder="Humidity" onChange={handleChange} required className="border p-2 w-full mb-2"/>
                <input type="number" name="Moisture" placeholder="Moisture Level" onChange={handleChange} required className="border p-2 w-full mb-2"/>
                
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Predict Fertilizer</button>
            </form>

            {result && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                    Recommended Fertilizer: <strong>{result}</strong>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
                    Error: <strong>{error}</strong>
                </div>
            )}
        </div>
    );
}