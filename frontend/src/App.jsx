import { useState } from 'react';
import { Stethoscope, UserCircle, Settings, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import PatientForm from './components/PatientForm';
import RiskResult from './components/RiskResult';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('clinical');

  const handlePredict = async (data) => {
    setLoading(true);
    setPatientData(data);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Prediction API failed');
      }

      const result = await response.json();
      
      // Smooth loading transition
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Error: Could not connect to AI endpoint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <motion.header 
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="logo">
          <Stethoscope size={28} color="var(--primary-blue)" />
          <span>MediMind</span>
          <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-blue)', padding: '0.2rem 0.5rem', borderRadius: '4px', marginLeft: '0.5rem', fontWeight: 600 }}>PRO</span>
        </div>
        
        <nav className="nav-links">
          <button className={`nav-btn ${activeTab === 'clinical' ? 'active' : ''}`} onClick={() => setActiveTab('clinical')}>Dashboard</button>
          <button className={`nav-btn ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>Patient Directory</button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'var(--text-secondary)' }}>
          <Bell size={20} style={{ cursor: 'pointer' }} />
          <Settings size={20} style={{ cursor: 'pointer' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid var(--border-light)', paddingLeft: '1.25rem' }}>
            <UserCircle size={32} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Dr. Smith</span>
              <span style={{ fontSize: '0.75rem' }}>Cardiology</span>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="main-content">
        <motion.div 
          className="patient-panel"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Cardiovascular Assessment</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Input patient diagnostics to evaluate short-term myocardial infarction risk.</p>
          </div>
          <PatientForm onSubmit={handlePredict} isLoading={loading} />
        </motion.div>
        
        <motion.div 
          className="result-panel"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <RiskResult prediction={prediction} isLoading={loading} patientData={patientData} />
        </motion.div>
      </main>
    </div>
  )
}

export default App;
