import React from 'react';
import Card from './Card';

const CloudCard = ({ provider, data = {} }) => {
    const providers = {
        aws: {
            name: 'Amazon Web Services',
            short: 'AWS',
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
        },
        gcp: {
            name: 'Google Cloud',
            short: 'GCP',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
        },
    };

    const p = providers[provider] || providers.aws;

    return (
        <Card>
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${p.bg} rounded-lg flex items-center justify-center`}>
                        <span className={`${p.color} font-bold text-xs`}>{p.short}</span>
                    </div>
                    <div>
                        <h3 className="font-medium text-[rgb(92,107,192)] text-sm">{p.name}</h3>
                        <p className="text-xs text-[rgb(159,168,218)]">{data.region || '-'}</p>
                    </div>
                </div>
                <span className="text-xs text-[rgb(159,168,218)] bg-[rgb(232,234,246)] px-2 py-1 rounded h-fit">
                    {data.status || '-'}
                </span>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-[rgb(159,168,218)]">Status</span>
                    <span className="text-[rgb(92,107,192)]">{data.status || '-'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[rgb(159,168,218)]">Last ping</span>
                    <span className="text-[rgb(92,107,192)]">{data.lastPing || '-'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[rgb(159,168,218)]">Response</span>
                    <span className="text-[rgb(92,107,192)]">{data.response || '-'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[rgb(159,168,218)]">Uptime</span>
                    <span className="text-[rgb(92,107,192)]">{data.uptime || '-'}</span>
                </div>
            </div>
        </Card>
    );
};

export default CloudCard;
