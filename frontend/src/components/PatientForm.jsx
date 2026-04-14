import { useState } from 'react';
import { User, Activity, ArrowRight, Loader2, HeartPulse, Droplet } from 'lucide-react';

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Demographics */}
      <div className="form-section" style={{ marginBottom: '2.5rem' }}>
        <h3 className="form-section-header">
          <User size={20} color="var(--primary-blue)" />
          Patient Demographics
        </h3>
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Age</label>
            <div className="input-wrapper">
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" required />
            </div>
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
      <div className="form-section" style={{ marginBottom: '3.5rem' }}>
        <h3 className="form-section-header">
          <HeartPulse size={20} color="var(--primary-blue)" />
          Primary Vitals
        </h3>
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Resting Blood Pressure (mm Hg)</label>
            <div className="input-wrapper">
              <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} className="input-field" required />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Maximum Heart Rate (BPM)</label>
            <div className="input-wrapper">
              <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} className="input-field" required />
            </div>
          </div>
          <div className="input-group" style={{ flexBasis: '100%' }}>
            <label className="input-label">Reported Chest Pain Type</label>
            <select name="cp" value={formData.cp} onChange={handleChange} className="select-field">
              <option value={0}>Typical Angina</option>
              <option value={1}>Atypical Angina</option>
              <option value={2}>Non-anginal Pain</option>
              <option value={3}>Asymptomatic</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Exercise Angina</label>
            <select name="exang" value={formData.exang} onChange={handleChange} className="select-field">
              <option value={0}>No (None reported)</option>
              <option value={1}>Yes (Pain induced by exertion)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Labs */}
      <div className="form-section" style={{ marginBottom: '1.5rem' }}>
        <h3 className="form-section-header">
          <Droplet size={20} color="var(--primary-blue)" />
          Lab & Diagnostic Data
        </h3>
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Serum Cholesterol (mg/dl)</label>
            <div className="input-wrapper">
              <input type="number" name="chol" value={formData.chol} onChange={handleChange} className="input-field" required />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Fasting Blood Sugar</label>
            <select name="fbs" value={formData.fbs} onChange={handleChange} className="select-field">
              <option value={0}>Normal (&le; 120 mg/dl)</option>
              <option value={1}>Elevated (&gt; 120 mg/dl)</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Resting ECG</label>
            <select name="restecg" value={formData.restecg} onChange={handleChange} className="select-field">
              <option value={0}>Normal</option>
              <option value={1}>ST-T Wave Abnormality</option>
              <option value={2}>Left Ventricular Hypertrophy</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">ST Depression</label>
            <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} className="input-field" required />
          </div>
          <div className="input-group">
            <label className="input-label">Peak Exercise ST Slope</label>
            <select name="slope" value={formData.slope} onChange={handleChange} className="select-field">
              <option value={0}>Upsloping</option>
              <option value={1}>Flat</option>
              <option value={2}>Downsloping</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Fluoroscopy Vessels</label>
            <input type="number" name="ca" value={formData.ca} onChange={handleChange} className="input-field" min="0" max="3" required />
          </div>
          <div className="input-group">
            <label className="input-label">Thalassemia Test</label>
            <select name="thal" value={formData.thal} onChange={handleChange} className="select-field">
              <option value={1}>Normal Flow</option>
              <option value={2}>Fixed Defect</option>
              <option value={3}>Reversible Defect</option>
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
            <Loader2 size={20} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
            Analyzing clinical patterns...
          </>
        ) : (
          <>
             Analyze Patient Risk <ArrowRight size={20} />
          </>
        )}
      </button>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
};

export default PatientForm;
