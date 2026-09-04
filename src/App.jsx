import React, { useState } from 'react';
import humanBodyImg from './assets/human_body.jpg';

function App() {
  const [step, setStep] = useState(0);

  // Survey Data State (개편된 헤더 목록 반영)
  const [data, setData] = useState({
    name: '',
    workTypeGroup: '', // 1. 귀하의 근무형태를 선택해 주세요
    company: '',       // 직장(지역명+직장명)
    workTypeDetail: '',// 귀하의 근무형태를 선택해 주세요 (상세)
    gender: '',        // 2. 귀하의 성별을 선택해 주세요
    age: '',           // 3. 귀하의 연령대를 선택해 주세요
    jointPainAreas: [],// 다음 관절 부위 중...
    musclePainAreas: [],// 다음 근육 부위 중...
    medicalHistory: '',
    satisfaction4: null, // 4. 전체적으로 프로그램은 만족스럽고 유익했다
    satisfaction5: null, // 5. 프로그램 시간은 내용을 습득하기에 적절했다
    satisfaction6: null, // 6. 강사의 전문성은 만족스러웠다
    satisfaction7: null, // 7. 다른 사람에게 본 프로그램을 참여를 권유하고 싶다
    satisfaction8: null, // 8. 앞으로 이와 비슷한 프로그램이 있다면 또 참여하고 싶다
    satisfaction9: null, // 9. 프로그램 받은 후 받기 전보다 좋아졌다
    impressivePoint: '', // 프로그램 내용 및 과정 중 가장 인상 깊거나 유익했던 점은 무엇입니까?
    feedback: '',        // 프로그램 과정 중 보완해야 할 점이 있다면 무엇입니까?
    futureProgram: ''    // 추후 참여하고싶은 프로그램은?
  });

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(s => s + 1);
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(s => s - 1);
  };
  const updateData = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const resetSurvey = () => {
    setData({
      name: '',
      workTypeGroup: '', 
      company: '',       
      workTypeDetail: '',
      gender: '',        
      age: '',           
      jointPainAreas: [],
      musclePainAreas: [],
      medicalHistory: '',
      satisfaction4: null, 
      satisfaction5: null, 
      satisfaction6: null, 
      satisfaction7: null, 
      satisfaction8: null, 
      satisfaction9: null, 
      impressivePoint: '', 
      feedback: '',        
      futureProgram: ''    
    });
    setStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {step > 0 && step < 4 && (
        <div className="global-header">
          <span style={{ cursor: 'pointer' }} onClick={() => setStep(0)}>🏠 홈</span>
          <span className="progress-text">{step} / 3</span>
        </div>
      )}
      <div className="app-container">
        {step === 0 && <LandingPage nextStep={nextStep} />}
        {step === 1 && <BasicInfo data={data} updateData={updateData} nextStep={nextStep} />}
        {step === 2 && <HealthCheck data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <ProgramSatisfaction data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <FinishPage resetSurvey={resetSurvey} />}
      </div>
    </div>
  );
}

// 0. Landing Page
function LandingPage({ nextStep }) {
  return (
    <div className="landing-content">
      <div className="landing-header">
        <div className="landing-badge">기업화된 피지컬케어</div>
        <h1 className="landing-heading">EAP 통합 관리 포털</h1>
        <p className="landing-desc">임직원 건강 설문 및 관리자 시스템입니다.</p>
      </div>
      
      <div className="landing-actions">
        <button className="btn btn-hero" onClick={nextStep}>
          <span>설문조사 시작하기</span>
          <span className="arrow">➔</span>
        </button>
      </div>

      <div className="landing-divider">
        <span>관리자 및 전문가 전용</span>
      </div>

      <div className="landing-admin-actions">
        <button className="btn-kakao">
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-5.523 0-10 3.51-10 7.838 0 2.76 1.748 5.176 4.39 6.55-.436 1.6-1.577 5.49-1.61 5.626-.044.175.127.25.263.15.11-.082 5.253-3.486 6.137-4.116.27.025.545.04.82.04 5.523 0 10-3.511 10-7.839S17.523 3 12 3z" fill="#000000"/></svg>
          카카오계정으로 로그인
        </button>
        <button className="btn-email">관리자 이메일 로그인</button>
        
        <div className="expert-link">
          전문가입니다.
        </div>
      </div>
    </div>
  );
}

