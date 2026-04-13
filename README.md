# MediMind 🧠🤖

An intelligent, futuristic healthcare decision-support system prototype using Machine Learning.

## Overview
MediMind processes medical data to provide predictive insights (disease risk assessment) with interpretable outputs. The platform features a state-of-the-art "JARVIS-style" cybernetic HUD interface built with React and a robust Machine Learning inference backend built with FastAPI and scikit-learn. The core of this phase is predicting heart disease risk based on patient vital metrics and historical data (using the UCI Heart Disease Dataset).

## Project Structure
- `frontend/`: The React+Vite web application featuring a highly interactive, futuristic diagnostic HUD.
- `main.py`: The FastAPI backend application that serves the ML model via a REST API.
- `train_model.py`: Fetches the Heart Disease Dataset, preprocesses it, builds an ML pipeline (imputation, scaling, Random Forest), trains the model, and exports it as `medimind_model.joblib`.
- `verify_model.py`: Loads the trained `.joblib` model and simulates a live inference on sample patient data in the terminal.

## Setup Instructions

### 1. Backend Setup (Python, FastAPI & Machine Learning)

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
   The repository already includes a pre-trained model (`medimind_model.joblib`). If you want to retrain it:
   ```bash
   python train_model.py
   ```

4. **Run the Backend Server**
   ```bash
   python main.py
   ```
   *Alternatively, run `uvicorn main:app --reload`. The backend will start on `http://localhost:8000`.*

### 2. Frontend Setup (React + Vite)

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node modules**
   *(Ensure you have Node.js installed)*
   ```bash
   npm install
   ```

3. **Run the Development Environment**
   ```bash
   npm run dev
   ```
   *The futuristic HUD UI will be accessible locally, typically at `http://localhost:5173`. It expects the FastAPI backend to be running on port 8000.*

## Technologies Used
- **Frontend**: React.js, Vite, Framer Motion, Vanilla CSS, Lucide React
- **Backend**: Python, FastAPI, Uvicorn, Pydantic
- **Machine Learning**: Scikit-Learn, Pandas, NumPy, Joblib
