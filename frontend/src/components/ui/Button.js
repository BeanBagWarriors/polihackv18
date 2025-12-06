import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const base = 'px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer transition-all duration-200 active:scale-95 hover:shadow-brand';
    
    const variants = {
        primary: 'bg-[rgb(92,107,192)] text-white hover:bg-[rgb(121,134,203)] focus:outline-none focus:ring-2 focus:ring-[rgb(159,168,218)] focus:ring-offset-2',
        secondary: 'bg-[rgb(232,234,246)] text-[rgb(92,107,192)] hover:bg-[rgb(197,202,233)] focus:outline-none focus:ring-2 focus:ring-[rgb(159,168,218)] focus:ring-offset-2',
        outline: 'bg-transparent border-2 border-[rgb(179,186,227)] text-[rgb(92,107,192)] hover:bg-white hover:border-[rgb(121,134,203)] focus:outline-none focus:ring-2 focus:ring-[rgb(159,168,218)] focus:ring-offset-2',
        ghost: 'bg-transparent text-[rgb(121,134,203)] hover:text-[rgb(92,107,192)] hover:bg-[rgb(232,234,246)] focus:outline-none focus:ring-2 focus:ring-[rgb(159,168,218)] focus:ring-offset-2',
        danger: 'bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2',
        tab: 'bg-transparent text-[rgb(92,107,192)] hover:shadow-none',
        tabActive: 'bg-[rgb(92,107,192)] text-white shadow-brand',
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
