import React from 'react';
import humanBodyImg from '../../assets/human_body.jpg';

function JointCheck({ data, updateData, nextStep, prevStep }) {
  const jointAreas = ['목', '어깨', '팔꿈치', '손목', '손가락', '허리', '골반', '무릎', '발목', '없음'];

  const toggleArea = (field, area) => {
    let current = data[field];
    if (area === '없음') {
      updateData(field, ['없음']);
      return;
    }
    
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
    { label: '허리', field: 'jointPainAreas', value: '허리', top: '44%', left: '68.5%' }, // 허리는 뒤쪽 모형에 표시됨
    { label: '골반', field: 'jointPainAreas', value: '골반', top: '51%', left: '36%' },
    { label: '무릎', field: 'jointPainAreas', value: '무릎', top: '74%', left: '34%' },
    { label: '발목', field: 'jointPainAreas', value: '발목', top: '92%', left: '34%' },
  ];

  const isHotspotActive = (h) => {
    return data[h.field].includes(h.value);
  };

  return (
    <div className="content">
      <h1 className="step-title">관절 상태 체크</h1>
      
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

      <div className="btn-group">
        <button className="btn btn-secondary" onClick={prevStep}>❮ 이전</button>
        <button className="btn btn-primary" onClick={nextStep}>다음 ❯</button>
      </div>
    </div>
  );
}

export default JointCheck;
