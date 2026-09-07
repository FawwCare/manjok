import React, { useState } from 'react';
import type { StepProps } from '../../types/survey';
import { submitSurvey } from '../../utils/api';

export const ProgramFeedback: React.FC<StepProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    try {
      setIsSubmitting(true);
      await submitSurvey(data);
      nextStep();
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content">
      <h1 className="step-title">프로그램 의견 작성</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        더 나은 프로그램을 위해 귀하의 소중한 의견을 들려주세요.
      </p>

      <div className="question-block">
        <div className="question-label">
          프로그램 내용 및 과정 중 가장 인상 깊거나 유익했던 점은 무엇입니까?
        </div>
        <textarea
          className="input-field"
          placeholder="자유롭게 작성해 주세요."
          value={data.impressivePoint}
          onChange={(e) => updateData('impressivePoint', e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-label">프로그램 과정 중 보완해야 할 점이 있다면 무엇입니까?</div>
        <textarea
          className="input-field"
          placeholder="운영 체제 등을 변경해 주시기 바랍니다."
          value={data.feedback}
          onChange={(e) => updateData('feedback', e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-label">추후 참여하고 싶은 프로그램은?</div>
        <textarea
          className="input-field"
          placeholder="원하시는 프로그램을 작성해 주세요."
          value={data.futureProgram}
          onChange={(e) => updateData('futureProgram', e.target.value)}
        />
      </div>

      <div className="btn-group" style={{ marginTop: '24px' }}>
        <button
          className="btn btn-secondary"
          onClick={prevStep}
          disabled={isSubmitting}
          type="button"
        >
          ❮ 이전
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={isSubmitting}
          type="button"
        >
          {isSubmitting ? '제출 중...' : '제출하기 ❯'}
        </button>
      </div>
    </div>
  );
};

export default ProgramFeedback;
