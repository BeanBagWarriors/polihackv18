import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const base = 'px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer transition-all';
    
    const variants = {
        primary: 'bg-[rgb(92,107,192)] text-white hover:bg-[rgb(121,134,203)]',
        secondary: 'bg-[rgb(232,234,246)] text-[rgb(92,107,192)] hover:bg-[rgb(197,202,233)]',
        outline: 'bg-transparent border border-[rgb(179,186,227)] text-[rgb(92,107,192)] hover:bg-white',
        ghost: 'bg-transparent text-[rgb(121,134,203)] hover:text-[rgb(92,107,192)]',
        danger: 'bg-red-100 text-red-600 hover:bg-red-200',
        tab: 'bg-transparent text-[rgb(92,107,192)]',
        tabActive: 'bg-[rgb(92,107,192)] text-white',
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
