import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { SectionHeader, FeatureCard, StepCard, StatItem, InfoCard, Footer, CloudProviderBadge, CheckIcon } from '../components/ui';
import usePageBackground from '../hooks/usePageBackground';

const Welcome = () => {
    usePageBackground();

    const pricingFactors = [
        { label: 'Container instances', desc: 'Number of services you deploy' },
        { label: 'Data transfer', desc: 'Monthly bandwidth usage' },
        { label: 'Uptime SLA', desc: '99.9% to 99.99% guaranteed' },
        { label: 'Support level', desc: 'Email to dedicated engineer' }
    ];

    return (
        <div className="min-h-screen">
            <Navbar variant="public" />
            
            {/* Hero */}
            <section className="px-6 pt-32 pb-40 max-w-5xl mx-auto">
                <p className="text-sm text-[rgb(121,134,203)] mb-8 tracking-[0.2em] uppercase font-semibold">
                    Multi-cloud failover
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold text-[rgb(92,107,192)] mb-8 leading-[1.1]">
                    Keep your services online,<br />
                    <span className="bg-gradient-to-r from-[rgb(92,107,192)] to-[rgb(159,168,218)] bg-clip-text text-transparent">even when clouds go down</span>
                </h1>
                <p className="text-xl text-[rgb(121,134,203)] mb-12 max-w-2xl leading-relaxed font-medium">
                    Deploy your Docker containers to AWS and Google Cloud. 
                    When one fails, traffic switches to the other in milliseconds.
                </p>
                <div className="flex gap-5">
                    <Link to="/signup" className="bg-[rgb(92,107,192)] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[rgb(121,134,203)] hover:shadow-brand-lg transition-all active:scale-95">
                        Get Started
                    </Link>
                    <a href="#pricing" className="border-2 border-[rgb(179,186,227)] text-[rgb(92,107,192)] px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:border-[rgb(121,134,203)] transition-all active:scale-95">
                        View Pricing
                    </a>
                </div>
            </section>

            {/* Stats */}
            <section className="px-6 pb-28">
                <div className="max-w-5xl mx-auto grid grid-cols-4 gap-6">
                    <StatItem value="99.99%" label="Uptime" />
                    <StatItem value="<50ms" label="Failover time" />
                    <StatItem value="2" label="Cloud providers" />
                    <StatItem value="24/7" label="Monitoring" />
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="px-6 py-28">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader label="How it works" title="Three steps to reliable infrastructure" className="mb-16" />
                    <div className="grid md:grid-cols-3 gap-12">
                        <StepCard number={1} title="Create Dockerfile" description="Package your stateless application with all dependencies." bgColor="bg-[rgb(92,107,192)]" />
                        <StepCard number={2} title="Upload to Faylo" description="We deploy it to both AWS and Google Cloud automatically." bgColor="bg-[rgb(121,134,203)]" />
                        <StepCard number={3} title="Stay online" description="Continuous health checks and automatic failover handle the rest." bgColor="bg-[rgb(159,168,218)]" />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="px-6 py-28 bg-[rgb(248,249,252)]">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader label="Pricing" title="Custom plans starting at $2,000/year" className="mb-6" />
                    <p className="text-lg text-[rgb(121,134,203)] mb-12 max-w-2xl">
                        We build custom quotes based on your needs. A small retail store shouldn't pay the same as a bank processing millions of transactions.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-white rounded-2xl p-8 border border-[rgb(197,202,233)]">
                            <h3 className="text-2xl font-bold text-[rgb(92,107,192)] mb-2">From $2,000/year</h3>
                            <p className="text-[rgb(159,168,218)] mb-6">Price varies based on:</p>
                            <div className="space-y-4">
                                {pricingFactors.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 text-[rgb(92,107,192)] mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-[rgb(92,107,192)]">{item.label}</span>
                                            <span className="text-[rgb(159,168,218)]"> — {item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-[rgb(197,202,233)]">
                            <h3 className="text-2xl font-bold text-[rgb(92,107,192)] mb-2">All plans include</h3>
                            <p className="text-[rgb(159,168,218)] mb-6">Core features in every plan:</p>
                            <div className="space-y-3">
                                {['Multi-cloud failover (AWS + GCP)', 'Real-time health monitoring', 'Automatic traffic switching', 'Dashboard & analytics', 'Email support'].map((f, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckIcon className="w-5 h-5 text-green-500" />
                                        <span className="text-[rgb(121,134,203)]">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <Link to="/signup" className="inline-block bg-[rgb(92,107,192)] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[rgb(121,134,203)] transition-all">
                            Get Custom Quote
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="px-6 py-28">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader label="Features" title="Built for reliability" className="mb-16" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <FeatureCard title="Automatic failover" description="Traffic switches between AWS and Google Cloud in milliseconds when outages are detected." />
                        <FeatureCard title="Docker native" description="Upload your Dockerfile once. We handle replication and deployment across both clouds." />
                        <FeatureCard title="Health monitoring" description="Constant health checks via ping ensure instant detection of any downtime." />
                        <FeatureCard title="Real-time dashboard" description="Monitor status, uptime history, and logs from both cloud providers in one place." />
                    </div>
                </div>
            </section>

            {/* Cloud providers */}
            <section className="px-6 py-24">
                <div className="max-w-5xl mx-auto">
                    <p className="text-base text-[rgb(159,168,218)] mb-8 text-center font-medium">Deploys to</p>
                    <div className="flex justify-center gap-16 items-center">
                        <CloudProviderBadge provider="aws" name="Amazon Web Services" />
                        <div className="w-px h-12 bg-[rgb(197,202,233)]"></div>
                        <CloudProviderBadge provider="gcp" name="Google Cloud Platform" />
                    </div>
                </div>
            </section>

            {/* Info */}
            <section className="px-6 py-28">
                <InfoCard 
                    label="Good to know"
                    title="What are stateless servers?"
                    description="Stateless servers don't store data locally. All data lives in external databases or cloud storage. This allows us to spin up your app on a different cloud instantly without losing anything."
                    tags={['APIs', 'Microservices', 'Web frontends', 'Static sites']}
                    className="max-w-4xl mx-auto"
                />
            </section>

            {/* CTA */}
            <section className="px-6 py-28">
                <div className="max-w-4xl mx-auto bg-[rgb(92,107,192)] rounded-3xl p-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Ready to get started?</h2>
                    <p className="text-[rgb(197,202,233)] text-lg mb-3">Upload your Dockerfile and let Faylo handle the rest.</p>
                    <p className="text-[rgb(179,186,227)] text-base mb-10">Custom plans from $2,000/year</p>
                    <Link to="/signup" className="inline-block bg-white text-[rgb(92,107,192)] px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[rgb(232,234,246)] transition-all">
                        Create Account
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Welcome;