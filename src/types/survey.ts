/**
 * 설문 문항 유형 정의
 */
export type QuestionType = 'TEXT' | 'RADIO' | 'CHECKBOX' | 'RATING_5';

/**
 * 설문 질문 데이터 모델
 */
export interface Question {
  id: string;
  text: string;
  description?: string;
  questionType: QuestionType;
  options: string[] | null;
  required: boolean;
  placeholder?: string;
}

/**
 * 개별 문항에 대한 응답 데이터 모델
 */
export interface Answer {
  questionId: string;
  value: string | string[] | number | null;
  questionType: QuestionType;
}

/**
 * 설문 제출 전체 응답 데이터 모델 (Firestore 저장 및 집계용)
 */
export interface SurveyResponse {
  timestamp: Date;
  userName: string;
  answers: Answer[];
}

/**
 * 설문 폼 전체 입력 상태 모델 (UI State)
 */
export interface SurveyFormData {
  // 기본 식별 및 인적사항
  name: string;
  workTypeGroup: '현장직' | '사무직' | '';
  workTypeDetail: string;
  company: string;
  gender: '남성' | '여성' | '';
  age: string;

  // 만족도 점수 (1~5 정수) - 시맨틱 네이밍
  satisfactionTotal: number;       // 1. 프로그램 전체 만족도 및 유익성
  satisfactionTime: number;        // 2. 프로그램 진행 시간 적절성
  satisfactionTeacher: number;     // 3. 강사 전문성
  satisfactionRecommend: number;   // 4. 타인 추천 의향
  satisfactionRetention: number;   // 5. 향후 유사 프로그램 재참여 의향
  satisfactionImprove: number;     // 6. 참여 전후 건강/상태 개선 체감

  // 피드백 및 의견
  impressivePoint: string;
  feedback: string;
  futureProgram: string;

  // 신체 통증 부위 및 병력
  jointPainAreas: string[];
  musclePainAreas: string[];
  medicalHistory: string;
}

/**
 * 폼 상태 업데이트 함수 타입
 */
export type UpdateSurveyData = <K extends keyof SurveyFormData>(
  field: K,
  value: SurveyFormData[K]
) => void;

/**
 * 설문 각 스텝 컴포넌트 공통 Props
 */
export interface StepProps {
  data: SurveyFormData;
  updateData: UpdateSurveyData;
  nextStep: () => void;
  prevStep?: () => void;
}

/**
 * 신체 모형 핫스팟 정의
 */
export interface HotspotItem<
  T extends 'jointPainAreas' | 'musclePainAreas' = 'jointPainAreas' | 'musclePainAreas'
> {
  label: string;
  field: T;
  value: string;
  top: string;
  left: string;
}
