import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [showHelp, setShowHelp] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    // BACKEND TODO: Aici o sa vina datele din backend
    // GET /api/deployment - ia statusul, date AWS/GCP, statistici
    // useEffect(() => {
    //     fetch('/api/deployment').then(res => res.json()).then(data => setDeploymentData(data))
    // }, []);

    useEffect(() => {
        const gradient = 'linear-gradient(135deg, rgb(232,234,246) 0%, rgb(197,202,233) 100%)';
        document.documentElement.style.background = gradient;
        document.documentElement.style.minHeight = '100vh';
        document.body.style.background = gradient;
        document.body.style.minHeight = '100vh';
        document.body.style.margin = '0';
        
        return () => {
            document.documentElement.style.background = '';
            document.documentElement.style.minHeight = '';
            document.body.style.background = '';
            document.body.style.minHeight = '';
        };
    }, []);

    // BACKEND TODO: POST /api/deploy cu FormData
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

    // BACKEND TODO: POST /api/deploy cu uploadedFile
    const handleDeploy = () => {
        if (!uploadedFile) return;
        console.log('Deploy:', uploadedFile);
    };

    return (
        <div className="min-h-screen">
            <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-[rgb(197,202,233)]">
                <div className="text-2xl font-bold text-[rgb(92,107,192)]">
                    Faylo
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeTab === 'upload' 
                                ? 'bg-[rgb(92,107,192)] text-white' 
                                : 'text-[rgb(92,107,192)] hover:bg-[rgb(232,234,246)]'
                        }`}
                    >
                        Deploy
                    </button>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeTab === 'dashboard' 
                                ? 'bg-[rgb(92,107,192)] text-white' 
                                : 'text-[rgb(92,107,192)] hover:bg-[rgb(232,234,246)]'
                        }`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeTab === 'logs' 
                                ? 'bg-[rgb(92,107,192)] text-white' 
                                : 'text-[rgb(92,107,192)] hover:bg-[rgb(232,234,246)]'
                        }`}
                    >
                        Logs
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeTab === 'settings' 
                                ? 'bg-[rgb(92,107,192)] text-white' 
                                : 'text-[rgb(92,107,192)] hover:bg-[rgb(232,234,246)]'
                        }`}
                    >
                        Settings
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowHelp(true)}
                        className="text-sm text-[rgb(121,134,203)] hover:text-[rgb(92,107,192)] transition-all"
                    >
                        Help
                    </button>
                    {/* BACKEND: prima litera din username */}
                    <div className="w-9 h-9 bg-[rgb(92,107,192)] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        U
                    </div>
                </div>
            </nav>

            <div className="p-6 max-w-6xl mx-auto">

                {/* DEPLOY TAB */}
                {activeTab === 'upload' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Deploy</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Upload your Dockerfile to deploy across AWS and Google Cloud</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-5">
                            {/* BACKEND TODO: POST /api/deploy cu FormData */}
                            <div 
                                className="bg-white rounded-xl p-8 border-2 border-dashed border-[rgb(179,186,227)] hover:border-[rgb(92,107,192)] transition-all cursor-pointer"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                                <div className="text-center py-6">
                                    {uploadedFile ? (
                                        <>
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="font-medium text-[rgb(92,107,192)] mb-1">{uploadedFile.name}</p>
                                            <p className="text-xs text-[rgb(159,168,218)] mb-4">
                                                {(uploadedFile.size / 1024).toFixed(1)} KB
                                            </p>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeploy();
                                                }}
                                                className="bg-[rgb(92,107,192)] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[rgb(121,134,203)] transition-all"
                                            >
                                                Deploy Now
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 bg-[rgb(232,234,246)] rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-6 h-6 text-[rgb(121,134,203)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>
                                            <p className="font-medium text-[rgb(92,107,192)] mb-1">Drop your Dockerfile here</p>
                                            <p className="text-sm text-[rgb(159,168,218)]">or click to browse</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-4 text-sm">Before you deploy</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 rounded border border-[rgb(179,186,227)] flex-shrink-0 mt-0.5"></div>
                                        <div>
                                            <p className="text-[rgb(92,107,192)]">Stateless application</p>
                                            <p className="text-xs text-[rgb(159,168,218)]">No local data storage</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 rounded border border-[rgb(179,186,227)] flex-shrink-0 mt-0.5"></div>
                                        <div>
                                            <p className="text-[rgb(92,107,192)]">Port exposed</p>
                                            <p className="text-xs text-[rgb(159,168,218)]">EXPOSE directive in Dockerfile</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 rounded border border-[rgb(179,186,227)] flex-shrink-0 mt-0.5"></div>
                                        <div>
                                            <p className="text-[rgb(92,107,192)]">Health endpoint</p>
                                            <p className="text-xs text-[rgb(159,168,218)]">/health returns 200</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowHelp(true)}
                                    className="mt-5 w-full py-2 text-sm text-[rgb(92,107,192)] border border-[rgb(179,186,227)] rounded-lg hover:bg-[rgb(232,234,246)] transition-all"
                                >
                                    Learn more
                                </button>
                            </div>
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
                            {/* BACKEND: status vine din /api/deployment */}
                            <div className="flex items-center gap-2 bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-3 py-1.5 rounded-full text-sm">
                                <span className="w-2 h-2 bg-[rgb(159,168,218)] rounded-full"></span>
                                No deployment
                            </div>
                        </div>

                        <div className="space-y-5">
                            {/* Cloud Cards */}
                            {/* BACKEND: GET /api/status/aws si /api/status/gcp */}
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[rgb(255,153,0)] bg-opacity-10 rounded-lg flex items-center justify-center">
                                                <span className="text-[rgb(255,153,0)] font-bold text-sm">AWS</span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm">Amazon Web Services</h3>
                                                <p className="text-xs text-[rgb(159,168,218)]">-</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-[rgb(159,168,218)] bg-[rgb(232,234,246)] px-2 py-1 rounded">-</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Status</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Last ping</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Response</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Uptime</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[rgb(66,133,244)] bg-opacity-10 rounded-lg flex items-center justify-center">
                                                <span className="text-[rgb(66,133,244)] font-bold text-sm">GCP</span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm">Google Cloud</h3>
                                                <p className="text-xs text-[rgb(159,168,218)]">-</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-[rgb(159,168,218)] bg-[rgb(232,234,246)] px-2 py-1 rounded">-</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Status</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Last ping</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Response</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[rgb(159,168,218)]">Uptime</span>
                                            <span className="text-[rgb(92,107,192)]">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            {/* BACKEND: GET /api/stats */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-[rgb(197,202,233)]">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Uptime</p>
                                    <p className="text-xl font-semibold text-[rgb(92,107,192)]">-</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-[rgb(197,202,233)]">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Failovers</p>
                                    <p className="text-xl font-semibold text-[rgb(92,107,192)]">-</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-[rgb(197,202,233)]">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Avg response</p>
                                    <p className="text-xl font-semibold text-[rgb(92,107,192)]">-</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-[rgb(197,202,233)]">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Pings today</p>
                                    <p className="text-xl font-semibold text-[rgb(92,107,192)]">-</p>
                                </div>
                            </div>

                            {/* Uptime Graph */}
                            {/* BACKEND: GET /api/uptime-history - array cu valori pentru fiecare interval */}
                            <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Uptime - Last 24 hours</h3>
                                <div className="h-24 bg-[rgb(232,234,246)] rounded-lg flex items-center justify-center">
                                    <span className="text-sm text-[rgb(159,168,218)]">No data</span>
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-[rgb(159,168,218)]">
                                    <span>24h ago</span>
                                    <span>Now</span>
                                </div>
                            </div>

                            {/* Activity */}
                            {/* BACKEND: GET /api/activity */}
                            <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Recent activity</h3>
                                <div className="text-center py-8 text-sm text-[rgb(159,168,218)]">
                                    No activity yet
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* LOGS TAB */}
                {activeTab === 'logs' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Logs</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Container logs and events</p>
                        </div>

                        {/* BACKEND: GET /api/logs?provider=aws sau gcp */}
                        <div className="bg-[rgb(30,30,30)] rounded-xl p-5 font-mono text-sm">
                            <div className="flex gap-2 mb-4 pb-3 border-b border-gray-700">
                                <button className="text-white bg-gray-700 px-3 py-1 rounded text-xs">AWS</button>
                                <button className="text-gray-500 hover:text-gray-300 px-3 py-1 rounded text-xs">GCP</button>
                            </div>
                            <div className="h-80 overflow-y-auto text-gray-500 flex items-center justify-center">
                                No logs available
                            </div>
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Settings</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Configure your deployment</p>
                        </div>

                        <div className="space-y-5">
                            {/* Env Vars */}
                            {/* BACKEND: GET/POST/DELETE /api/settings/env */}
                            <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Environment variables</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="KEY"
                                        className="flex-1 p-2.5 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none focus:border-[rgb(92,107,192)] font-mono"
                                    />
                                    <input
                                        type="text"
                                        placeholder="VALUE"
                                        className="flex-1 p-2.5 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none focus:border-[rgb(92,107,192)] font-mono"
                                    />
                                    <button className="px-4 py-2 bg-[rgb(232,234,246)] text-[rgb(92,107,192)] rounded-lg hover:bg-[rgb(197,202,233)] transition-all text-sm">
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Domain */}
                            {/* BACKEND: GET/POST /api/settings/domain */}
                            <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Custom domain</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="yourdomain.com"
                                        className="flex-1 p-2.5 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none focus:border-[rgb(92,107,192)]"
                                    />
                                    <button className="px-4 py-2 bg-[rgb(92,107,192)] text-white rounded-lg hover:bg-[rgb(121,134,203)] transition-all text-sm">
                                        Add
                                    </button>
                                </div>
                                <p className="text-xs text-[rgb(159,168,218)] mt-2">Point CNAME to faylo-proxy.com</p>
                            </div>

                            {/* Monitoring */}
                            {/* BACKEND: GET/PUT /api/settings/monitoring */}
                            <div className="bg-white rounded-xl p-5 border border-[rgb(197,202,233)]">
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Monitoring</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-[rgb(92,107,192)]">Ping interval</p>
                                            <p className="text-xs text-[rgb(159,168,218)]">How often we check your service</p>
                                        </div>
                                        <select className="p-2 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none focus:border-[rgb(92,107,192)]">
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
                                        <input
                                            type="text"
                                            placeholder="/health"
                                            className="w-28 p-2 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none focus:border-[rgb(92,107,192)] font-mono"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Danger */}
                            {/* BACKEND: DELETE /api/deployment */}
                            <div className="bg-white rounded-xl p-5 border border-red-200">
                                <h3 className="font-medium text-red-600 text-sm mb-4">Danger zone</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-[rgb(92,107,192)]">Delete deployment</p>
                                        <p className="text-xs text-[rgb(159,168,218)]">Remove containers from all clouds</p>
                                    </div>
                                    <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* HELP MODAL */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-semibold text-[rgb(92,107,192)]">Help</h2>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-8 h-8 rounded-lg hover:bg-[rgb(232,234,246)] flex items-center justify-center text-[rgb(159,168,218)] transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-5 text-sm">
                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">What is Faylo?</h3>
                                <p className="text-[rgb(121,134,203)] leading-relaxed">
                                    Faylo deploys your Docker container to AWS and Google Cloud simultaneously. 
                                    If one provider goes down, traffic automatically switches to the other.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Dockerfile example</h3>
                                <div className="bg-[rgb(30,30,30)] rounded-lg p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                                    <p><span className="text-blue-400">FROM</span> node:18-alpine</p>
                                    <p><span className="text-blue-400">WORKDIR</span> /app</p>
                                    <p><span className="text-blue-400">COPY</span> package*.json ./</p>
                                    <p><span className="text-blue-400">RUN</span> npm install</p>
                                    <p><span className="text-blue-400">COPY</span> . .</p>
                                    <p><span className="text-blue-400">EXPOSE</span> 3000</p>
                                    <p><span className="text-blue-400">CMD</span> ["node", "server.js"]</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">Requirements</h3>
                                <ul className="text-[rgb(121,134,203)] space-y-1.5">
                                    <li><span className="text-[rgb(92,107,192)]">Stateless</span> - No local storage, use external databases</li>
                                    <li><span className="text-[rgb(92,107,192)]">EXPOSE</span> - Declare your port in the Dockerfile</li>
                                    <li><span className="text-[rgb(92,107,192)]">Health check</span> - Return 200 on / or /health</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-[rgb(92,107,192)] mb-2">How failover works</h3>
                                <ol className="text-[rgb(121,134,203)] space-y-1.5 list-decimal list-inside">
                                    <li>Container deployed to AWS and GCP</li>
                                    <li>We ping your primary server continuously</li>
                                    <li>If pings fail, traffic switches to backup</li>
                                    <li>Users experience zero downtime</li>
                                </ol>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowHelp(false)}
                            className="mt-6 w-full py-2.5 bg-[rgb(92,107,192)] text-white rounded-lg text-sm font-medium hover:bg-[rgb(121,134,203)] transition-all"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default HomePage;