// 1. Basic Info
function BasicInfo({ data, updateData, nextStep }) {
  const workTypeGroups = ['현장직', '사무직'];
  const workTypeDetails = ['주간', '야간', '교대', '유연근무', '기타'];
  const genders = ['남성', '여성'];
  const ages = ['20대', '30대', '40대', '50대', '60대 이상'];

  return (
    <div className="content">
      <h1 className="step-title">기본정보</h1>
      
      <div className="question-block">
        <div className="question-label">성함</div>
        <input type="text" className="input-field" placeholder="홍길동" value={data.name} onChange={e => updateData('name', e.target.value)} />
      </div>

      <div className="question-block">
        <div className="question-label">1. 귀하의 근무형태를 선택해 주세요</div>
        <div className="chip-group">
          {workTypeGroups.map(w => (
            <div key={w} className={`chip ${data.workTypeGroup === w ? 'active' : ''}`} onClick={() => { updateData('workTypeGroup', w); updateData('workTypeDetail', ''); }}>
              {w}
            </div>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">직장 (지역명+직장명)</div>
        <input type="text" className="input-field" placeholder="예: 판교 네이버" value={data.company} onChange={e => updateData('company', e.target.value)} />
      </div>

      {data.workTypeGroup && (
        <div className="question-block">
          <div className="question-label">귀하의 근무형태를 선택해 주세요 (상세)</div>
          <div className="chip-group">
            {workTypeDetails.map(w => (
              <div key={w} className={`chip ${data.workTypeDetail === w ? 'active' : ''}`} onClick={() => updateData('workTypeDetail', w)}>
                {w}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="question-block">
        <div className="question-label">2. 귀하의 성별을 선택해 주세요</div>
        <div className="chip-group">
          {genders.map(g => (
            <div key={g} className={`chip ${data.gender === g ? 'active' : ''}`} onClick={() => updateData('gender', g)}>{g}</div>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">3. 귀하의 연령대를 선택해 주세요</div>
        <div className="chip-group">
          {ages.map(a => (
            <div key={a} className={`chip ${data.age === a ? 'active' : ''}`} onClick={() => updateData('age', a)}>{a}</div>
          ))}
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={nextStep}>다음 ❯</button>
      </div>
    </div>
  );
}

// 2. Health Check
function HealthCheck({ data, updateData, nextStep, prevStep }) {
  const jointAreas = ['목', '어깨', '팔꿈치', '손목', '손가락', '허리', '골반', '무릎', '발목', '없음'];
  const muscleAreas = ['목 주위', '어깨/승모근', '등', '허리', '엉덩이', '허벅지', '종아리', '없음'];

  const toggleArea = (field, area) => {
    let current = data[field];
    if (area === '없음') {
      updateData(field, ['없음']);
      return;
    }
    
    // '없음'이 있으면 제거
    current = current.filter(a => a !== '없음');
    
    if (current.includes(area)) {
      updateData(field, current.filter(a => a !== area));
    } else {
      updateData(field, [...current, area]);
    }
  };

  const hotspots = [
    // Joints (Front)
    { label: '목', field: 'jointPainAreas', value: '목', top: '17%', left: '31.5%' },
    { label: '어깨', field: 'jointPainAreas', value: '어깨', top: '23%', left: '38%' },
    { label: '팔꿈치', field: 'jointPainAreas', value: '팔꿈치', top: '40%', left: '40%' },
    { label: '손목', field: 'jointPainAreas', value: '손목', top: '53%', left: '44%' },
    { label: '손가락', field: 'jointPainAreas', value: '손가락', top: '58%', left: '45%' },
    { label: '골반', field: 'jointPainAreas', value: '골반', top: '51%', left: '36%' },
    { label: '무릎', field: 'jointPainAreas', value: '무릎', top: '74%', left: '34%' },
    { label: '발목', field: 'jointPainAreas', value: '발목', top: '92%', left: '34%' },

    // Muscles (Back)
    { label: '목 주위', field: 'musclePainAreas', value: '목 주위', top: '15%', left: '68.5%' },
    { label: '승모근', field: 'musclePainAreas', value: '어깨/승모근', top: '22%', left: '62%' },
    { label: '등', field: 'musclePainAreas', value: '등', top: '32%', left: '68.5%' },
    { label: '허리', field: 'musclePainAreas', value: '허리', top: '44%', left: '68.5%' },
    { label: '엉덩이', field: 'musclePainAreas', value: '엉덩이', top: '55%', left: '64%' },
    { label: '허벅지', field: 'musclePainAreas', value: '허벅지', top: '65%', left: '64%' },
    { label: '종아리', field: 'musclePainAreas', value: '종아리', top: '82%', left: '64%' },
  ];

  const isHotspotActive = (h) => {
    if (h.value === '허리') {
      return data.jointPainAreas.includes('허리') || data.musclePainAreas.includes('허리');
    }
    return data[h.field].includes(h.value);
  };

  return (
    <div className="content">
      <h1 className="step-title">건강 상태 체크</h1>
      
      {/* 인체 모형 시각 자료 - 양방향 동기화 핫스팟 */}
      <div className="human-body-container">
        <div className="image-wrapper">
          <img src={humanBodyImg} alt="인체 모형" />
          {hotspots.map((h, i) => (
            <div 
              key={i} 
              className={`hotspot ${isHotspotActive(h) ? 'active' : ''}`} 
              style={{ top: h.top, left: h.left }} 
              onClick={() => toggleArea(h.field, h.value)}
            >
              <span className="hotspot-text">{h.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">다음 관절 부위 중 3개월 이상 만성적인 통증이 있는 곳을 체크해주세요. (다중 선택 가능)</div>
        <div className="chip-group">
          {jointAreas.map(a => (
            <div key={a} className={`chip ${data.jointPainAreas.includes(a) ? 'active' : ''}`} onClick={() => toggleArea('jointPainAreas', a)}>{a}</div>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">다음 근육 부위 중 3개월 이상 만성적인 통증이 있는 곳을 체크해주세요. (다중 선택 가능)</div>
        <div className="chip-group">
          {muscleAreas.map(a => (
            <div key={a} className={`chip ${data.musclePainAreas.includes(a) ? 'active' : ''}`} onClick={() => toggleArea('musclePainAreas', a)}>{a}</div>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">과거 병력을 작성해 주세요. (선택사항)</div>
        <textarea 
          className="input-field" 
          placeholder="수술 이력, 만성 질환 등 자유롭게 기입해 주세요."
          value={data.medicalHistory}
          onChange={e => updateData('medicalHistory', e.target.value)}
        ></textarea>
      </div>

      <div className="btn-group">
        <button className="btn btn-secondary" onClick={prevStep}>❮ 이전</button>
        <button className="btn btn-primary" onClick={nextStep}>다음 ❯</button>
      </div>
    </div>
  );
}

// 3. Program Satisfaction
function ProgramSatisfaction({ data, updateData, nextStep, prevStep }) {
  const scores = [1, 2, 3, 4, 5];

  const renderScoreQuestion = (number, text, field) => (
    <div className="question-block">
      <div className="question-label">{number}. {text}</div>
      <div className="score-group">
        {scores.map(s => {
          const isActive = data[field] === s;
          // 1점(연함) ~ 5점(짙음) 에메랄드 스케일
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
      
      {renderScoreQuestion(1, "전체적으로 프로그램은 만족스럽고 유익했다.", "satisfaction4")}
      {renderScoreQuestion(2, "프로그램 시간은 내용을 습득하기에 적절했다.", "satisfaction5")}
      {renderScoreQuestion(3, "강사의 전문성은 만족스러웠다.", "satisfaction6")}
      {renderScoreQuestion(4, "다른 사람에게 본 프로그램을 참여를 권유하고 싶다.", "satisfaction7")}
      {renderScoreQuestion(5, "앞으로 이와 비슷한 프로그램이 있다면 또 참여하고 싶다.", "satisfaction8")}
      {renderScoreQuestion(6, "프로그램 받은 후 받기 전보다 좋아졌다.", "satisfaction9")}

      <div className="question-block" style={{ marginTop: '10px' }}>
        <div className="question-label">프로그램 내용 및 과정 중 가장 인상 깊거나 유익했던 점은 무엇입니까?</div>
        <textarea 
          className="input-field" 
          placeholder="자유롭게 작성해 주세요."
          value={data.impressivePoint}
          onChange={e => updateData('impressivePoint', e.target.value)}
        ></textarea>
      </div>

      <div className="question-block">
        <div className="question-label">프로그램 과정 중 보완해야 할 점이 있다면 무엇입니까?</div>
        <textarea 
          className="input-field" 
          placeholder="운영 체제 등을 변경해 주시기 바랍니다."
          value={data.feedback}
          onChange={e => updateData('feedback', e.target.value)}
        ></textarea>
      </div>

      <div className="question-block">
        <div className="question-label">추후 참여하고 싶은 프로그램은?</div>
        <textarea 
          className="input-field" 
          placeholder="원하시는 프로그램을 작성해 주세요."
          value={data.futureProgram}
          onChange={e => updateData('futureProgram', e.target.value)}
        ></textarea>
      </div>

      <div className="btn-group">
        <button className="btn btn-secondary" onClick={prevStep}>❮ 이전</button>
        <button className="btn btn-primary" onClick={nextStep}>제출하기 ❯</button>
      </div>
    </div>
  );
}

// 4. Finish
function FinishPage({ resetSurvey }) {
  return (
    <div className="content" style={{ textAlign: 'center', padding: '80px 24px', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      
      <div style={{
        width: '88px',
        height: '88px',
        backgroundColor: 'var(--primary-light)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 32px auto',
        boxShadow: '0 0 0 12px rgba(13, 148, 136, 0.04)'
      }}>
        <span style={{ fontSize: '3rem' }}>🎉</span>
      </div>

      <h1 style={{ 
        fontSize: '1.9rem', 
        fontWeight: '900', 
        color: 'var(--text-main)', 
        marginBottom: '16px',
        letterSpacing: '-0.03em' 
      }}>
        제출이 완료되었습니다!
      </h1>
      
      <p style={{ 
        color: 'var(--text-muted)', 
        fontSize: '1.1rem', 
        marginBottom: '48px',
        lineHeight: '1.6'
      }}>
        소중한 의견을 내어주셔서 감사합니다.<br/>
        더욱 건강한 환경을 만들어 가겠습니다.
      </p>
      
      <button 
        className="btn btn-hero" 
        onClick={resetSurvey}
        style={{ maxWidth: '240px', margin: '0 auto', padding: '18px' }}
      >
        <span>홈으로 돌아가기</span>
      </button>

    </div>
  );
}

export default App;
