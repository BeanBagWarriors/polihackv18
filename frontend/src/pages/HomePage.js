import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Input, StatCard, CloudCard } from '../components/ui';
import faylogo from '../assets/faylogo.png';
import usePageBackground from '../hooks/usePageBackground';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [showHelp, setShowHelp] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [instanceName, setInstanceName] = useState('');
    const [instanceIp, setInstanceIp] = useState('');
    const [instanceRegion, setInstanceRegion] = useState('');
    
    // GHCR Configuration
    const [ghcrUsername, setGhcrUsername] = useState('');
    const [ghcrImage, setGhcrImage] = useState('');
    const [ghcrTag, setGhcrTag] = useState('latest');
    const [ghcrPat, setGhcrPat] = useState('');
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployStatus, setDeployStatus] = useState('');

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

    const handleDeploy = async () => {
        if (!ghcrUsername || !ghcrImage || !ghcrPat) {
            alert('Please fill in all GHCR details');
            return;
        }
        if (!instanceIp) {
            alert('Please fill in the instance IP address');
            return;
        }

        setIsDeploying(true);
        setDeployStatus('Starting deployment...');

        const deployScript = `
            echo "${ghcrPat}" | sudo docker login ghcr.io -u ${ghcrUsername} --password-stdin

            sudo docker pull ghcr.io/${ghcrUsername}/${ghcrImage}:${ghcrTag}

            sudo docker stop ${ghcrImage}-app 2>/dev/null || true
            sudo docker rm ${ghcrImage}-app 2>/dev/null || true

            sudo docker run -d \\
            --name ${ghcrImage}-app \\
            -p 3000:3000 \\
            -p 4000:4000 \\
            --restart unless-stopped \\
            ghcr.io/${ghcrUsername}/${ghcrImage}:${ghcrTag}

            echo "DONE"
            `;

        const deployConfig = {
            ghcr: {
                username: ghcrUsername,
                image: ghcrImage,
                tag: ghcrTag,
                pat: ghcrPat
            },
            instance: { name: instanceName, ip: instanceIp, region: instanceRegion },
            script: deployScript
        };

        console.log('Deploy Config:', deployConfig);
        console.log('Deploy Script:', deployScript);
        
        // TODO: Send to backend for actual deployment
        setTimeout(() => {
            setIsDeploying(false);
            setDeployStatus('Deployment initiated! Check your instance.');
        }, 2000);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen">
            <nav className="flex justify-between items-center px-8 py-2 bg-white border-b border-[rgb(197,202,233)]">
                <Link to="/" className="hover:opacity-90 transition-all duration-200">
                    <img src={faylogo} alt="Faylo" className="h-16" />
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
            <div className="p-6 max-w-6xl mx-auto">
                {activeTab === 'upload' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Deploy</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Configure your GHCR image and deploy to cloud instances</p>
                        </div>

                        {/* GHCR Configuration */}
                        <Card className="mb-6">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgb(197,202,233)]">
                                <div className="w-8 h-8 bg-[rgb(36,41,46)] rounded flex items-center justify-center text-white text-sm font-bold">📦</div>
                                <h3 className="text-lg font-semibold text-[rgb(92,107,192)]">GitHub Container Registry (GHCR)</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="GHCR Username"
                                    placeholder="e.g., 00alexo"
                                    value={ghcrUsername}
                                    onChange={(e) => setGhcrUsername(e.target.value)}
                                />
                                <Input
                                    label="Image Name"
                                    placeholder="e.g., infobase"
                                    value={ghcrImage}
                                    onChange={(e) => setGhcrImage(e.target.value)}
                                />
                                <Input
                                    label="Tag"
                                    placeholder="e.g., latest"
                                    value={ghcrTag}
                                    onChange={(e) => setGhcrTag(e.target.value)}
                                />
                                <Input
                                    label="Personal Access Token (PAT)"
                                    type="password"
                                    placeholder="ghp_xxxxxxxxxxxx"
                                    value={ghcrPat}
                                    onChange={(e) => setGhcrPat(e.target.value)}
                                />
                            </div>
                            <p className="text-xs text-[rgb(159,168,218)] mt-3">
                                Image: ghcr.io/{ghcrUsername || 'username'}/{ghcrImage || 'image'}:{ghcrTag || 'latest'}
                            </p>
                        </Card>

                        {/* Dockerfile Upload */}
                        <Card 
                            variant="dashed"
                            onClick={() => document.getElementById('fileInput').click()}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="mb-6 cursor-pointer text-center"
                        >
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept=".dockerfile,Dockerfile,*"
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
                                        variant="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setUploadedFile(null);
                                        }}
                                    >
                                        Remove file
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <div className="w-12 h-12 bg-[rgb(232,234,246)] rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <span className="text-[rgb(121,134,203)] text-xl">🐳</span>
                                    </div>
                                    <p className="font-medium text-[rgb(92,107,192)] mb-1">Drop your Dockerfile here</p>
                                    <p className="text-sm text-[rgb(159,168,218)]">or click to browse (optional)</p>
                                </div>
                            )}
                        </Card>

                        <h2 className="text-xl font-semibold text-[rgb(92,107,192)] mb-4">Instance Configuration</h2>
                        
                        <Card className="mb-6">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgb(197,202,233)]">
                                <div className="w-8 h-8 bg-[rgb(52,168,219)] rounded flex items-center justify-center text-white text-sm font-bold">G</div>
                                <h3 className="text-lg font-semibold text-[rgb(92,107,192)]">Google Cloud Instance</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Input
                                    label="Instance Name (optional)"
                                    placeholder="e.g., my-app-prod"
                                    value={instanceName}
                                    onChange={(e) => setInstanceName(e.target.value)}
                                />
                                <Input
                                    label="Instance IP Address"
                                    placeholder="e.g., 34.76.123.45"
                                    value={instanceIp}
                                    onChange={(e) => setInstanceIp(e.target.value)}
                                />
                                <div>
                                    <label className="text-sm font-semibold text-[rgb(92,107,192)] mb-2 block">Registry</label>
                                    <select
                                        value={instanceRegion}
                                        onChange={(e) => setInstanceRegion(e.target.value)}
                                        className="w-full p-2.5 text-sm border border-[rgb(179,186,227)] rounded-lg outline-none focus:border-[rgb(121,134,203)] focus:ring-2 focus:ring-[rgb(159,168,218)] focus:ring-opacity-30 bg-white text-[rgb(92,107,192)]"
                                    >
                                        <option value="">Select a registry</option>
                                        <option value="us-central1">US Central (Iowa)</option>
                                        <option value="us-east1">US East (South Carolina)</option>
                                        <option value="us-west1">US West (Oregon)</option>
                                        <option value="europe-west1">Europe West (Belgium)</option>
                                        <option value="europe-west2">Europe West (London)</option>
                                        <option value="asia-east1">Asia East (Taiwan)</option>
                                        <option value="asia-southeast1">Asia Southeast (Singapore)</option>
                                    </select>
                                </div>
                            </div>
                        </Card>

                                {deployStatus && (
                                    <div className={`mb-4 p-4 rounded-lg ${isDeploying ? 'bg-[rgb(232,234,246)]' : 'bg-green-100'}`}>
                                        <p className={`text-sm font-medium ${isDeploying ? 'text-[rgb(92,107,192)]' : 'text-green-700'}`}>
                                            {isDeploying && <span className="inline-block animate-spin mr-2">⏳</span>}
                                            {deployStatus}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1"
                                        onClick={handleDeploy}
                                        disabled={isDeploying || !ghcrUsername || !ghcrImage || !ghcrPat || !instanceIp}
                                    >
                                        {isDeploying ? 'Deploying...' : 'Deploy to Cloud'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setGhcrUsername('');
                                            setGhcrImage('');
                                            setGhcrTag('latest');
                                            setGhcrPat('');
                                            setDeployStatus('');
                                            setInstanceName('');
                                            setInstanceIp('');
                                            setInstanceRegion('');
                                        }}
                                        disabled={isDeploying}
                                    >
                                        Clear
                                    </Button>
                                </div>
                    </div>
                )}
                {activeTab === 'dashboard' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Dashboard</h1>
                                <p className="text-sm text-[rgb(121,134,203)]">Monitor and control your deployment</p>
                            </div>
                            <div className="flex items-center gap-2 bg-[rgb(232,234,246)] text-[rgb(92,107,192)] px-3 py-1.5 rounded-full text-sm">
                                <span className="w-2 h-2 bg-[rgb(159,168,218)] rounded-full"></span>
                                No deployment
                            </div>
                        </div>

                        {/* Control Panel */}
                        <Card className="mb-6">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgb(197,202,233)]">
                                <div className="w-8 h-8 bg-[rgb(92,107,192)] rounded flex items-center justify-center text-white text-sm font-bold">⚙️</div>
                                <h3 className="text-lg font-semibold text-[rgb(92,107,192)]">Control Panel</h3>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-3 mb-6">
                                <Button 
                                    variant="primary"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <span className="text-xl">▶️</span>
                                    <span>Start</span>
                                </Button>
                                <Button 
                                    variant="secondary"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <span className="text-xl">⏹️</span>
                                    <span>Stop</span>
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <span className="text-xl">🔄</span>
                                    <span>Restart</span>
                                </Button>
                                <Button 
                                    variant="danger"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <span className="text-xl">🗑️</span>
                                    <span>Delete</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[rgb(232,234,246)] rounded-lg p-4">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Container ID</p>
                                    <p className="text-sm font-mono text-[rgb(159,168,218)]">-</p>
                                </div>
                                <div className="bg-[rgb(232,234,246)] rounded-lg p-4">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Image</p>
                                    <p className="text-sm font-mono text-[rgb(159,168,218)]">-</p>
                                </div>
                                <div className="bg-[rgb(232,234,246)] rounded-lg p-4">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Instance IP</p>
                                    <p className="text-sm font-mono text-[rgb(159,168,218)]">-</p>
                                </div>
                                <div className="bg-[rgb(232,234,246)] rounded-lg p-4">
                                    <p className="text-xs text-[rgb(159,168,218)] mb-1">Ports</p>
                                    <p className="text-sm font-mono text-[rgb(159,168,218)]">-</p>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="mb-6">
                            <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Quick Actions</h3>
                            <div className="flex gap-3">
                                <Button variant="outline">
                                    📥 Pull Latest
                                </Button>
                                <Button variant="outline">
                                    📋 View Logs
                                </Button>
                                <Button variant="outline">
                                    🔗 SSH Connect
                                </Button>
                                <Button variant="outline">
                                    🌐 Open App
                                </Button>
                            </div>
                        </Card>

                        <div className="grid grid-cols-4 gap-4 mb-5">
                            <StatCard label="Uptime" value="-" />
                            <StatCard label="Failovers" value="-" />
                            <StatCard label="Avg Response" value="-" />
                            <StatCard label="Requests Today" value="-" />
                        </div>

                        <Card className="mb-5">
                            <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Resource Usage</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-[rgb(92,107,192)]">CPU</span>
                                        <span className="text-sm font-medium text-[rgb(159,168,218)]">-</span>
                                    </div>
                                    <div className="h-2 bg-[rgb(232,234,246)] rounded-full overflow-hidden">
                                        <div className="h-full bg-[rgb(92,107,192)] rounded-full" style={{width: '0%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-[rgb(92,107,192)]">Memory</span>
                                        <span className="text-sm font-medium text-[rgb(159,168,218)]">-</span>
                                    </div>
                                    <div className="h-2 bg-[rgb(232,234,246)] rounded-full overflow-hidden">
                                        <div className="h-full bg-[rgb(121,134,203)] rounded-full" style={{width: '0%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Recent Activity</h3>
                            <div className="text-center py-8 text-sm text-[rgb(159,168,218)]">
                                No activity yet
                            </div>
                        </Card>
                    </div>
                )}
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
                {activeTab === 'settings' && (
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-[rgb(92,107,192)] mb-1">Settings</h1>
                            <p className="text-sm text-[rgb(121,134,203)]">Configure your deployment</p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <Card>
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Environment variables</h3>
                                <div className="flex gap-2">
                                    <Input variant="mono" placeholder="KEY" className="flex-1" />
                                    <Input variant="mono" placeholder="VALUE" className="flex-1" />
                                    <Button variant="secondary">Add</Button>
                                </div>
                            </Card>
                            <Card>
                                <h3 className="font-medium text-[rgb(92,107,192)] text-sm mb-4">Custom domain</h3>
                                <div className="flex gap-2">
                                    <Input placeholder="yourdomain.com" className="flex-1" />
                                    <Button variant="primary">Add</Button>
                                </div>
                                <p className="text-xs text-[rgb(159,168,218)] mt-2">Point CNAME to faylo-proxy.com</p>
                            </Card>
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