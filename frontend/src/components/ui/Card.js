import React from 'react';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
    const variants = {
        default: 'bg-white rounded-xl p-5 border border-[rgb(197,202,233)] shadow-md hover:shadow-brand-lg transition-all duration-300 hover:border-[rgb(159,168,218)]',
        dashed: 'bg-white rounded-xl p-8 border-2 border-dashed border-[rgb(179,186,227)] hover:border-[rgb(121,134,203)] hover:bg-[rgb(248,248,250)] transition-all duration-300',
        danger: 'bg-white rounded-xl p-5 border border-red-200 shadow-md hover:shadow-lg hover:border-red-300 transition-all duration-300',
        dark: 'bg-[rgb(30,30,30)] rounded-xl p-5 border border-[rgb(55,55,55)] shadow-brand-lg text-white',
    };

    return (
        <div className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
