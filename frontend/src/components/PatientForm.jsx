import { useState } from 'react';
import { User, Activity, FileText, ArrowRight, Loader2, HeartPulse, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    age: 63,
    sex: 1,
    cp: 3,
    trestbps: 145,
    chol: 233,
    fbs: 1,
    restecg: 0,
    thalach: 150,
    exang: 0,
    oldpeak: 2.3,
    slope: 0,
    ca: 0,
    thal: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginBottom: '2rem'}}>
        <h2 style={{fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.25rem'}}>Patient Input Data</h2>
        <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem'}}>
          Enter the patient's clinical markers to run the diagnostic model.
        </p>
      </div>
      
      {/* Demographics */}
      <div className="form-section">
        <h3 className="form-section-header">Demographics</h3>
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Age</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field has-icon" required />
            </div>
            <span className="input-helper">Years</span>
          </div>
          <div className="input-group">
            <label className="input-label">Biological Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange} className="select-field">
              <option value={1}>Male</option>
              <option value={0}>Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div className="form-section">
        <h3 className="form-section-header">Vitals & Symptoms</h3>
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Chest Pain Type</label>
            <select name="cp" value={formData.cp} onChange={handleChange} className="select-field">
              <option value={0}>Typical Angina</option>
              <option value={1}>Atypical Angina</option>
              <option value={2}>Non-anginal Pain</option>
              <option value={3}>Asymptomatic</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Resting Blood Pressure</label>
            <div className="input-wrapper">
              <HeartPulse size={18} className="input-icon" />
              <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} className="input-field has-icon" required />
            </div>
            <span className="input-helper">mm Hg (Ideal 90-120)</span>
          </div>
          <div className="input-group">
            <label className="input-label">Max Heart Rate</label>
            <div className="input-wrapper">
              <Activity size={18} className="input-icon" />
              <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} className="input-field has-icon" required />
            </div>
            <span className="input-helper">BPM during exercise</span>
          </div>
          <div className="input-group">
            <label className="input-label">Exercise Angina</label>
            <select name="exang" value={formData.exang} onChange={handleChange} className="select-field">
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Labs */}
      <div className="form-section" style={{marginBottom: 0}}>
        <h3 className="form-section-header">Lab Results</h3>
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Cholesterol</label>
            <div className="input-wrapper">
              <Droplet size={18} className="input-icon" />
              <input type="number" name="chol" value={formData.chol} onChange={handleChange} className="input-field has-icon" required />
            </div>
            <span className="input-helper">mg/dl</span>
          </div>
          <div className="input-group">
            <label className="input-label">Fasting Sugar &gt; 120</label>
            <select name="fbs" value={formData.fbs} onChange={handleChange} className="select-field">
              <option value={0}>False</option>
              <option value={1}>True</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Resting ECG</label>
            <select name="restecg" value={formData.restecg} onChange={handleChange} className="select-field">
              <option value={0}>Normal</option>
              <option value={1}>ST-T Abnormality</option>
              <option value={2}>LV Hypertrophy</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">ST Depression</label>
            <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} className="input-field" required />
          </div>
          <div className="input-group">
            <label className="input-label">ST Slope</label>
            <select name="slope" value={formData.slope} onChange={handleChange} className="select-field">
              <option value={0}>Upsloping</option>
              <option value={1}>Flat</option>
              <option value={2}>Downsloping</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Flourosopy Vessels</label>
            <input type="number" name="ca" value={formData.ca} onChange={handleChange} className="input-field" min="0" max="3" required />
          </div>
          <div className="input-group">
            <label className="input-label">Thalassemia</label>
            <select name="thal" value={formData.thal} onChange={handleChange} className="select-field">
              <option value={1}>Normal</option>
              <option value={2}>Fixed Defect</option>
              <option value={3}>Reversible</option>
            </select>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn-primary" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'flex' }}>
              <Loader2 size={20} /> 
            </motion.div>
            Processing Output...
          </>
        ) : (
          <>
             Run Diagnosis <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default PatientForm;
