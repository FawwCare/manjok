import React from 'react';

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

export default BasicInfo;
