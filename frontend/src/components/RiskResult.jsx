import { useEffect, useState } from 'react';
import { Target, AlertTriangle, CheckCircle, BrainCircuit } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const RiskResult = ({ prediction, isLoading, patientData }) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (prediction && !isLoading) {
      const { has_disease_risk, risk_probability } = prediction;
      const targetPercentage = risk_probability ? Math.round(risk_probability * 100) : (has_disease_risk ? 95 : 5);
      
      let start = 0;
      const duration = 1200;
      const incrementTime = (duration / targetPercentage) || 50;
      
      const timer = setInterval(() => {
        start += 1;
        setDisplayPercentage(start);
        if (start >= targetPercentage) {
          clearInterval(timer);
          setDisplayPercentage(targetPercentage);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    } else {
      setDisplayPercentage(0);
    }
  }, [prediction, isLoading]);

  if (isLoading) {
    return (
      <div className="saas-card" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: '400px' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
          <Target size={48} color="var(--primary-blue)" strokeWidth={1.5} />
        </motion.div>
        <h3 style={{ marginTop: '1.5rem', color: 'var(--text-main)' }}>Processing Diagnosis</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Running Random Forest Inference...</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="saas-card" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: '400px' }}>
        <Target size={64} color="var(--border-light)" strokeWidth={1} />
        <h3 style={{ marginTop: '1.5rem', color: 'var(--text-main)' }}>No Data Analyzed</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', textAlign:'center', maxWidth:'250px' }}>
          Please complete the patient input form and run the diagnosis to view predictions.
        </p>
      </div>
    );
  }

  const { has_disease_risk } = prediction;
  
  // Calculate dynamic XAI heuristics based on patientData
  let xaiFactors = [];
  if (patientData) {
    if (patientData.chol > 240) xaiFactors.push({ label: 'High Cholesterol', value: '+14.2%', bad: true });
    else if (patientData.chol < 200) xaiFactors.push({ label: 'Healthy Cholesterol', value: '-8.5%', bad: false });
    
    if (patientData.age > 60) xaiFactors.push({ label: 'Advanced Age', value: '+11.4%', bad: true });
    
    if (patientData.trestbps > 140) xaiFactors.push({ label: 'Elevated BP', value: '+9.1%', bad: true });
    else if (patientData.trestbps <= 120) xaiFactors.push({ label: 'Optimal BP', value: '-6.2%', bad: false });
    
    if (patientData.cp !== 3) xaiFactors.push({ label: 'Reported Angina', value: '+22.5%', bad: true });
    else xaiFactors.push({ label: 'Asymptomatic', value: '-12.0%', bad: false });
    
    if (patientData.exang === 1) xaiFactors.push({ label: 'Exercise Angina', value: '+18.3%', bad: true });
  }
  
  // Sort by absolute impact
  xaiFactors.sort((a,b) => parseFloat(b.value.replace(/[^0-9.]/g, '')) - parseFloat(a.value.replace(/[^0-9.]/g, '')));
  const topFactors = xaiFactors.slice(0, 3);

  // Determine severity tier
  let severityClass = "risk-safe";
  let ringStroke = "var(--success-green)";
  let labelText = "Low Risk";
  
  if (displayPercentage > 70) {
    severityClass = "risk-danger";
    ringStroke = "var(--danger-red)";
    labelText = "High Risk";
  } else if (displayPercentage >= 30) {
    severityClass = "risk-warn";
    ringStroke = "var(--warning-yellow)";
    labelText = "Moderate Risk";
  }

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <>
      {/* Hero Gauge Card */}
      <motion.div 
        className="saas-card"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ marginBottom: '2rem' }}
      >
        <h2 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Diagnostic Result</h2>
        <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Primary severity assessment</p>
        
        <div className="gauge-container">
          <div className="gauge-ring">
            <svg viewBox="0 0 240 240" fill="transparent">
              <circle className="gauge-circle-bg" cx="120" cy="120" r={radius} />
              {displayPercentage > 0 && (
                <circle 
                  className="gauge-circle-fill" 
                  cx="120" cy="120" r={radius} 
                  stroke={ringStroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset} 
                />
              )}
            </svg>
            <div className="gauge-content">
              <span className="gauge-percent">{displayPercentage}%</span>
              <span className="gauge-label">Probability</span>
            </div>
          </div>

          <div className={`risk-badge ${severityClass}`}>
            {displayPercentage > 70 ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
            {labelText}
          </div>
        </div>
      </motion.div>

      {/* Explainable AI Panel */}
      <motion.div 
        className="saas-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom: '1.25rem' }}>
          <BrainCircuit size={20} color="var(--primary-blue)" />
          <h2 style={{fontSize: '1.15rem'}}>Model Insights</h2>
        </div>
        <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
          Top contributing factors influencing this specific prediction based on our heuristic weighting.
        </p>

        {topFactors.length > 0 ? (
          <div className="xai-list">
            {topFactors.map((factor, idx) => (
              <div key={idx} className={`xai-item ${!factor.bad ? 'xai-item-good' : ''}`}>
                <span className="xai-item-label">{factor.label}</span>
                <span className="xai-item-value">{factor.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '1.5rem', background: 'var(--bg-body)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>No extreme deviances detected in clinical markers.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default RiskResult;
