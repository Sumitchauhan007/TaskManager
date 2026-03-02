import React from 'react'

const TaskStatusTabs = ({
    tabs,
    activeTab,
    setActiveTab,
}) => {
  return (
    <div
      className="my-2 flex rounded-xl p-1"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className="relative px-3 md:px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
          style={activeTab === tab.label ? {
            background: 'rgba(82,0,255,0.22)',
            border: '1px solid rgba(82,0,255,0.45)',
            boxShadow: '0 2px 10px rgba(82,0,255,0.22)',
            color: 'var(--text-1)',
          } : { color: 'var(--text-3)' }}
          onClick={() => setActiveTab(tab.label)}
        >
          <div className="flex items-center gap-1.5">
            <span className='text-xs font-medium'>{tab.label}</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
              style={activeTab === tab.label
                ? { background: 'rgba(255,255,255,0.20)', color: 'var(--text-1)' }
                : { background: 'var(--surface-2)', color: 'var(--text-3)' }}
            >
              {tab.count}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs