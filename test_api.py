import subprocess
import time
import requests

print("Starting server...")
proc = subprocess.Popen(["venv\\Scripts\\python.exe", "-m", "uvicorn", "main:app", "--port", "8000"])
time.sleep(4) # wait for server to start

try:
    print("\n--- Testing Health Check ---")
    resp = requests.get("http://localhost:8000/")
    print("Status:", resp.status_code)
    print("Response:", resp.json())
    
    print("\n--- Testing Prediction ---")
    payload = {
        "age": 63.0, "sex": 1.0, "cp": 3.0, "trestbps": 145.0, "chol": 233.0,
        "fbs": 1.0, "restecg": 0.0, "thalach": 150.0, "exang": 0.0, "oldpeak": 2.3,
        "slope": 0.0, "ca": 0.0, "thal": 1.0
    }
    resp = requests.post("http://localhost:8000/predict", json=payload)
    print("Status:", resp.status_code)
    print("Response:", resp.json())
except Exception as e:
    print("Error:", e)
finally:
    print("\nShutting down server...")
    proc.terminate()
