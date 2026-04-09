import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, recall_score
import joblib

def main():
    print("1. Fetching Heart Disease Dataset from UCI...")
    url = "https://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/processed.cleveland.data"
    column_names = [
        "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", 
        "thalach", "exang", "oldpeak", "slope", "ca", "thal", "target"
    ]
    df = pd.read_csv(url, names=column_names, na_values="?")

    print("2. Preprocessing Data...")
    # Binarize target: 0 means no disease, >0 means disease risk
    df["target"] = (df["target"] > 0).astype(int)

    # Separate features and target
    X = df.drop("target", axis=1)
    y = df["target"]

    # Split data into training and testing
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print("3. Building Machine Learning Pipeline...")
    # We create a pipeline that first imputes missing values, 
    # then standardizes all features to the same scale,
    # and finally trains our AI brain (Random Forest Classifier)
    
    pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')), # Replace missing values with median
        ('scaler', StandardScaler()),                  # Scale metrics to similar range
        ('classifier', RandomForestClassifier(         # The core "brain"
            n_estimators=100, 
            random_state=42, 
            max_depth=5,     # Keep shallow to prevent overfitting & maintain interpretability
            class_weight='balanced'
        ))
    ])

    print("4. Training Model on Historical Medical Data...")
    pipeline.fit(X_train, y_train)

    print("5. Evaluating Model Performance...")
    y_pred = pipeline.predict(X_test)
    
    acc = accuracy_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    
    print(f"\n--- Performance Metrics ---")
    print(f"Accuracy (Overall Correctness): {acc * 100:.2f}%")
    print(f"Recall (Sensitivity - True Positive Rate): {recall * 100:.2f}%")
    print(f"\nDetailed Report:\n{classification_report(y_test, y_pred)}")

    print("6. Exporting and Saving the 'AI Brain'...")
    model_filename = "medimind_model.joblib"
    joblib.dump(pipeline, model_filename)
    print(f"✅ Model successfully saved to {model_filename}")
    print("This file is ready to be loaded by your FastAPI Live Inference Engine (Phase 2).")

if __name__ == "__main__":
    main()
