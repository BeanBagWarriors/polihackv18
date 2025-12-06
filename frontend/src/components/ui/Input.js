import React from 'react';

const Input = ({ label, className = '', variant = 'default', ...props }) => {
    const variants = {
        default: 'p-2.5 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_3px_rgba(121,134,203,0.1)] transition-all',
        auth: 'p-3.5 text-base border-2 border-[rgb(159,168,218)] rounded-lg outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_3px_rgba(121,134,203,0.1)]',
        mono: 'p-2.5 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none font-mono focus:border-[rgb(121,134,203)]',
    };

    if (label) {
        return (
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[rgb(92,107,192)] mb-1">{label}</label>
                <input className={`${variants[variant]} ${className}`} {...props} />
            </div>
        );
    }

    return <input className={`${variants[variant]} ${className}`} {...props} />;
};

export default Input;
