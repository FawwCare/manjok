export const preparePayload = (data) => {
  // 1. 객관식 밸류 (Enum / Integer) 및 2. 주관식 밸류 (Text / JSON Array) 분류
  const payload = {
    // 식별 정보
    name: data.name || '',
    
    // 기본 정보 (객관식 맵핑)
    workTypeGroup: data.workTypeGroup === '현장직' ? 'FIELD' : (data.workTypeGroup === '사무직' ? 'OFFICE' : null),
    workTypeDetail: data.workTypeDetail || null,
    company: data.company || '',
    gender: data.gender === '남성' ? 'M' : (data.gender === '여성' ? 'F' : null),
    ageGroup: data.age || null, // e.g., '20대'
    
    // 건강 상태 (배열 및 텍스트)
    jointPainAreas: data.jointPainAreas, // Array of strings
    musclePainAreas: data.musclePainAreas, // Array of strings
    medicalHistory: data.medicalHistory || '', // String

    // 만족도 점수 (Integer 1~5)
    satisfactionScores: {
      overall: data.satisfaction4,
      timeAppropriateness: data.satisfaction5,
      instructorExpertise: data.satisfaction6,
      recommendationIntent: data.satisfaction7,
      futureParticipationIntent: data.satisfaction8,
      improvementAfterProgram: data.satisfaction9,
    },

    // 피드백 (텍스트)
    feedback: {
      impressivePoint: data.impressivePoint || '',
      improvementPoint: data.feedback || '',
      futureProgramIdea: data.futureProgram || '',
    },
    
    submittedAt: new Date().toISOString()
  };

  return payload;
};

export const submitSurvey = async (data) => {
  const payload = preparePayload(data);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  
  console.log('전송될 데이터 페이로드:', payload);
  
  // 실제 API 연동 시 아래 주석을 해제하세요.
  /*
  const response = await fetch(`${API_BASE}/survey/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error('설문 제출에 실패했습니다.');
  }
  return await response.json();
  */
  
  // 현재는 시뮬레이션
  return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
};
