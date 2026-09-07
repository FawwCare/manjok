import React from 'react';

export interface FinishPageProps {
  resetSurvey: () => void;
}

export const FinishPage: React.FC<FinishPageProps> = ({ resetSurvey }) => {
  return (
    <div
      className="content"
      style={{
        textAlign: 'center',
        padding: '80px 24px',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      <div
        style={{
          width: '88px',
          height: '88px',
          backgroundColor: 'var(--primary-light)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px auto',
          boxShadow: '0 0 0 12px rgba(13, 148, 136, 0.04)',
        }}
      >
        <span style={{ fontSize: '3rem' }}>🎉</span>
      </div>

      <h1
        style={{
          fontSize: '1.9rem',
          fontWeight: '900',
          color: 'var(--text-main)',
          marginBottom: '16px',
          letterSpacing: '-0.03em',
        }}
      >
        제출이 완료되었습니다!
      </h1>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '1.1rem',
          marginBottom: '48px',
          lineHeight: '1.6',
        }}
      >
        소중한 의견을 내어주셔서 감사합니다.
        <br />
        더욱 건강한 환경을 만들어 가겠습니다.
      </p>

      <button
        className="btn btn-hero"
        onClick={resetSurvey}
        style={{ maxWidth: '240px', margin: '0 auto', padding: '18px' }}
        type="button"
      >
        <span>홈으로 돌아가기</span>
      </button>
    </div>
  );
};

export default FinishPage;
