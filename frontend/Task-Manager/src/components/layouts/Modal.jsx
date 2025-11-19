import React, { useEffect, useRef } from 'react';
import SelectDropdown from '../Inputs/SelectDropdown.jsx';

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	footer,
	size = 'md',
	closeOnBackdrop = true,
}) => {
	const dialogRef = useRef(null);

	// Focus first focusable when open
	useEffect(() => {
		if (isOpen && dialogRef.current) {
			const focusable = dialogRef.current.querySelector(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusable) focusable.focus();
		}
	}, [isOpen]);

	// ESC to close
	useEffect(() => {
		if (!isOpen) return;
		const handleKey = (e) => {
			if (e.key === 'Escape') {
				onClose?.();
			}
		};
		document.addEventListener('keydown', handleKey);
		return () => document.removeEventListener('keydown', handleKey);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const widthClass = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-2xl',
	}[size] || 'max-w-md';

	return (
		<div
			className="fixed inset-0 z-40 flex items-center justify-center px-4 py-6"
			aria-modal="true"
			role="dialog"
		>
			<div
				className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
				onClick={() => closeOnBackdrop && onClose?.()}
			/>
			<div
				ref={dialogRef}
				className={`relative w-full ${widthClass} mx-auto bg-white rounded-lg shadow-xl border border-slate-200 animate-fadeIn`}
			>
				{title && (
					<div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
						<h2 className="text-lg font-semibold text-slate-800">{title}</h2>
						<button
							onClick={onClose}
							className="text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded"
							aria-label="Close modal"
						>
							✕
						</button>
					</div>
				)}
				<div className="px-5 py-4">{children}</div>
				{footer && <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">{footer}</div>}
			</div>
		</div>
	);
};

/**
 * SelectionModal: wraps Modal with a SelectDropdown for choosing an option.
 * Props:
 * - isOpen, onClose: control visibility
 * - title: header text
 * - options: array of { value, label }
 * - value: currently selected value
 * - onChange: callback when selection changes
 * - onConfirm: callback when user confirms
 * - confirmLabel: button label, default 'Confirm'
 * - loading: show spinner on confirm button
 * - size: pass-through to Modal
 */
export const SelectionModal = ({
	isOpen,
	onClose,
	title = 'Select an option',
	options = [],
	value,
	onChange,
	onConfirm,
	confirmLabel = 'Confirm',
	loading = false,
	size = 'sm',
}) => {
	const canConfirm = value !== undefined && value !== null && value !== '';

	const footer = (
		<div className="flex justify-end gap-3">
			<button
				type="button"
				onClick={onClose}
				className="px-4 py-2 text-sm font-medium rounded border border-slate-300 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
			>
				Cancel
			</button>
			<button
				type="button"
				disabled={!canConfirm || loading}
				onClick={() => canConfirm && onConfirm?.(value)}
				className="px-4 py-2 text-sm font-medium rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-300 flex items-center"
			>
				{loading && (
					<span className="mr-2 inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
				)}
				{confirmLabel}
			</button>
		</div>
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer} size={size}>
			<SelectDropdown
				options={options}
				value={value}
				onChange={onChange}
				placeholder="Choose..."
			/>
		</Modal>
	);
};

export default Modal;

