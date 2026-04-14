from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="MediMind Backend", description="AI Healthcare Decision Support System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the AI Brain
MODEL_PATH = "medimind_model.joblib"
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
else:
    model = None
    print(f"Warning: Model file {MODEL_PATH} not found. Run train_model.py first.")

class PatientData(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to MediMind AI Backend! Server is running."}

@app.post("/predict")
def predict_risk(patient: PatientData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded. Please train the model.")
        
    try:
        # Convert incoming data to a dictionary, then to pandas DataFrame
        # Must match the column names exactly as training Data
        # using model_dump() for pydantic v2 support
        patient_dict = patient.model_dump() if hasattr(patient, 'model_dump') else patient.dict()
        df = pd.DataFrame([patient_dict])
        
        # Make Prediction
        prediction_val = model.predict(df)[0]
        
        # Try to get probabilities
        try:
            probabilities = model.predict_proba(df)[0]
            risk_probability = float(probabilities[1]) # Probability of class 1 (Risk)
        except (AttributeError, IndexError):
            risk_probability = None
            
        return {
            "prediction": int(prediction_val),
            "has_disease_risk": bool(prediction_val == 1),
            "risk_probability": risk_probability
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
