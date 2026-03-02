import React from 'react'

const CustomTooltip = ({active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'var(--drop-bg)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-str)',
          borderRadius: '10px',
          padding: '8px 14px',
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, color: '#5200FF', marginBottom: 4 }}>{payload[0].name}</p>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Count: <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>{payload[0].value}</span></p>
      </div>
    );
  };

  return null;
}

export default CustomTooltip