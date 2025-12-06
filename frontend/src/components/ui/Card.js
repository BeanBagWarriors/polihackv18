import React from 'react';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
    const variants = {
        default: 'bg-white rounded-xl p-5 border border-[rgb(197,202,233)]',
        dashed: 'bg-white rounded-xl p-8 border-2 border-dashed border-[rgb(179,186,227)]',
        danger: 'bg-white rounded-xl p-5 border border-red-200',
        dark: 'bg-[rgb(30,30,30)] rounded-xl p-5',
    };

    return (
        <div className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
