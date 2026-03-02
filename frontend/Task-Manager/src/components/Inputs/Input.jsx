import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <label style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-2)' }}>{label}</label>
            <div className='input-box'>
                <input
                    type={
                        type == 'password' ? (showPassword ? 'text' : 'password') : type
                    }
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none text-white/90 placeholder:text-white/30"
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={18}
                                className="text-blue-400 cursor-pointer flex-shrink-0"
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={18}
                                className="text-white/30 cursor-pointer flex-shrink-0"
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;