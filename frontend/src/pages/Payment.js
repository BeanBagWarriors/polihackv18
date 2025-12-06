import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckIcon, ShieldIcon, ArrowRightIcon, Footer } from '../components/ui';
import usePageBackground from '../hooks/usePageBackground';

// Reusable input style
const inputClass = "p-4 text-lg border-2 border-[rgb(159,168,218)] rounded-xl outline-none transition-all bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_4px_rgba(121,134,203,0.1)]";

const Payment = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        instances: '',
        dataUsage: '',
        uptime: '',
        support: '',
        additionalNotes: ''
    });

    usePageBackground();

    const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const baseFeatures = [
        'Multi-cloud failover (AWS + GCP)',
        'Real-time health monitoring',
        'Automatic traffic switching',
        'Dashboard & analytics',
        'Email support included'
    ];

    const handleSubmit = () => {
        if (!formData.companyName || !formData.instances || !formData.dataUsage) {
            alert('Please fill in required fields');
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => navigate('/home'), 1500);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar variant="auth" />
            
            <div className="flex-1 px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <ShieldIcon className="w-4 h-4" />
                            Account Created Successfully
                        </div>
                        <h1 className="text-5xl font-bold text-[rgb(92,107,192)] mb-4">
                            Build Your Custom Plan
                        </h1>
                        <p className="text-xl text-[rgb(121,134,203)] max-w-2xl mx-auto">
                            Tell us what you need and we'll create a personalized quote. Plans start at <span className="font-bold text-[rgb(92,107,192)]">$2,000/year</span>.
                        </p>
                    </div>

                    {/* Base features */}
                    <div className="bg-[rgb(248,249,252)] rounded-2xl p-6 mb-10 border border-[rgb(197,202,233)]">
                        <h3 className="text-lg font-semibold text-[rgb(92,107,192)] mb-4">All plans include:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {baseFeatures.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 text-green-500" />
                                    <span className="text-sm text-[rgb(121,134,203)]">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements Form */}
                    <div className="bg-white rounded-2xl p-8 border border-[rgb(197,202,233)] shadow-brand mb-10">
                        <h3 className="text-2xl font-bold text-[rgb(92,107,192)] mb-6">Your Requirements</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-semibold text-[rgb(92,107,192)]">Company Name *</label>
                                <input
                                    type="text"
                                    placeholder="Your company name"
                                    value={formData.companyName}
                                    onChange={(e) => updateForm('companyName', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-semibold text-[rgb(92,107,192)]">Industry</label>
                                <select
                                    value={formData.industry}
                                    onChange={(e) => updateForm('industry', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select industry</option>
                                    <option value="retail">Retail / E-commerce</option>
                                    <option value="saas">SaaS / Software</option>
                                    <option value="finance">Finance / Banking</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="media">Media / Entertainment</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-semibold text-[rgb(92,107,192)]">Container Instances *</label>
                                <select
                                    value={formData.instances}
                                    onChange={(e) => updateForm('instances', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">How many instances?</option>
                                    <option value="1-5">1-5 instances</option>
                                    <option value="6-15">6-15 instances</option>
                                    <option value="16-50">16-50 instances</option>
                                    <option value="50+">50+ instances</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-semibold text-[rgb(92,107,192)]">Monthly Data Transfer *</label>
                                <select
                                    value={formData.dataUsage}
                                    onChange={(e) => updateForm('dataUsage', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Estimated data usage</option>
                                    <option value="0-100">Less than 100GB</option>
                                    <option value="100-500">100GB - 500GB</option>
                                    <option value="500-1000">500GB - 1TB</option>
                                    <option value="1000+">More than 1TB</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-semibold text-[rgb(92,107,192)]">Uptime SLA</label>
                                <select
                                    value={formData.uptime}
                                    onChange={(e) => updateForm('uptime', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select uptime requirement</option>
                                    <option value="99.9">99.9% (Standard)</option>
                                    <option value="99.95">99.95% (Business)</option>
                                    <option value="99.99">99.99% (Enterprise)</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-semibold text-[rgb(92,107,192)]">Support Level</label>
                                <select
                                    value={formData.support}
                                    onChange={(e) => updateForm('support', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select support level</option>
                                    <option value="email">Email (48h response)</option>
                                    <option value="priority">Priority (24h response)</option>
                                    <option value="dedicated">Dedicated engineer</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-base font-semibold text-[rgb(92,107,192)]">Additional Requirements</label>
                            <textarea
                                placeholder="Any specific needs? (compliance, integrations, etc.)"
                                value={formData.additionalNotes}
                                onChange={(e) => updateForm('additionalNotes', e.target.value)}
                                className={`${inputClass} min-h-[100px] resize-none`}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`flex items-center gap-3 px-12 py-5 rounded-xl text-xl font-semibold transition-all ${
                                !isSubmitting
                                    ? 'bg-[rgb(92,107,192)] text-white hover:bg-[rgb(121,134,203)] hover:-translate-y-0.5 shadow-brand hover:shadow-brand-lg cursor-pointer'
                                    : 'bg-[rgb(197,202,233)] text-white cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit & Continue
                                    <ArrowRightIcon className="w-6 h-6" />
                                </>
                            )}
                        </button>
                        <p className="text-base text-[rgb(159,168,218)]">
                            We'll send you a custom quote within 24 hours
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Payment;
