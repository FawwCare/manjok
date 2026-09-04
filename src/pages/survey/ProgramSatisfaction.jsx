import React, { useEffect, useState } from 'react';

function ProgramSatisfaction({ data, updateData, nextStep, prevStep }) {
  const scores = [1, 2, 3, 4, 5];
  const [showSecondBlock, setShowSecondBlock] = useState(false);

  // 3번 문항(satisfaction6)이 체크되면 4, 5, 6번 문항을 띄웁니다.
  useEffect(() => {
    if (data.satisfaction6 > 0) {
      setShowSecondBlock(true);
    }
  }, [data.satisfaction6]);

  const renderScoreQuestion = (number, text, field) => (
    <div className="question-block" style={{ marginBottom: '28px' }}>
      <div className="question-label">{number}. {text}</div>
      <div className="score-group">
        {scores.map(s => {
          const isActive = data[field] === s;
          const bgColors = ['#ccfbf1', '#5eead4', '#2dd4bf', '#0d9488', '#0f766e'];
          const textColors = ['#0f766e', '#0f766e', '#ffffff', '#ffffff', '#ffffff'];
          
          return (
            <div 
              key={s} 
              className={`score-chip ${isActive ? 'active' : ''}`} 
              onClick={() => updateData(field, s)}
              style={isActive ? {
                '--active-bg': bgColors[s - 1],
                '--active-text': textColors[s - 1]
              } : {}}
            >
              <span>{s}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
        {renderScoreQuestion(1, "전체적으로 프로그램은 만족스럽고 유익했다.", "satisfaction4")}
        {renderScoreQuestion(2, "프로그램 시간은 내용을 습득하기에 적절했다.", "satisfaction5")}
        {renderScoreQuestion(3, "강사의 전문성은 만족스러웠다.", "satisfaction6")}
      </div>

      <div 
        className={`satisfaction-block scroll-reveal ${showSecondBlock ? 'visible' : ''}`}
        style={{ marginTop: '24px' }}
      >
        {renderScoreQuestion(4, "다른 사람에게 본 프로그램을 참여를 권유하고 싶다.", "satisfaction7")}
        {renderScoreQuestion(5, "앞으로 이와 비슷한 프로그램이 있다면 또 참여하고 싶다.", "satisfaction8")}
        {renderScoreQuestion(6, "프로그램 받은 후 받기 전보다 좋아졌다.", "satisfaction9")}
      </div>

      <div className="btn-group" style={{ marginTop: '16px' }}>
        <button className="btn btn-secondary" onClick={prevStep}>❮ 이전</button>
        <button className="btn btn-primary" onClick={nextStep}>다음 ❯</button>
      </div>
    </div>
  );
}

export default ProgramSatisfaction;
