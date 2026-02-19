import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
	<div className="fixed inset-0 z-50 flex items-center justify-center">
	  {/* Backdrop */}
	  <div
		className="fixed inset-0 bg-black bg-opacity-50"
		onClick={onClose}
		aria-hidden="true"
	  />

	  {/* Modal content */}
	  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 z-10 overflow-hidden">
		{/* Modal header */}
		<div className="flex items-center justify-between px-4 py-3 border-b">
		  <h3 className="text-lg font-medium">{title}</h3>
		  <button
			type="button"
			className="p-2 rounded hover:bg-gray-100"
			onClick={onClose}
			aria-label="Close"
		  >
			<svg
			  className="w-4 h-4"
			  aria-hidden="true"
			  xmlns="http://www.w3.org/2000/svg"
			  fill="none"
			  viewBox="0 0 14 14"
			>
			  <path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M1 1l6 6M7 1L1 7"
			  />
			</svg>
		  </button>
		</div>

		{/* Modal body */}
		<div className="p-4">
		  {children}
		</div>
	  </div>
	</div>
  );
};

export default Modal;