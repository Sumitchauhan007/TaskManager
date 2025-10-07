import React from "react";

/**
 * InfoCard
 * Simple, reusable stat card for dashboard metrics.
 *
 * Props
 * - icon: ReactNode (required) — icon element to display
 * - label: string (required) — small label text
 * - value: string | number (required) — main metric value
 * - color?: string — Tailwind classes for background (e.g., "bg-primary")
 * - isLoading?: boolean — show skeleton while loading
 * - onClick?: () => void — optional click handler
 */
const InfoCard = ({ icon, label, value, color = "bg-blue-600", isLoading = false, onClick }) => {
  const Container = onClick ? "button" : "div";

  if (isLoading) {
    return (
      <div className="p-4 md:p-5 rounded-xl shadow-sm border border-black/5 bg-white">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-32 bg-gray-200 rounded mt-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`p-4 md:p-5 rounded-xl shadow-sm border border-black/5 ${color} text-white w-full text-left`}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl flex items-center justify-center">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs md:text-sm/5 opacity-90 truncate">{label}</p>
          <h3 className="text-xl md:text-2xl font-semibold mt-1.5 break-words">{value}</h3>
        </div>
      </div>
    </Container>
  );
};

export default InfoCard;