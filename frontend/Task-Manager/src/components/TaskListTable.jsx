import React from 'react'
import moment from 'moment'

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/15 text-green-300 border border-green-500/25';
      case 'Pending': return 'bg-violet-500/15 text-violet-300 border border-violet-500/25';
      case 'In Progress': return 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25';
      default: return 'bg-white/5 text-white/40 border border-white/10';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-rose-500/15 text-rose-300 border border-rose-500/25';
      case 'Medium': return 'bg-amber-500/15 text-amber-300 border border-amber-500/25';
      case 'Low': return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25';
      default: return 'bg-white/5 text-white/40 border border-white/10';
    }
  };

  return (
    <div className='overflow-x-auto rounded-xl mt-3'>
      <table className='min-w-full'>
        <thead>
          <tr
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <th className='py-3 px-4 text-white/35 font-semibold text-[11px] uppercase tracking-wider text-left'>Name</th>
            <th className='py-3 px-4 text-white/35 font-semibold text-[11px] uppercase tracking-wider text-left'>Status</th>
            <th className='py-3 px-4 text-white/35 font-semibold text-[11px] uppercase tracking-wider text-left'>Priority</th>
            <th className='py-3 px-4 text-white/35 font-semibold text-[11px] uppercase tracking-wider text-left hidden md:table-cell'>Created On</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr
              key={task.id}
              className='transition-colors hover:bg-white/[0.03]'
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <td className='py-3 px-4 text-white/70 text-[13px] line-clamp-1 max-w-[200px] truncate'>{task.title}</td>
              <td className='py-3 px-4'>
                <span className={`px-2.5 py-1 text-[11px] font-medium rounded-full inline-block ${getStatusBadgeColor(task.status)}`}>{task.status}</span>
              </td>
              <td className='py-3 px-4'>
                <span className={`px-2.5 py-1 text-[11px] font-medium rounded-full inline-block ${getPriorityBadgeColor(task.priority)}`}>{task.priority}</span>
              </td>
              <td className='py-3 px-4 text-white/40 text-[12px] whitespace-nowrap hidden md:table-cell'>{task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;