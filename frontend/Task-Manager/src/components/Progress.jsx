import React from "react";

const Progress = ({ progress, status }) => {
    const getColor = () => {
        switch (status) {
            case 'In Progress':
                return { background: 'linear-gradient(90deg, #5200FF, #7b33ff)', boxShadow: '0 0 8px rgba(82,0,255,0.50)' };
            case 'Completed':
                return { background: 'linear-gradient(90deg, #88cc00, #CCFF00)', boxShadow: '0 0 8px rgba(204,255,0,0.40)' };
            default:
                return { background: 'linear-gradient(90deg, #cc5500, #FF6B00)', boxShadow: '0 0 8px rgba(255,107,0,0.45)' };
        }
    }

    return (
        <div className='w-full rounded-full h-1.5' style={{ background: 'rgba(255,255,255,0.10)' }}>
            <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, ...getColor() }}
            />
        </div>
    )
};

export default Progress;