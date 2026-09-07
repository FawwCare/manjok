import React from 'react';
import humanBodyImg from '../../assets/human_body.jpg';
import type { HotspotItem, StepProps } from '../../types/survey';

export const MuscleCheck: React.FC<StepProps> = ({ data, updateData, nextStep, prevStep }) => {
  const muscleAreas: string[] = ['목 주위', '어깨/승모근', '등', '허리', '엉덩이', '허벅지', '종아리', '없음'];

  const toggleArea = (field: 'musclePainAreas', area: string) => {
    let current = data[field];
    if (area === '없음') {
      updateData(field, ['없음']);
      return;
    }

    current = current.filter((a) => a !== '없음');

    if (current.includes(area)) {
      updateData(
        field,
        current.filter((a) => a !== area)
      );
    } else {
      updateData(field, [...current, area]);
    }
  };

  const hotspots: HotspotItem<'musclePainAreas'>[] = [
    // Muscles (Back)
    { label: '목 주위', field: 'musclePainAreas', value: '목 주위', top: '15%', left: '68.5%' },
    { label: '승모근', field: 'musclePainAreas', value: '어깨/승모근', top: '22%', left: '62%' },
    { label: '등', field: 'musclePainAreas', value: '등', top: '32%', left: '68.5%' },
    { label: '허리', field: 'musclePainAreas', value: '허리', top: '44%', left: '68.5%' },
    { label: '엉덩이', field: 'musclePainAreas', value: '엉덩이', top: '55%', left: '64%' },
    { label: '허벅지', field: 'musclePainAreas', value: '허벅지', top: '65%', left: '64%' },
    { label: '종아리', field: 'musclePainAreas', value: '종아리', top: '82%', left: '64%' },
  ];

  const isHotspotActive = (h: HotspotItem<'musclePainAreas'>) => {
    return data[h.field].includes(h.value);
  };

  return (
    <div className="content">
      <h1 className="step-title">근육 상태 체크</h1>

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
        <div className="question-label">
          다음 근육 부위 중 3개월 이상 만성적인 통증이 있는 곳을 체크해주세요. (다중 선택 가능)
        </div>
        <div className="chip-group">
          {muscleAreas.map((a) => (
            <button
              key={a}
              type="button"
              className={`chip ${data.musclePainAreas.includes(a) ? 'active' : ''}`}
              onClick={() => toggleArea('musclePainAreas', a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-label">과거 병력을 작성해 주세요. (선택사항)</div>
        <textarea
          className="input-field"
          placeholder="수술 이력, 만성 질환 등 자유롭게 기입해 주세요."
          value={data.medicalHistory}
          onChange={(e) => updateData('medicalHistory', e.target.value)}
        />
      </div>

      <div className="btn-group">
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

export default MuscleCheck;
