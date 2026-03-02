import React from 'react'

function CustomLegend({ payload }) {
  return (
    <div className='flex flex-wrap justify-center gap-4 mt-4'>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}80` }}
          />
          <span className="text-[11px] font-medium" style={{ color: 'var(--text-2)' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend