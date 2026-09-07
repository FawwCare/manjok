import type { Answer, SurveyFormData, SurveyResponse } from '../types/survey';

/**
 * 폼 입력 데이터를 Firestore / 대시보드 저장용 SurveyResponse 규격으로 변환
 */
export const formDataToSurveyResponse = (data: SurveyFormData): SurveyResponse => {
  const answers: Answer[] = [
    { questionId: 'name', value: data.name || null, questionType: 'TEXT' },
    { questionId: 'workTypeGroup', value: data.workTypeGroup || null, questionType: 'RADIO' },
    { questionId: 'workTypeDetail', value: data.workTypeDetail || null, questionType: 'RADIO' },
    { questionId: 'company', value: data.company || null, questionType: 'TEXT' },
    { questionId: 'gender', value: data.gender || null, questionType: 'RADIO' },
    { questionId: 'age', value: data.age || null, questionType: 'RADIO' },
    { questionId: 'jointPainAreas', value: data.jointPainAreas, questionType: 'CHECKBOX' },
    { questionId: 'musclePainAreas', value: data.musclePainAreas, questionType: 'CHECKBOX' },
    { questionId: 'medicalHistory', value: data.medicalHistory || null, questionType: 'TEXT' },
    { questionId: 'satisfactionTotal', value: data.satisfactionTotal || null, questionType: 'RATING_5' },
    { questionId: 'satisfactionTime', value: data.satisfactionTime || null, questionType: 'RATING_5' },
    { questionId: 'satisfactionTeacher', value: data.satisfactionTeacher || null, questionType: 'RATING_5' },
    { questionId: 'satisfactionRecommend', value: data.satisfactionRecommend || null, questionType: 'RATING_5' },
    { questionId: 'satisfactionRetention', value: data.satisfactionRetention || null, questionType: 'RATING_5' },
    { questionId: 'satisfactionImprove', value: data.satisfactionImprove || null, questionType: 'RATING_5' },
    { questionId: 'impressivePoint', value: data.impressivePoint || null, questionType: 'TEXT' },
    { questionId: 'feedback', value: data.feedback || null, questionType: 'TEXT' },
    { questionId: 'futureProgram', value: data.futureProgram || null, questionType: 'TEXT' },
  ];

  return {
    timestamp: new Date(),
    userName: data.name,
    answers,
  };
};

/**
 * 기존 백엔드 REST API 호환 페이로드 생성
 */
export const preparePayload = (data: SurveyFormData) => {
  return {
    // 식별 정보
    name: data.name || '',

    // 기본 정보 (객관식 맵핑)
    workTypeGroup: data.workTypeGroup === '현장직' ? 'FIELD' : data.workTypeGroup === '사무직' ? 'OFFICE' : null,
    workTypeDetail: data.workTypeDetail || null,
    company: data.company || '',
    gender: data.gender === '남성' ? 'M' : data.gender === '여성' ? 'F' : null,
    ageGroup: data.age || null,

    // 건강 상태
    jointPainAreas: data.jointPainAreas,
    musclePainAreas: data.musclePainAreas,
    medicalHistory: data.medicalHistory || '',

    // 만족도 점수 (시맨틱 필드 매핑)
    satisfactionScores: {
      overall: data.satisfactionTotal,
      timeAppropriateness: data.satisfactionTime,
      instructorExpertise: data.satisfactionTeacher,
      recommendationIntent: data.satisfactionRecommend,
      futureParticipationIntent: data.satisfactionRetention,
      improvementAfterProgram: data.satisfactionImprove,
    },

    // 피드백
    feedback: {
      impressivePoint: data.impressivePoint || '',
      improvementPoint: data.feedback || '',
      futureProgramIdea: data.futureProgram || '',
    },

    submittedAt: new Date().toISOString(),
  };
};

export interface SubmitSurveyResult {
  success: boolean;
  message?: string;
}

export const submitSurvey = async (data: SurveyFormData): Promise<SubmitSurveyResult> => {
  const payload = preparePayload(data);
  const surveyResponse = formDataToSurveyResponse(data);

  console.log('전송될 REST 페이로드:', payload);
  console.log('생성된 SurveyResponse 모델:', surveyResponse);

  // 현재는 시뮬레이션 (API 연동 준비 완료)
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
};
