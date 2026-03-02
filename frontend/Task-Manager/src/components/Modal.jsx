import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
	<div className="fixed inset-0 z-50 flex items-center justify-center">
	  {/* Backdrop */}
	  <div
		className="fixed inset-0"
		style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
		onClick={onClose}
		aria-hidden="true"
	  />

	  {/* Modal content */}
	  <div
		className="max-w-lg w-full mx-4 z-10 overflow-hidden rounded-2xl"
		style={{
		  background: 'var(--modal-bg)',
		  backdropFilter: 'blur(40px) saturate(2)',
		  WebkitBackdropFilter: 'blur(40px) saturate(2)',
		  border: '1px solid var(--border-str)',
		  boxShadow: 'var(--card-shadow)',
		  transition: 'background 0.3s ease',
		}}
	  >
		{/* Modal header */}
		<div
		  className="flex items-center justify-between px-5 py-4"
		  style={{ borderBottom: '1px solid var(--border)' }}
		>
		  <h3 className="text-base font-semibold" style={{ color: 'var(--text-1)' }}>{title}</h3>
		  <button
			type="button"
			className="p-1.5 rounded-lg transition-colors"
			style={{ color: 'var(--text-3)' }}
			onClick={onClose}
			aria-label="Close"
		  >
			<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
			  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6M7 1L1 7" />
			</svg>
		  </button>
		</div>

		{/* Modal body */}
		<div className="p-5">
		  {children}
		</div>
	  </div>
	</div>
  );
};

export default Modal;