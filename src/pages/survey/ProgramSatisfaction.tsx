import { useEffect, useState } from 'react';
import type { StepProps } from '../../types/survey';

type SatisfactionField =
  | 'satisfactionTotal'
  | 'satisfactionTime'
  | 'satisfactionTeacher'
  | 'satisfactionRecommend'
  | 'satisfactionRetention'
  | 'satisfactionImprove';

export const ProgramSatisfaction: React.FC<StepProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const scores = [1, 2, 3, 4, 5];
  const [showSecondBlock, setShowSecondBlock] = useState(false);

  // 3번 문항(satisfactionTeacher)이 체크되면 4, 5, 6번 문항을 표시합니다.
  useEffect(() => {
    if (data.satisfactionTeacher > 0) {
      setShowSecondBlock(true);
    }
  }, [data.satisfactionTeacher]);

  const renderScoreQuestion = (
    number: number,
    text: string,
    field: SatisfactionField
  ) => (
    <div className="question-block" style={{ marginBottom: '28px' }}>
      <div className="question-label">
        {number}. {text}
      </div>
      <div className="score-group">
        {scores.map((s) => {
          const isActive = data[field] === s;
          const bgColors = ['#ccfbf1', '#5eead4', '#2dd4bf', '#0d9488', '#0f766e'];
          const textColors = ['#0f766e', '#0f766e', '#ffffff', '#ffffff', '#ffffff'];

          const customStyle = isActive
            ? ({
                '--active-bg': bgColors[s - 1],
                '--active-text': textColors[s - 1],
              } as React.CSSProperties)
            : undefined;

          return (
            <button
              key={s}
              type="button"
              className={`score-chip ${isActive ? 'active' : ''}`}
              onClick={() => updateData(field, s)}
              style={customStyle}
            >
              <span>{s}</span>
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}
      >
        <span>전혀 그렇지 않다</span>
        <span>매우 그렇다</span>
      </div>
    </div>
  );

  return (
    <div className="content">
      <h1 className="step-title">프로그램 만족도</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
        아래 문항을 읽고 해당하는 점수를 선택해 주세요.
      </p>

      <div className="satisfaction-block">
        {renderScoreQuestion(1, '전체적으로 프로그램은 만족스럽고 유익했다.', 'satisfactionTotal')}
        {renderScoreQuestion(2, '프로그램 시간은 내용을 습득하기에 적절했다.', 'satisfactionTime')}
        {renderScoreQuestion(3, '강사의 전문성은 만족스러웠다.', 'satisfactionTeacher')}
      </div>

      <div
        className={`satisfaction-block scroll-reveal ${showSecondBlock ? 'visible' : ''}`}
        style={{ marginTop: '24px' }}
      >
        {renderScoreQuestion(4, '다른 사람에게 본 프로그램을 참여를 권유하고 싶다.', 'satisfactionRecommend')}
        {renderScoreQuestion(5, '앞으로 이와 비슷한 프로그램이 있다면 또 참여하고 싶다.', 'satisfactionRetention')}
        {renderScoreQuestion(6, '프로그램 받은 후 받기 전보다 좋아졌다.', 'satisfactionImprove')}
      </div>

      <div className="btn-group" style={{ marginTop: '16px' }}>
        <button className="btn btn-secondary" onClick={prevStep} type="button">
          ❮ 이전
        </button>
        <button className="btn btn-primary" onClick={nextStep} type="button">
          다음 ❯
        </button>
      </div>
    </div>
  );
};

export default ProgramSatisfaction;
