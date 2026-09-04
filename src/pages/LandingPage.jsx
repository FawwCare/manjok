import React from 'react';

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

export default LandingPage;
