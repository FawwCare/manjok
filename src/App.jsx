import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BasicInfo from './pages/survey/BasicInfo';
import JointCheck from './pages/survey/JointCheck';
import MuscleCheck from './pages/survey/MuscleCheck';
import ProgramSatisfaction from './pages/survey/ProgramSatisfaction';
import ProgramFeedback from './pages/survey/ProgramFeedback';
import FinishPage from './pages/survey/FinishPage';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    workTypeGroup: '',
    workTypeDetail: '',
    company: '',
    gender: '',
    age: '',
    satisfaction4: 0,
    satisfaction5: 0,
    satisfaction6: 0,
    satisfaction7: 0,
    satisfaction8: 0,
    satisfaction9: 0,
    impressivePoint: '',
    feedback: '',
    futureProgram: '',
    jointPainAreas: [],
    musclePainAreas: [],
    medicalHistory: ''
  });

  const updateData = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(0, s - 1));
  const resetSurvey = () => {
    setData({
      name: '',
      workTypeGroup: '',
      workTypeDetail: '',
      company: '',
      gender: '',
      age: '',
      satisfaction4: 0,
      satisfaction5: 0,
      satisfaction6: 0,
      satisfaction7: 0,
      satisfaction8: 0,
      satisfaction9: 0,
      impressivePoint: '',
      feedback: '',
      futureProgram: '',
      jointPainAreas: [],
      musclePainAreas: [],
      medicalHistory: ''
    });
    setStep(0);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <LandingPage nextStep={nextStep} />;
      case 1:
        return <BasicInfo data={data} updateData={updateData} nextStep={nextStep} />;
      case 2:
        return <JointCheck data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <MuscleCheck data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <ProgramSatisfaction data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <ProgramFeedback data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <FinishPage resetSurvey={resetSurvey} />;
      default:
        return <LandingPage nextStep={nextStep} />;
    }
  };

  const totalSteps = 5;
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="app-wrapper">
      {step > 0 && step <= totalSteps && (
        <div className="global-header-wrapper">
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="global-header">
            <div style={{ cursor: 'pointer', padding: '4px 8px' }} onClick={() => setStep(0)}>🏠 홈</div>
            <div className="progress-text">{step} / {totalSteps}</div>
          </div>
        </div>
      )}
      <div className="app-container">
        {renderStep()}
      </div>
    </div>
  );
}

export default App;
