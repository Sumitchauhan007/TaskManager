import React from "react";
const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background 0.3s ease",
      }}
    >
      <div className={`w-2.5 h-8 ${color} rounded-full opacity-80`} />
      <div>
        <p className="text-lg font-bold leading-tight" style={{ color: 'var(--text-1)' }}>{value}</p>
        <p className="text-[11px] mt-0.5 font-medium tracking-wide" style={{ color: 'var(--text-3)' }}>{label}</p>
      </div>
    </div>
  );
};

export default InfoCard;