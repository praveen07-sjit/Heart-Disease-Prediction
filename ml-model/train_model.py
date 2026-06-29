import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Read the dataset
data = pd.read_csv("heart.csv")

# Display the first 5 rows
print(data.head())

# Separate features and target
X = data.drop("target", axis=1)
y = data["target"]
print("\nTarget Counts:")
print(y.value_counts())

print("\nTarget Meaning:")
print(data.groupby("target").size())

print("\nFeatures:")
print(X.head())

print("\nTarget:")
print(y.head())

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Training data:", X_train.shape)
print("Testing data:", X_test.shape)

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)
# Train the model
model.fit(X_train, y_train)

print("Model trained successfully!")

# Make predictions on the test data
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", accuracy)
from sklearn.metrics import confusion_matrix

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
# Save the trained model
joblib.dump(model, "heart_model.pkl")

print("Model saved successfully!")
print("\nLOW RISK SAMPLE")
print(data[data["target"] == 0].iloc[0])

print("\nHIGH RISK SAMPLE")
print(data[data["target"] == 1].iloc[0])