from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)
model = joblib.load("heart_model.pkl")
@app.route("/")
def home():
    return "PARAM BACKEND TEST 999999"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    print("Received Data:", data)

    input_data = [[
        float(data["age"]),
        float(data["sex"]),
        float(data["cp"]),
        float(data["bp"]),
        float(data["cholesterol"]),
        float(data["fbs"]),
        float(data["restecg"]),
        float(data["thalach"]),
        float(data["exang"]),
        float(data["oldpeak"]),
        float(data["slope"]),
        float(data["ca"]),
        float(data["thal"])
]]
   
    prediction = model.predict(input_data)
    probability = model.predict_proba(input_data)

   

    confidence = round(max(probability[0]) * 100, 2)

    heart_disease = round(probability[0][1] * 100, 2)
    healthy = round(probability[0][0] * 100, 2)

    if prediction[0] == 1:
        result = "High Risk of Heart Disease"
    else:
        result = "Low Risk of Heart Disease"

    return jsonify({
    "result": result,
    "confidence": confidence,
    "heartDisease": heart_disease,
    "healthy": healthy
})

if __name__ == "__main__":
    app.run(debug=True)