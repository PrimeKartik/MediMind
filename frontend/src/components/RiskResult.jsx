import { useEffect, useState } from 'react';
import { Target, Activity, ShieldCheck, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const MockChart = () => (
  <div className="history-chart">
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* Background Grid Lines */}
      <line x1="0" y1="30" x2="400" y2="30" stroke="var(--border-light)" strokeDasharray="4 4" />
      <line x1="0" y1="60" x2="400" y2="60" stroke="var(--border-light)" strokeDasharray="4 4" />
      <line x1="0" y1="90" x2="400" y2="90" stroke="var(--border-light)" strokeDasharray="4 4" />
      
      {/* Line and Area */}
      <path 
        className="chart-area" 
        d="M 0 120 L 0 60 Q 50 80 100 50 T 200 70 T 300 40 T 380 45 L 400 45 L 400 120 Z" 
      />
      <path 
        className="chart-line" 
        d="M 0 60 Q 50 80 100 50 T 200 70 T 300 40 T 380 45 L 400 45" 
      />
      
      {/* Dots */}
      <circle cx="0" cy="60" r="4" className="chart-dot" />
      <circle cx="100" cy="50" r="4" className="chart-dot" />
      <circle cx="200" cy="70" r="4" className="chart-dot" />
      <circle cx="300" cy="40" r="4" className="chart-dot" />
      <circle cx="380" cy="45" r="4" className="chart-dot" />
    </svg>
  </div>
);

const RiskResult = ({ prediction, isLoading, patientData }) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (prediction && !isLoading) {
      const { has_disease_risk, risk_probability } = prediction;
      const targetPercentage = risk_probability ? Math.round(risk_probability * 100) : (has_disease_risk ? 95 : 5);
      
      let start = 0;
      const duration = 1500;
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
      <div className="premium-card premium-result" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: '500px' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
          <Activity size={56} color="var(--primary-blue)" strokeWidth={1.5} />
        </motion.div>
        <h3 style={{ marginTop: '2rem', color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 700 }}>Analyzing Clinical Patterns</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.75rem' }}>Evaluating historical heuristics against inputs...</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="premium-card premium-result" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: '500px' }}>
        <div style={{ background: 'var(--primary-light)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem' }}>
          <Target size={56} color="var(--primary-blue)" strokeWidth={1.5} />
        </div>
        <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 700 }}>Awaiting Patient Profile</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '1rem', textAlign:'center', maxWidth:'350px', lineHeight: 1.6 }}>
          Please input the patient's demographics, vitals, and lab results in the left panel to execute the risk analysis.
        </p>
      </div>
    );
  }

  // Calculate dynamic XAI heuristics based on patientData
  let explanationLine = "Clinical markers are within normal operating ranges.";
  
  if (patientData) {
    let risks = [];
    if (patientData.chol > 240) risks.push("elevated cholesterol");
    if (patientData.age > 60) risks.push("advanced age");
    if (patientData.trestbps > 140) risks.push("high resting blood pressure");
    if (patientData.cp !== 3) risks.push("reported angina");
    if (patientData.exang === 1) risks.push("exercise-induced angina");
    
    if (risks.length > 0) {
      if (risks.length === 1) explanationLine = `Higher risk primarily due to ${risks[0]}.`;
      if (risks.length === 2) explanationLine = `Higher risk due to ${risks[0]} and ${risks[1]}.`;
      if (risks.length > 2) explanationLine = `Higher risk due to ${risks[0]}, ${risks[1]}, and other contributing factors.`;
    }
  }

  // Determine severity tier
  let severityClass = "risk-safe";
  let ringStroke = "var(--success-green)";
  let labelText = "Mild likelihood of cardiovascular complications over the next 12 months.";
  let titleText = "Low Risk";

  if (displayPercentage > 70) {
    severityClass = "risk-danger";
    ringStroke = "var(--danger-red)";
    labelText = "Significantly elevated risk metrics. Immediate clinical review and follow-up is recommended.";
    titleText = "High Risk";
  } else if (displayPercentage >= 35) {
    severityClass = "risk-warn";
    ringStroke = "var(--warning-yellow)";
    labelText = "Moderate risk elevation. Consider lifestyle interventions or advanced imaging.";
    titleText = "Moderate Risk";
  }

  const radius = 120;
  const circumference = Math.PI * radius; // Half circle
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <>
      <motion.div 
        className={`premium-card premium-result ${severityClass}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="premium-card-header">
          <h2 className="premium-card-title">
            <ShieldCheck size={28} color="var(--primary-blue)" />
            Cardiovascular Prediction
          </h2>
        </div>
        
        <div className="gauge-container">
          <div className="gauge-arc">
            <svg viewBox="0 0 300 150" fill="transparent" style={{ overflow: 'visible' }}>
              <path className="gauge-circle-bg" d="M 30 150 A 120 120 0 0 1 270 150" />
              {displayPercentage > 0 && (
                <path 
                  className="gauge-circle-fill" 
                  d="M 30 150 A 120 120 0 0 1 270 150" 
                  stroke={ringStroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset} 
                />
              )}
            </svg>
            <div className="gauge-content">
              <span className="gauge-percent">{displayPercentage}%</span>
            </div>
          </div>
          <div className="explanation-title" style={{ marginTop: '1.25rem', fontSize: '1.35rem' }}>{titleText}</div>
        </div>

        <div className="explanation-block">
          <div className="explanation-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: "inherit" }}>
            <AlertCircle size={20} /> Clinical Assessment
          </div>
          <div className="explanation-text">{explanationLine}</div>
          <div className="explanation-text" style={{ marginTop: '0.75rem', fontSize: '0.95rem', opacity: 0.85 }}>
            {labelText}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="premium-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ padding: '2rem 3rem' }}
      >
        <h2 className="premium-card-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          <TrendingUp size={22} color="var(--primary-blue)" />
          Simulated Risk Trend
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Historical volatility of patient risk markers.
        </p>
        <MockChart />
      </motion.div>
    </>
  );
};

export default RiskResult;
