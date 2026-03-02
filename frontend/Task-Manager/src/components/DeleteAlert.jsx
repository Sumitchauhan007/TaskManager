import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className="text-sm text-white/70">{content}</p>

        <div className="flex justify-end mt-6">
            <button
            type='button'
            className='flex items-center justify-center gap-1.5 text-xs md:text-sm font-semibold text-rose-300 whitespace-nowrap bg-rose-500/15 border border-rose-500/30 rounded-xl px-5 py-2 cursor-pointer hover:bg-rose-500/25 transition-all'
            onClick={onDelete}
            >
             Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert