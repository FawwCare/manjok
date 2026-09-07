import React from 'react';
import type { StepProps } from '../../types/survey';

export const BasicInfo: React.FC<StepProps> = ({ data, updateData, nextStep }) => {
  const workTypeGroups: Array<NonNullable<typeof data.workTypeGroup>> = ['현장직', '사무직'];
  const workTypeDetails = ['주간', '야간', '교대', '유연근무', '기타'];
  const genders: Array<NonNullable<typeof data.gender>> = ['남성', '여성'];
  const ages = ['20대', '30대', '40대', '50대', '60대 이상'];

  return (
    <div className="content">
      <h1 className="step-title">기본정보</h1>

      <div className="question-block">
        <div className="question-label">성함</div>
        <input
          type="text"
          className="input-field"
          placeholder="홍길동"
          value={data.name}
          onChange={(e) => updateData('name', e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-label">1. 귀하의 근무형태를 선택해 주세요</div>
        <div className="chip-group">
          {workTypeGroups.map((w) => (
            <button
              key={w}
              type="button"
              className={`chip ${data.workTypeGroup === w ? 'active' : ''}`}
              onClick={() => {
                updateData('workTypeGroup', w);
                updateData('workTypeDetail', '');
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">직장 (지역명+직장명)</div>
        <input
          type="text"
          className="input-field"
          placeholder="예: 판교 네이버"
          value={data.company}
          onChange={(e) => updateData('company', e.target.value)}
        />
      </div>

      {data.workTypeGroup && (
        <div className="question-block">
          <div className="question-label">귀하의 근무형태를 선택해 주세요 (상세)</div>
          <div className="chip-group">
            {workTypeDetails.map((w) => (
              <button
                key={w}
                type="button"
                className={`chip ${data.workTypeDetail === w ? 'active' : ''}`}
                onClick={() => updateData('workTypeDetail', w)}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="question-block">
        <div className="question-label">2. 귀하의 성별을 선택해 주세요</div>
        <div className="chip-group">
          {genders.map((g) => (
            <button
              key={g}
              type="button"
              className={`chip ${data.gender === g ? 'active' : ''}`}
              onClick={() => updateData('gender', g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">3. 귀하의 연령대를 선택해 주세요</div>
        <div className="chip-group">
          {ages.map((a) => (
            <button
              key={a}
              type="button"
              className={`chip ${data.age === a ? 'active' : ''}`}
              onClick={() => updateData('age', a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={nextStep} type="button">
          다음 ❯
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;
