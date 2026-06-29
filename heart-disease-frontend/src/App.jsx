import "./App.css";
import { useState } from "react";
import background from "./assets/ai-medical-bg.jpg";

function App() {
  const [formData, setFormData] = useState({
  age: "",
  sex: "",
  cp: "",
  bp: "",
  cholesterol: "",
  fbs: "",
  restecg: "",
  thalach: "",
  exang: "",
  oldpeak: "",
  slope: "",
  ca: "",
  thal: ""
});
const [result, setResult] = useState("");
const [confidence, setConfidence] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = (e) => {
    
    e.preventDefault();

    fetch("https://heart-disease-prediction-zybj.onrender.com/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})
.then(async (res) => {


  const text = await res.text();
  

  return JSON.parse(text);
})
.then((data) => {
  setResult(data.result);
setConfidence(data.confidence);
})
.catch((err) => {
  console.error(err);
});
};

  return (
    <div
  className="container"
  style={{
    backgroundImage: `url(${background})`,
  }}
>
    <div className="hero">

  <div className="left-panel">

    <span className="logo-text">
      CARDIO CARE
    </span>

    <h1>
      Heart Disease
      <br />
      Prediction System
    </h1>

    <div className="line"></div>

    <h3>
      Accurate Heart Risk Assessment
    </h3>

    <p>
      Enter patient details to predict the
      likelihood of heart disease using
      machine learning.
    </p>

    <div className="feature-box">

      <div className="feature">
        ❤️
        <span>Accurate Prediction</span>
      </div>

      <div className="feature">
        ⚡
        <span>Fast Analysis</span>
      </div>

      <div className="feature">
        🔒
        <span>Secure Data</span>
      </div>

    </div>

  </div>

  <div className="right-panel">

      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <select name="sex" value={formData.sex} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>

       
<select
  name="cp"
  value={formData.cp}
  onChange={handleChange}
  required
>
  <option value="">Chest Pain Type</option>
  <option value="0">Typical Angina</option>
  <option value="1">Atypical Angina</option>
  <option value="2">Non-anginal Pain</option>
  <option value="3">Asymptomatic</option>
</select>
<input
          type="number"
          name="bp"
          placeholder="Resting Blood Pressure"
          value={formData.bp}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="cholesterol"
          placeholder="Cholesterol Level"
          value={formData.cholesterol}
          onChange={handleChange}
          required
        />
        <select
  name="fbs"
  value={formData.fbs}
  onChange={handleChange}
  required
>
  <option value="">Fasting Blood Sugar</option>
  <option value="0">Less than 120 mg/dl</option>
  <option value="1">Greater than 120 mg/dl</option>
</select>
<select
  name="restecg"
  value={formData.restecg}
  onChange={handleChange}
  required
>
  <option value="">Resting ECG</option>
  <option value="0">Normal</option>
  <option value="1">ST-T Wave Abnormality</option>
  <option value="2">Left Ventricular Hypertrophy</option>
</select>
<input
  type="number"
  name="thalach"
  placeholder="Maximum Heart Rate"
  value={formData.thalach}
  onChange={handleChange}
  required
/>
<select
  name="exang"
  value={formData.exang}
  onChange={handleChange}
  required
>
  <option value="">Exercise Induced Angina</option>
  <option value="0">No</option>
  <option value="1">Yes</option>
</select>
<input
  type="number"
  step="0.1"
  name="oldpeak"
  placeholder="Oldpeak (ST Depression)"
  value={formData.oldpeak}
  onChange={handleChange}
  required
/>
<select
  name="slope"
  value={formData.slope}
  onChange={handleChange}
  required
>
  <option value="">Slope</option>
  <option value="0">Upsloping</option>
  <option value="1">Flat</option>
  <option value="2">Downsloping</option>
</select>
<select
  name="ca"
  value={formData.ca}
  onChange={handleChange}
  required
>
  <option value="">Major Vessels</option>
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>
<select
  name="thal"
  value={formData.thal}
  onChange={handleChange}
  required
>
  <option value="">Thalassemia</option>
  <option value="1">Normal</option>
  <option value="2">Fixed Defect</option>
  <option value="3">Reversible Defect</option>
</select>

          <button type="submit">Predict</button>

        {result && (
          <div className="result">
            <h2>{result}</h2>
            <p>Confidence: {confidence}%</p>
          </div>
        )}
      </form>
    </div>
  </div>
</div>
  );
}

export default App;
