import React from 'react'

const UserCard = ({userInfo}) => {
  return (
    <div className='user-card pt-2'>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {userInfo?.profileImageUrl ? (
                  <img
                    src={userInfo.profileImageUrl}
                    alt={`Avatar`}
                    className='w-12 h-12 rounded-2xl border border-white/20 object-cover' />
                ) : (
                  <div
                    className='w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg'
                    style={{ background: 'linear-gradient(135deg, #5200FF, #F900FF)' }}
                  >
                    {userInfo?.name?.[0]?.toUpperCase()}
                  </div>
                )}

                <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{userInfo?.name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>{userInfo?.email}</p>
                </div>
            </div>
        </div>

        <div className="flex items-end gap-2 mt-4">
            <StatCard
            label="Pending"
            count={userInfo?.pendingTasks || 0}
            status="Pending"
            />
            <StatCard
            label="In Progress"
            count={userInfo?.inProgressTasks || 0}
            status="In Progress"
            />
            <StatCard
            label="Completed"
            count={userInfo?.completedTasks || 0}
            status="Completed"
            />
        </div>
    </div>
  )
}

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'In Progress': return { background: 'rgba(204,255,0,0.10)', border: '1px solid rgba(204,255,0,0.22)', color: '#CCFF00' };
      case 'Completed': return { background: 'rgba(82,0,255,0.14)', border: '1px solid rgba(82,0,255,0.28)', color: '#a78bfa' };
      default: return { background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.24)', color: '#FF6B00' };
    }
  };

  return (
    <div
      className='flex-1 rounded-xl px-3 py-2 text-center'
      style={getStatusStyle()}
    >
      <span className='text-sm font-bold block'>{count}</span>
      <span className='text-[9px] font-medium opacity-70 uppercase tracking-wider'>{label}</span>
    </div>
  );
};