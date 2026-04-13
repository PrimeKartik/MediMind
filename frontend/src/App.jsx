import { useState } from 'react';
import { Stethoscope } from 'lucide-react';
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
      const response = await fetch('http://localhost:8000/predict', {
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
        </div>
        
        <nav className="nav-links">
          <button className={`nav-btn ${activeTab === 'clinical' ? 'active' : ''}`} onClick={() => setActiveTab('clinical')}>Clinical Dashboard</button>
          <button className={`nav-btn ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>Patient Directory</button>
          <button className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
        </nav>
      </motion.header>

      <main className="main-content">
        <motion.div 
          className="saas-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PatientForm onSubmit={handlePredict} isLoading={loading} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RiskResult prediction={prediction} isLoading={loading} patientData={patientData} />
        </motion.div>
      </main>
    </div>
  )
}

export default App;
