import joblib

model = joblib.load("heart_model.pkl")

sample = [[
    63,  # age
    1,   # sex
    3,   # cp
    160, # bp
    280, # cholesterol
    1,   # fbs
    2,   # restecg
    108, # thalach
    1,   # exang
    1.7, # oldpeak
    1,   # slope
    3,   # ca
    3    # thal
]]

prediction = model.predict(sample)
print("Prediction:", prediction)