import joblib
import pandas as pd
import sys

def main():
    print("Loading the 'AI Brain' (.joblib)...")
    try:
        pipeline = joblib.load("medimind_model.joblib")
        print("✅ Model loaded successfully.")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        sys.exit(1)

    # Creating a sample patient matching the features used in training
    print("\nSimulating patient record...")
    
    # Example features (from a patient likely to have heart disease indicators)
    patient_data = {
        "age": [56],
        "sex": [1],          # 1 = male, 0 = female
        "cp": [3],           # Chest pain type (typical, atypical, non-anginal, asymptomatic)
        "trestbps": [130],   # Resting blood pressure
        "chol": [250],       # Serum cholestoral in mg/dl
        "fbs": [0],          # Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)
        "restecg": [0],      # Resting electrocardiographic results
        "thalach": [150],    # Maximum heart rate achieved
        "exang": [1],        # Exercise induced angina (1 = yes; 0 = no)
        "oldpeak": [1.5],    # ST depression induced by exercise relative to rest
        "slope": [2],        # The slope of the peak exercise ST segment
        "ca": [1],           # Number of major vessels (0-3) colored by flourosopy
        "thal": [3]          # 3 = normal; 6 = fixed defect; 7 = reversable defect
    }
    
    df_patient = pd.DataFrame(patient_data)
    
    print("\nRunning live inference...")
    try:
        # Get raw class prediction (0 or 1)
        prediction = pipeline.predict(df_patient)[0]
        
        # Get probability/confidence
        probabilities = pipeline.predict_proba(df_patient)[0]
        confidence_risk = probabilities[1] * 100
        
        print(f"\n--- 🏥 Inference Results ---")
        print(f"Risk Likelihood: {confidence_risk:.1f}%")
        if prediction == 1:
            print("Diagnosis Flag: ⚠️ High Risk of Heart Disease Detected")
        else:
            print("Diagnosis Flag: ✅ Low Risk. Normal routine checkup advised.")
            
    except Exception as e:
        print(f"❌ Inference failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
