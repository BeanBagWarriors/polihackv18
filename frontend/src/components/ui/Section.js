import React from 'react';

// Section Header component - reused across Welcome, HomePage
export const SectionHeader = ({ 
    label, 
    title, 
    className = "",
    labelClassName = "text-sm text-[rgb(121,134,203)] mb-4 tracking-[0.15em] uppercase font-semibold",
    titleClassName = "text-4xl md:text-5xl font-bold text-[rgb(92,107,192)]"
}) => (
    <div className={className}>
        {label && <p className={labelClassName}>{label}</p>}
        <h2 className={titleClassName}>{title}</h2>
    </div>
);

// Page Title for auth pages and forms
export const PageTitle = ({ 
    title, 
    subtitle,
    className = "text-center mb-10"
}) => (
    <div className={className}>
        <h2 className="text-5xl font-bold text-[rgb(92,107,192)] mb-4">{title}</h2>
        {subtitle && <p className="text-lg text-[rgb(121,134,203)] font-medium">{subtitle}</p>}
    </div>
);

// Feature Card - reused in Welcome page features section
export const FeatureCard = ({ 
    title, 
    description, 
    icon,
    className = "" 
}) => (
    <div className={`bg-white rounded-2xl p-8 border border-[rgb(197,202,233)] hover:shadow-brand transition-shadow ${className}`}>
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-xl font-semibold text-[rgb(92,107,192)] mb-3">{title}</h3>
        <p className="text-base text-[rgb(121,134,203)] leading-relaxed">{description}</p>
    </div>
);

// Step Card - reused in "How it works" sections
export const StepCard = ({ 
    number, 
    title, 
    description, 
    bgColor = "bg-[rgb(92,107,192)]" 
}) => (
    <div>
        <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-6`}>
            {number}
        </div>
        <h3 className="text-xl font-semibold text-[rgb(92,107,192)] mb-3">{title}</h3>
        <p className="text-base text-[rgb(121,134,203)] leading-relaxed">{description}</p>
    </div>
);

// Stat Item - for displaying statistics
export const StatItem = ({ 
    value, 
    label, 
    className = "" 
}) => (
    <div className={`bg-white rounded-2xl p-8 border border-[rgb(197,202,233)] hover:shadow-brand transition-shadow ${className}`}>
        <div className="text-4xl font-bold text-[rgb(92,107,192)] mb-2">{value}</div>
        <div className="text-sm text-[rgb(159,168,218)] font-medium">{label}</div>
    </div>
);

// Tag/Badge component
export const Tag = ({ 
    children, 
    className = "" 
}) => (
    <span className={`bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-5 py-2.5 rounded-lg text-sm font-medium ${className}`}>
        {children}
    </span>
);

// Status Badge - for instance statuses
export const StatusBadge = ({ 
    status 
}) => {
    const statusConfig = {
        'online': { bg: 'bg-green-100', text: 'text-green-700', label: 'Online' },
        'offline': { bg: 'bg-red-100', text: 'text-red-700', label: 'Offline' },
        'aws-failover': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Running on AWS' },
        'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' }
    };
    
    const config = statusConfig[status] || statusConfig['offline'];
    
    return (
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
};

// Status Indicator Dot
export const StatusDot = ({ 
    status, 
    size = "w-4 h-4" 
}) => {
    const colorMap = {
        'online': 'bg-green-500',
        'offline': 'bg-red-500',
        'aws-failover': 'bg-orange-500',
        'pending': 'bg-yellow-500'
    };
    
    return (
        <div className={`${size} rounded-full ${colorMap[status] || 'bg-gray-500'}`}></div>
    );
};

// Form Field wrapper
export const FormField = ({ 
    label, 
    children, 
    className = "" 
}) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-base font-semibold text-[rgb(92,107,192)] mb-1">{label}</label>
        {children}
    </div>
);

// Auth Form Input styling (reusable input class)
export const authInputClassName = "p-4 text-lg border-2 border-[rgb(159,168,218)] rounded-xl outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_4px_rgba(121,134,203,0.1)]";

// Auth Form Button styling
export const authButtonClassName = "p-4 text-lg font-semibold text-white rounded-xl cursor-pointer transition-all duration-300 mt-3 bg-[rgb(92,107,192)] hover:bg-[rgb(121,134,203)] hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(92,107,192,0.25)] hover:shadow-[0_8px_20px_rgba(92,107,192,0.35)]";

// CTA Section - for call-to-action blocks
export const CTASection = ({ 
    title, 
    subtitle, 
    buttonText, 
    buttonLink, 
    note,
    className = "" 
}) => (
    <section className={`px-6 py-28 ${className}`}>
        <div className="max-w-4xl mx-auto bg-[rgb(92,107,192)] rounded-3xl p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">{title}</h2>
            {subtitle && <p className="text-[rgb(197,202,233)] text-lg mb-10">{subtitle}</p>}
            <a 
                href={buttonLink}
                className="inline-block bg-white text-[rgb(92,107,192)] px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[rgb(232,234,246)] transition-all"
            >
                {buttonText}
            </a>
            {note && <p className="text-[rgb(179,186,227)] text-sm mt-6">{note}</p>}
        </div>
    </section>
);

// Footer component
export const Footer = () => (
    <footer className="px-6 py-12 border-t border-[rgb(197,202,233)]">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="text-lg font-semibold text-[rgb(92,107,192)]">
                Faylo
            </div>
            <div className="flex gap-8 text-sm text-[rgb(159,168,218)] font-medium">
                <a href="#" className="hover:text-[rgb(92,107,192)] transition-colors">Documentation</a>
                <a href="#" className="hover:text-[rgb(92,107,192)] transition-colors">Support</a>
                <a href="#" className="hover:text-[rgb(92,107,192)] transition-colors">Terms</a>
            </div>
            <p className="text-sm text-[rgb(179,186,227)]">
                © 2025 Faylo
            </p>
        </div>
    </footer>
);

// Info Card - for explanatory content
export const InfoCard = ({ 
    label, 
    title, 
    description, 
    tags = [],
    className = "" 
}) => (
    <div className={`bg-white rounded-2xl p-12 border border-[rgb(197,202,233)] shadow-brand ${className}`}>
        {label && <p className="text-sm text-[rgb(159,168,218)] mb-4 uppercase tracking-[0.15em] font-semibold">{label}</p>}
        <h2 className="text-3xl font-bold text-[rgb(92,107,192)] mb-4">{title}</h2>
        <p className="text-lg text-[rgb(121,134,203)] leading-relaxed mb-8">{description}</p>
        {tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </div>
        )}
    </div>
);

// Cloud Provider Badge
export const CloudProviderBadge = ({ 
    provider, 
    name 
}) => {
    const colors = {
        'aws': { bg: 'bg-[rgb(255,153,0)]', text: 'text-[rgb(255,153,0)]' },
        'gcp': { bg: 'bg-[rgb(66,133,244)]', text: 'text-[rgb(66,133,244)]' }
    };
    
    const config = colors[provider] || colors['aws'];
    
    return (
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${config.bg} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                <span className={`${config.text} font-bold text-sm`}>{provider.toUpperCase()}</span>
            </div>
            <span className="text-lg text-[rgb(92,107,192)] font-medium">{name}</span>
        </div>
    );
};
