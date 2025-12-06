import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Input, StatCard, CloudCard } from '../components/ui';
import usePageBackground from '../hooks/usePageBackground';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [showHelp, setShowHelp] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    usePageBackground();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDeploy = () => {
        if (!uploadedFile) return;
        console.log('Deploy:', uploadedFile);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen">
            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-[rgb(197,202,233)]">
                <Link to="/" className="text-xl font-semibold text-[rgb(92,107,192)] no-underline">
                    Faylo
                </Link>
                
                <div className="flex gap-1">
                    <Button
                        onClick={() => setActiveTab('upload')}
                        variant={activeTab === 'upload' ? 'tabActive' : 'tab'}
                    >
                        Deploy
                    </Button>
                    <Button
                        onClick={() => setActiveTab('dashboard')}
                        variant={activeTab === 'dashboard' ? 'tabActive' : 'tab'}
                    >
                        Dashboard
                    </Button>
                    <Button
                        onClick={() => setActiveTab('logs')}
                        variant={activeTab === 'logs' ? 'tabActive' : 'tab'}
                    >
                        Logs
                    </Button>
                    <Button
                        onClick={() => setActiveTab('settings')}
                        variant={activeTab === 'settings' ? 'tabActive' : 'tab'}
                    >
                        Settings
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => setShowHelp(true)}>
                        Help
                    </Button>
                    <Button variant="ghost" onClick={handleLogout}>
                        Sign out
                    </Button>
                    <div className="w-8 h-8 bg-[rgb(92,107,192)] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        U
                    </div>
                </div>
            </nav>

            {/* CONTENT */}
            <div className="p-6 max-w-6xl mx-auto">

                {/* DEPLOY TAB */}
                {activeTab === 'upload' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Deploy</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Upload your Dockerfile to deploy across AWS and Google Cloud</p>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <Card 
                                variant="dashed"
                                onClick={() => document.getElementById('fileInput').click()}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className="cursor-pointer text-center"
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                                {uploadedFile ? (
                                    <div>
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                            <span className="text-green-600 text-2xl">✓</span>
                                        </div>
                                        <p className="font-medium text-[rgb(92,107,192)] mb-1">{uploadedFile.name}</p>
                                        <p className="text-xs text-[rgb(159,168,218)] mb-4">
                                            {(uploadedFile.size / 1024).toFixed(1)} KB
                                        </p>
                                        <Button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeploy();
                                            }}
                                        >
                                            Deploy Now
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-12 h-12 bg-[rgb(232,234,246)] rounded-lg flex items-center justify-center mx-auto mb-4">
                                            <span className="text-[rgb(121,134,203)] text-xl">↑</span>
                                        </div>
                                        <p className="font-medium text-[rgb(92,107,192)] mb-1">Drop your Dockerfile here</p>
                                        <p className="text-sm text-[rgb(159,168,218)]">or click to browse</p>
                                    </div>
                                )}
                            </Card>

                            <Card>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-4 text-sm">Before you deploy</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 border border-[rgb(179,186,227)] rounded shrink-0"></div>
                                        <div>
                                            <p className="text-[rgb(92,107,192)] text-sm">Stateless application</p>
                                            <p className="text-[rgb(159,168,218)] text-xs">No local data storage</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 border border-[rgb(179,186,227)] rounded shrink-0"></div>
                                        <div>
                                            <p className="text-[rgb(92,107,192)] text-sm">Port exposed</p>
                                            <p className="text-[rgb(159,168,218)] text-xs">EXPOSE directive in Dockerfile</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 border border-[rgb(179,186,227)] rounded shrink-0"></div>
                                        <div>
                                            <p className="text-[rgb(92,107,192)] text-sm">Health endpoint</p>
                                            <p className="text-[rgb(159,168,218)] text-xs">/health returns 200</p>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowHelp(true)}
                                    className="mt-5 w-full"
                                >
                                    Learn more
                                </Button>
                            </Card>
                        </div>
                    </div>
                )}

                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Dashboard</h1>
                                <p className="text-sm text-[rgb(121,134,203)]">Monitor your deployment status</p>
                            </div>
                            <div className="flex items-center gap-2 bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-3 py-1.5 rounded-full text-sm">
                                <span className="w-2 h-2 bg-[rgb(159,168,218)] rounded-full"></span>
                                No deployment
                            </div>
                        </div>

                        {/* Cloud Cards */}
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <CloudCard provider="aws" />
                            <CloudCard provider="gcp" />
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-5">
                            {['Uptime', 'Failovers', 'Avg response', 'Pings today'].map((label) => (
                                <StatCard key={label} label={label} value="-" />
                            ))}
                        </div>

                        {/* Uptime Graph */}
                        <Card className="mb-5">
                            <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Uptime - Last 24 hours</h3>
                            <div className="h-24 bg-[rgb(232,234,246)] rounded-lg flex items-center justify-center">
                                <span className="text-sm text-[rgb(159,168,218)]">No data</span>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-[rgb(159,168,218)]">
                                <span>24h ago</span>
                                <span>Now</span>
                            </div>
                        </Card>

                        {/* Activity */}
                        <Card>
                            <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Recent activity</h3>
                            <div className="text-center py-8 text-sm text-[rgb(159,168,218)]">
                                No activity yet
                            </div>
                        </Card>
                    </div>
                )}

                {/* LOGS TAB */}
                {activeTab === 'logs' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Logs</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Container logs and events</p>
                        </div>
                        <Card variant="dark" className="font-mono text-sm">
                            <div className="flex gap-2 mb-4 pb-3 border-b border-[rgb(55,55,55)]">
                                <button className="text-white bg-[rgb(55,55,55)] px-3 py-1 rounded border-none text-xs cursor-pointer">AWS</button>
                                <button className="text-gray-500 bg-transparent px-3 py-1 rounded border-none text-xs cursor-pointer">GCP</button>
                            </div>
                            <div className="h-80 flex items-center justify-center text-gray-500">
                                No logs available
                            </div>
                        </Card>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Settings</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Configure your deployment</p>
                        </div>

                        <div className="flex flex-col gap-5">
                            {/* Env Vars */}
                            <Card>
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Environment variables</h3>
                                <div className="flex gap-2">
                                    <Input variant="mono" placeholder="KEY" className="flex-1" />
                                    <Input variant="mono" placeholder="VALUE" className="flex-1" />
                                    <Button variant="secondary">Add</Button>
                                </div>
                            </Card>

                            {/* Domain */}
                            <Card>
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Custom domain</h3>
                                <div className="flex gap-2">
                                    <Input placeholder="yourdomain.com" className="flex-1" />
                                    <Button variant="primary">Add</Button>
                                </div>
                                <p className="text-xs text-[rgb(159,168,218)] mt-2">Point CNAME to faylo-proxy.com</p>
                            </Card>

                            {/* Monitoring */}
                            <Card>
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Monitoring</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-[rgb(92,107,192)]">Ping interval</p>
                                            <p className="text-xs text-[rgb(159,168,218)]">How often we check your service</p>
                                        </div>
                                        <select className="p-2 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none">
                                            <option value="10">10 seconds</option>
                                            <option value="30">30 seconds</option>
                                            <option value="60">1 minute</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-[rgb(92,107,192)]">Health endpoint</p>
                                            <p className="text-xs text-[rgb(159,168,218)]">Path to check</p>
                                        </div>
                                        <Input variant="mono" placeholder="/health" className="w-28" />
                                    </div>
                                </div>
                            </Card>

                            {/* Danger */}
                            <Card variant="danger">
                                <h3 className="font-medium text-red-600 text-sm mb-4">Danger zone</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-[rgb(92,107,192)]">Delete deployment</p>
                                        <p className="text-xs text-[rgb(159,168,218)]">Remove containers from all clouds</p>
                                    </div>
                                    <Button variant="danger">Delete</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>

            {/* HELP MODAL */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <Card className="p-6 max-w-lg w-full max-h-[85vh] overflow-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-semibold text-[rgb(92,107,192)]">Help</h2>
                            <Button
                                variant="ghost"
                                onClick={() => setShowHelp(false)}
                                className="w-8 h-8 text-lg"
                            >
                                ×
                            </Button>
                        </div>

                        <div className="flex flex-col gap-5 text-sm">
                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">What is Faylo?</h3>
                                <p className="text-[rgb(121,134,203)] leading-relaxed">
                                    Faylo deploys your Docker container to AWS and Google Cloud simultaneously. 
                                    If one provider goes down, traffic automatically switches to the other.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Dockerfile example</h3>
                                <Card variant="dark" className="p-4 font-mono text-xs text-gray-300 overflow-auto">
                                    <p><span className="text-blue-400">FROM</span> node:18-alpine</p>
                                    <p><span className="text-blue-400">WORKDIR</span> /app</p>
                                    <p><span className="text-blue-400">COPY</span> package*.json ./</p>
                                    <p><span className="text-blue-400">RUN</span> npm install</p>
                                    <p><span className="text-blue-400">COPY</span> . .</p>
                                    <p><span className="text-blue-400">EXPOSE</span> 3000</p>
                                    <p><span className="text-blue-400">CMD</span> ["node", "server.js"]</p>
                                </Card>
                            </div>

                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Requirements</h3>
                                <ul className="text-[rgb(121,134,203)] pl-5 leading-loose list-disc">
                                    <li><strong className="text-[rgb(92,107,192)]">Stateless</strong> - No local storage, use external databases</li>
                                    <li><strong className="text-[rgb(92,107,192)]">EXPOSE</strong> - Declare your port in the Dockerfile</li>
                                    <li><strong className="text-[rgb(92,107,192)]">Health check</strong> - Return 200 on / or /health</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">How failover works</h3>
                                <ol className="text-[rgb(121,134,203)] pl-5 leading-loose list-decimal">
                                    <li>Container deployed to AWS and GCP</li>
                                    <li>We ping your primary server continuously</li>
                                    <li>If pings fail, traffic switches to backup</li>
                                    <li>Users experience zero downtime</li>
                                </ol>
                            </div>
                        </div>

                        <Button
                            onClick={() => setShowHelp(false)}
                            className="mt-6 w-full"
                        >
                            Got it
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
}
 
export default HomePage;