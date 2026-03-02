import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const CustomBarChart = ({ data }) => {

  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case 'Low': return '#CCFF00';
      case 'Medium': return '#FF6B00';
      case 'High': return '#F900FF';
      default: return '#5200FF';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'rgba(5,0,6,0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(82,0,255,0.32)',
            borderRadius: '10px',
            padding: '8px 14px',
          }}
        >
          <p className='text-[11px] font-semibold text-[#F900FF] mb-1'>{payload[0].payload.priority}</p>
          <p className='text-sm text-white/60'>Count: <span className='font-bold text-white'>{payload[0].payload.count}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='mt-4'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(82,0,255,0.15)" vertical={false} />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.50)', fontWeight: 500 }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.50)' }}
            stroke="none"
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(82,0,255,0.08)' }} />

          <Bar dataKey="count" nameKey="priority" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;