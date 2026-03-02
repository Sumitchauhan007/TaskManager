import React from 'react'

const AvatarGroup = ({avatars,maxVisible = 3}) => {
  return (
    <div className='flex items-center'>
        {avatars.slice(0,maxVisible).map((avatar, index) => (
            <img 
            key={index}
            src={avatar}
             alt={`Avatar ${index}`}
             className='w-9 h-9 rounded-xl border-2 -ml-3 first:ml-0 object-cover'
             style={{ borderColor: 'rgba(255,255,255,0.2)' }}
             />
        ))}
        {avatars.length > maxVisible && (
            <div
              className='w-9 h-9 flex items-center justify-center text-xs font-bold text-white rounded-xl -ml-3'
              style={{
                background: 'rgba(0,122,255,0.3)',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
                +{avatars.length - maxVisible}
            </div> 
        )}
    </div>
  )
}

export default AvatarGroup