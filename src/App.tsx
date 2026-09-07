import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BasicInfo from './pages/survey/BasicInfo';
import JointCheck from './pages/survey/JointCheck';
import MuscleCheck from './pages/survey/MuscleCheck';
import ProgramSatisfaction from './pages/survey/ProgramSatisfaction';
import ProgramFeedback from './pages/survey/ProgramFeedback';
import FinishPage from './pages/survey/FinishPage';
import type { SurveyFormData, UpdateSurveyData } from './types/survey';
import './App.css';

const initialData: SurveyFormData = {
  name: '',
  workTypeGroup: '',
  workTypeDetail: '',
  company: '',
  gender: '',
  age: '',
  satisfactionTotal: 0,
  satisfactionTime: 0,
  satisfactionTeacher: 0,
  satisfactionRecommend: 0,
  satisfactionRetention: 0,
  satisfactionImprove: 0,
  impressivePoint: '',
  feedback: '',
  futureProgram: '',
  jointPainAreas: [],
  musclePainAreas: [],
  medicalHistory: '',
};

function App() {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<SurveyFormData>(initialData);

  const updateData: UpdateSurveyData = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(0, s - 1));
  const resetSurvey = () => {
    setData(initialData);
    setStep(0);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <LandingPage nextStep={nextStep} />;
      case 1:
        return <BasicInfo data={data} updateData={updateData} nextStep={nextStep} />;
      case 2:
        return (
          <JointCheck
            data={data}
            updateData={updateData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <MuscleCheck
            data={data}
            updateData={updateData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <ProgramSatisfaction
            data={data}
            updateData={updateData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <ProgramFeedback
            data={data}
            updateData={updateData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
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
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="global-header">
            <button
              type="button"
              style={{
                cursor: 'pointer',
                padding: '4px 8px',
                background: 'none',
                border: 'none',
                font: 'inherit',
                color: 'inherit',
              }}
              onClick={() => setStep(0)}
            >
              🏠 홈
            </button>
            <div className="progress-text">
              {step} / {totalSteps}
            </div>
          </div>
        </div>
      )}
      <div className="app-container">{renderStep()}</div>
    </div>
  );
}

export default App;
