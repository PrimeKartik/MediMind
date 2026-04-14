# MediMind 🧠⚕️

A premium, production-grade clinical decision-support system utilizing Machine Learning for healthcare analytics.

## Overview
MediMind processes complex medical and diagnostic data to provide predictive cardiovascular insights with interpretable outputs. The platform features a high-end, asymmetric clinical dashboard built with React and Vanilla CSS (designed to feel like a modern, flagship SaaS product), and a robust Machine Learning inference backend executed via FastAPI and scikit-learn.

The core of this phase predicts heart disease risk based on patient vital metrics and historical data, leveraging the UCI Heart Disease Dataset.

## Project Structure
- `frontend/`: The React+Vite web application featuring a deep-themed, clean healthcare interface with dynamic interactive reporting graphs.
- `main.py`: The FastAPI backend application simulating the secure medical data API and serving the ML model.
- `train_model.py`: Automates the ML pipeline (data fetching, imputation, scaling, Random Forest training) and exports the diagnostic model as `medimind_model.joblib`.
- `verify_model.py`: Local terminal verification logic to simulate live inference using the `.joblib` export.

## Setup Instructions

### 1. Backend Setup (FastAPI & ML)

1. **Create and Activate Virtual Environment**
   ```bash
   python -m venv venv
   ```
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the Initial Model (Optional)**
   The repo may include a pre-trained model (`medimind_model.joblib`). To retrain or fetch fresh data:
   ```bash
   python train_model.py
   ```

4. **Run the Backend Server**
   ```bash
   python main.py
   ```
   *Alternatively, run `uvicorn main:app --reload`. The backend routes through `http://localhost:8000`.*

### 2. Frontend Setup (React + Vite)

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node modules**
   ```bash
   npm install
   ```

3. **Run the Development UI**
   ```bash
   npm run dev
   ```
   *The premium clinical dashboard will be accessible locally at `http://localhost:5173`. Ensure the FastAPI server is actively routing requests on port 8000.*

## Technologies
- **Frontend**: React.js, Vite, Framer Motion, Vanilla CSS (Premium Startup Theming), Lucide React
- **Backend**: Python, FastAPI, Uvicorn, Pydantic
- **Machine Learning**: Scikit-Learn, Pandas, NumPy, Joblib
