import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div>InfoCard
      <div className={`p-4 rounded-lg shadow-md flex items-center gap-4 ${color}`}>
        <div className='text-3xl text-white'>
          {icon}
        </div>
        <div>
          <p className='text-sm text-white'>{label}</p>
          <h3 className='text-xl md:text-2xl font-semibold text-white mt-1.5'>{value}</h3>

          asdfghjkl;
        </div>
      </div>
    </div>
  )
}

export default InfoCard