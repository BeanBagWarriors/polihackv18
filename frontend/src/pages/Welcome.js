import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Card, Button, StatCard } from '../components/ui';
import usePageBackground from '../hooks/usePageBackground';

const Welcome = () => {
    usePageBackground();

    return (
        <div className="min-h-screen">
            <Navbar variant="public" />
            <section className="px-6 pt-24 pb-32 max-w-4xl mx-auto">
                <p className="text-xs text-[rgb(121,134,203)] mb-6 tracking-widest uppercase font-semibold">
                    Multi-cloud failover
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-[rgb(92,107,192)] mb-6 leading-tight">
                    Keep your services online,
                    <br />
                    <span className="bg-gradient-to-r from-[rgb(92,107,192)] to-[rgb(121,134,203)] bg-clip-text text-transparent">even when clouds go down</span>
                </h1>
                <p className="text-lg text-[rgb(121,134,203)] mb-10 max-w-2xl leading-relaxed font-medium">
                    Deploy your Docker containers to AWS and Google Cloud. 
                    When one fails, traffic switches to the other in milliseconds.
                </p>
                <div className="flex gap-4">
                    <Link 
                        to="/signup" 
                        className="bg-[rgb(92,107,192)] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[rgb(121,134,203)] hover:shadow-brand transition-all duration-200 active:scale-95"
                    >
                        Start free trial
                    </Link>
                    <a 
                        href="#how"
                        className="border-2 border-[rgb(179,186,227)] text-[rgb(92,107,192)] px-7 py-3 rounded-lg font-semibold hover:bg-white hover:border-[rgb(121,134,203)] transition-all duration-200 active:scale-95"
                    >
                        Learn more
                    </a>
                </div>
            </section>
            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                        <div className="text-2xl font-semibold text-[rgb(92,107,192)]">99.99%</div>
                        <div className="text-xs text-[rgb(159,168,218)] mt-1">Uptime</div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                        <div className="text-2xl font-semibold text-[rgb(92,107,192)]">&lt;50ms</div>
                        <div className="text-xs text-[rgb(159,168,218)] mt-1">Failover time</div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                        <div className="text-2xl font-semibold text-[rgb(92,107,192)]">2</div>
                        <div className="text-xs text-[rgb(159,168,218)] mt-1">Cloud providers</div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                        <div className="text-2xl font-semibold text-[rgb(92,107,192)]">24/7</div>
                        <div className="text-xs text-[rgb(159,168,218)] mt-1">Monitoring</div>
                    </div>
                </div>
            </section>

            <section id="how" className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <p className="text-sm text-[rgb(121,134,203)] mb-2 tracking-wide uppercase">How it works</p>
                    <h2 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-12">
                        Three steps to reliable infrastructure
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="w-8 h-8 bg-[rgb(92,107,192)] rounded-lg flex items-center justify-center text-white text-sm font-medium mb-4">
                                1
                            </div>
                            <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Create Dockerfile</h3>
                            <p className="text-sm text-[rgb(121,134,203)] leading-relaxed">
                                Package your stateless application with all dependencies.
                            </p>
                        </div>
                        <div>
                            <div className="w-8 h-8 bg-[rgb(121,134,203)] rounded-lg flex items-center justify-center text-white text-sm font-medium mb-4">
                                2
                            </div>
                            <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Upload to Faylo</h3>
                            <p className="text-sm text-[rgb(121,134,203)] leading-relaxed">
                                We deploy it to both AWS and Google Cloud automatically.
                            </p>
                        </div>
                        <div>
                            <div className="w-8 h-8 bg-[rgb(159,168,218)] rounded-lg flex items-center justify-center text-white text-sm font-medium mb-4">
                                3
                            </div>
                            <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Stay online</h3>
                            <p className="text-sm text-[rgb(121,134,203)] leading-relaxed">
                                Continuous health checks and automatic failover handle the rest.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <p className="text-sm text-[rgb(121,134,203)] mb-2 tracking-wide uppercase">Features</p>
                    <h2 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-12">
                        Built for reliability
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 border border-[rgb(197,202,233)]">
                            <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Automatic failover</h3>
                            <p className="text-sm text-[rgb(121,134,203)] leading-relaxed">
                                Traffic switches between AWS and Google Cloud in milliseconds when outages are detected.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-[rgb(197,202,233)]">
                            <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Docker native</h3>
                            <p className="text-sm text-[rgb(121,134,203)] leading-relaxed">
                                Upload your Dockerfile once. We handle replication and deployment across both clouds.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-[rgb(197,202,233)]">
                            <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Health monitoring</h3>
                            <p className="text-sm text-[rgb(121,134,203)] leading-relaxed">
                                Constant health checks via ping ensure instant detection of any downtime.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-[rgb(197,202,233)]">
                            <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Real-time dashboard</h3>
                            <p className="text-sm text-[rgb(121,134,203)] leading-relaxed">
                                Monitor status, uptime history, and logs from both cloud providers in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <p className="text-sm text-[rgb(159,168,218)] mb-6 text-center">Deploys to</p>
                    <div className="flex justify-center gap-12 items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[rgb(255,153,0)] bg-opacity-10 rounded-lg flex items-center justify-center">
                                <span className="text-[rgb(255,153,0)] font-bold text-xs">AWS</span>
                            </div>
                            <span className="text-sm text-[rgb(92,107,192)]">Amazon Web Services</span>
                        </div>
                        <div className="w-px h-8 bg-[rgb(197,202,233)]"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[rgb(66,133,244)] bg-opacity-10 rounded-lg flex items-center justify-center">
                                <span className="text-[rgb(66,133,244)] font-bold text-xs">GCP</span>
                            </div>
                            <span className="text-sm text-[rgb(92,107,192)]">Google Cloud Platform</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-6 py-20">
                <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 border border-[rgb(197,202,233)]">
                    <p className="text-xs text-[rgb(159,168,218)] mb-2 uppercase tracking-wide">Good to know</p>
                    <h2 className="text-lg font-medium text-[rgb(92,107,192)] mb-3">
                        What are stateless servers?
                    </h2>
                    <p className="text-sm text-[rgb(121,134,203)] leading-relaxed mb-5">
                        Stateless servers don't store data locally. All data lives in external databases or cloud storage. 
                        This allows us to spin up your app on a different cloud instantly without losing anything.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-3 py-1.5 rounded text-xs">
                            APIs
                        </span>
                        <span className="bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-3 py-1.5 rounded text-xs">
                            Microservices
                        </span>
                        <span className="bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-3 py-1.5 rounded text-xs">
                            Web frontends
                        </span>
                        <span className="bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-3 py-1.5 rounded text-xs">
                            Static sites
                        </span>
                    </div>
                </div>
            </section>
            <section className="px-6 py-20">
                <div className="max-w-3xl mx-auto bg-[rgb(92,107,192)] rounded-xl p-10 text-center">
                    <h2 className="text-2xl font-semibold text-white mb-3">
                        Ready to get started?
                    </h2>
                    <p className="text-[rgb(197,202,233)] text-sm mb-6">
                        Upload your Dockerfile and let Faylo handle the rest.
                    </p>
                    <Link 
                        to="/signup" 
                        className="inline-block bg-white text-[rgb(92,107,192)] px-6 py-3 rounded-lg font-medium hover:bg-[rgb(232,234,246)] transition-all"
                    >
                        Start free trial
                    </Link>
                    <p className="text-[rgb(179,186,227)] text-xs mt-4">
                        No credit card required
                    </p>
                </div>
            </section>
            <footer className="px-6 py-8 border-t border-[rgb(197,202,233)]">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="text-sm font-medium text-[rgb(92,107,192)]">
                        Faylo
                    </div>
                    <div className="flex gap-6 text-xs text-[rgb(159,168,218)]">
                        <a href="#" className="hover:text-[rgb(92,107,192)] transition-colors">Documentation</a>
                        <a href="#" className="hover:text-[rgb(92,107,192)] transition-colors">Support</a>
                        <a href="#" className="hover:text-[rgb(92,107,192)] transition-colors">Terms</a>
                    </div>
                    <p className="text-xs text-[rgb(179,186,227)]">
                        © 2025 Faylo
                    </p>
                </div>
            </footer>
        </div>
    );
}
 
export default Welcome;