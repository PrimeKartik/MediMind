# MediMind

An intelligent healthcare decision-support system prototype using Machine Learning.

## Overview
MediMind processes medical data to provide predictive insights (disease risk assessment) with interpretable outputs. The core of this phase is predicting heart disease risk based on patient vital metrics and historical data (using the UCI Heart Disease Dataset).

## Project Structure
- `train_model.py`: Fetches the Heart Disease Dataset, preprocesses it, builds an ML pipeline (imputation, scaling, Random Forest), trains the model, and exports it as `medimind_model.joblib`.
- `verify_model.py`: Loads the trained `.joblib` model and simulates a live inference on sample patient data to predict the likelihood and risk of heart disease.

## Setup Instructions

1. **Create Virtual Environment**
   ```bash
   python -m venv venv
   ```
   Activate the environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the Model**
   ```bash
   python train_model.py
   ```
   This will train the Random Forest Classifier and generate/save the `medimind_model.joblib` file.

4. **Verify Live Inference**
   ```bash
   python verify_model.py
   ```
   This script runs a single inference against the saved model to demonstrate risk assessment.
