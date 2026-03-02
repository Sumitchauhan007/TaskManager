import React from "react";

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            {/* Ambient blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(82,0,255,0.28)" }} />
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(82,0,255,0.14)" }} />

            {/* Glass card */}
            <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 glass-strong rounded-3xl overflow-hidden shadow-2xl">
                {/* Form side */}
                <div className="flex flex-col px-10 py-12">
                    <div className="flex items-center gap-2 mb-10">
                        <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-xl object-cover" style={{ boxShadow: "0 4px 14px rgba(82,0,255,0.50)" }} />
                        <h2 className="text-base font-semibold tracking-wide" style={{ color: "var(--text-1)" }}>Task Manager</h2>
                    </div>
                    {children}
                </div>

                {/* Image side */}
                <div className="hidden md:block relative overflow-hidden" style={{ borderLeft: "1px solid var(--border)" }}>
                    <img src="/ChatGPT Image Mar 2, 2026, 10_40_56 AM.png" className="absolute inset-0 w-full h-full object-cover" alt="Task Manager" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
