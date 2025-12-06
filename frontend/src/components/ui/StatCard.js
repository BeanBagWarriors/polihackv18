import React from 'react';
import Card from './Card';

const StatCard = ({ label, value, className = '' }) => {
    return (
        <Card className={`p-4 ${className}`}>
            <p className="text-xs text-[rgb(159,168,218)] mb-1">{label}</p>
            <p className="text-xl font-semibold text-[rgb(92,107,192)]">{value}</p>
        </Card>
    );
};

export default StatCard;
