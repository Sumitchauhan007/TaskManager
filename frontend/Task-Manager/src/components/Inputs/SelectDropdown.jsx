import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';

/**
 * Lightweight dropdown/select component.
 * Props:
 * - options: [{ value, label }]
 * - value: currently selected value (string/number)
 * - onChange: (value) => void
 * - placeholder: string shown when no selection
 * - disabled: disable interaction
 * - className: extra wrapper classes
 */
const SelectDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue) => {
    if (onChange) onChange(optionValue);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        className={`w-full text-sm text-black outline-none bg-white border border-slate-200 px-2.5 py-2 rounded-md mt-2 flex justify-between items-center transition focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <LuChevronDown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <ul
          className="absolute w-full max-h-56 overflow-auto bg-white border border-slate-200 rounded-md shadow-lg z-20 mt-1"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 ${
                option.value === value ? 'bg-indigo-100 font-medium' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
          {options.length === 0 && (
            <li className="px-3 py-2 text-sm text-slate-500" aria-disabled>
              No options
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;