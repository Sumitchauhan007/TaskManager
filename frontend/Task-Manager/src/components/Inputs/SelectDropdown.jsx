import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';


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
        className={`w-full text-sm outline-none px-3 py-2 rounded-xl mt-2 flex justify-between items-center transition disabled:opacity-50 disabled:cursor-not-allowed`}
        style={{
          color: 'var(--text-1)',
          background: 'var(--input-bg)',
          border: '1px solid var(--input-border)',
          transition: 'background 0.3s ease',
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <LuChevronDown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <ul
          className="absolute w-full max-h-56 overflow-auto rounded-xl shadow-2xl z-20 mt-1"
          style={{
            background: 'var(--drop-bg)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--border-str)',
          }}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2.5 text-sm cursor-pointer transition-colors"
              style={option.value === value
                ? { background: 'rgba(82,0,255,0.22)', color: 'var(--text-1)', fontWeight: 600 }
                : { background: 'transparent', color: 'var(--text-2)' }}
            >
              {option.label}
            </li>
          ))}
          {options.length === 0 && (
            <li className="px-3 py-2 text-sm text-white/35" aria-disabled>
              No options
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;