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
    
    // GCP Instance Configuration
    const [gcpInstanceId, setGcpInstanceId] = useState('');
    const [gcpInstance, setGcpInstance] = useState('');
    const [dockerImage, setDockerImage] = useState('');
    const [dns, setDns] = useState('');
    const [publicIp, setPublicIp] = useState('');
    const [port, setPort] = useState('');
    
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployStatus, setDeployStatus] = useState('');
    const [deployMethod, setDeployMethod] = useState(null); // 'ghcr' or 'dockerfile'
    
    // User instances for Control Panel
    const [instances, setInstances] = useState([]);
    const [showAddInstance, setShowAddInstance] = useState(false);
    const [newInstanceDns, setNewInstanceDns] = useState('');
    const [newInstanceIp, setNewInstanceIp] = useState('');

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
        if (!ghcrUsername || !dockerImage) {
            alert('Please fill in all GHCR details');
            return;
        }
        if (!publicIp) {
            alert('Please fill in the public IP address');
            return;
        }

        setIsDeploying(true);
        setDeployStatus('Starting deployment...');

        const portMapping = port ? `-p ${port}:${port}` : '-p 3000:3000 -p 4000:4000';

        const deployScript = `
            sudo docker pull ghcr.io/${ghcrUsername}/${dockerImage}:${ghcrTag}

            sudo docker stop ${dockerImage}-app 2>/dev/null || true
            sudo docker rm ${dockerImage}-app 2>/dev/null || true

            sudo docker run -d \\
            --name ${dockerImage}-app \\
            ${portMapping} \\
            --restart unless-stopped \\
            ghcr.io/${ghcrUsername}/${dockerImage}:${ghcrTag}

            echo "DONE"
            `;

        const deployConfig = {
            ghcr: {
                username: ghcrUsername,
                image: dockerImage,
                tag: ghcrTag
            },
            gcp: {
                instanceId: gcpInstanceId,
                instance: gcpInstance
            },
            network: {
                publicIp: publicIp,
                dns: dns,
                port: port
            },
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
            
            {/* Plan Status Banner */}
            <div className="bg-[rgb(248,249,252)] border-b border-[rgb(197,202,233)] px-8 py-3">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-[rgb(159,168,218)]">Current Plan:</span>
                        <span className="text-sm font-semibold text-[rgb(92,107,192)] bg-white px-3 py-1 rounded-full border border-[rgb(197,202,233)]">
                            Custom Quote Pending
                        </span>
                    </div>
                    <a href="mailto:sales@faylo.io" className="text-sm text-[rgb(92,107,192)] hover:underline">
                        Contact Sales
                    </a>
                </div>
            </div>
            
            <div className="p-8 max-w-6xl mx-auto">
                {activeTab === 'upload' && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-[rgb(92,107,192)] mb-2">Deploy</h1>
                            <p className="text-lg text-[rgb(121,134,203)]">Choose your deployment method and configure your cloud instance</p>
                        </div>

                        {/* Step 1: Choose deployment method */}
                        {!deployMethod && (
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <Card 
                                    className="cursor-pointer hover:border-[rgb(92,107,192)] transition-all"
                                    onClick={() => setDeployMethod('ghcr')}
                                >
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-[rgb(36,41,46)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[rgb(92,107,192)] mb-3">GitHub Container Registry</h3>
                                        <p className="text-base text-[rgb(159,168,218)]">Pull an existing image from GHCR</p>
                                    </div>
                                </Card>
                                <Card 
                                    className="cursor-pointer hover:border-[rgb(92,107,192)] transition-all"
                                    onClick={() => setDeployMethod('dockerfile')}
                                >
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-[rgb(0,133,202)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.93 0h2.118a.185.185 0 00.186-.185V9.006a.186.186 0 00-.186-.186H.186a.185.185 0 00-.186.185v1.888c0 .102.084.185.186.185M24 11.2c0 2.28-.732 3.5-2.199 3.5H2.199C.732 14.7 0 13.48 0 11.2c0-2.28.732-3.5 2.199-3.5H21.8c1.468 0 2.2 1.22 2.2 3.5"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[rgb(92,107,192)] mb-3">Upload Zip with Dockerfile</h3>
                                        <p className="text-base text-[rgb(159,168,218)]">Build from a Dockerfile</p>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Step 2: Show selected method config */}
                        {deployMethod && (
                            <>
                                {/* Back button */}
                                <Button 
                                    variant="ghost" 
                                    className="mb-4"
                                    onClick={() => {
                                        setDeployMethod(null);
                                        setUploadedFile(null);
                                        setGhcrUsername('');
                                        setGhcrTag('latest');
                                        setGcpInstanceId('');
                                        setGcpInstance('');
                                        setDockerImage('');
                                        setDns('');
                                        setPublicIp('');
                                        setPort('');
                                    }}
                                >
                                    ← Change method
                                </Button>

                                {/* GHCR Configuration */}
                                {deployMethod === 'ghcr' && (
                                    <Card className="mb-6">
                                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgb(197,202,233)]">
                                            <div className="w-8 h-8 bg-[rgb(36,41,46)] rounded flex items-center justify-center text-white">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-[rgb(92,107,192)]">Deployment Configuration</h3>
                                        </div>

                                        {/* Public Image Requirement Notice */}
                                        <div className="mb-6 p-3 bg-[rgb(232,234,246)] rounded-lg border border-[rgb(197,202,233)]">
                                            <p className="text-sm text-[rgb(92,107,192)] flex items-center gap-2">
                                                <svg className="w-4 h-4 text-[rgb(92,107,192)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span><span className="font-semibold">Note:</span> The Docker image must be <span className="font-semibold">public</span></span>
                                            </p>
                                        </div>
                                        
                                        {/* GHCR Credentials */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-[rgb(121,134,203)] mb-3 uppercase tracking-wide">GHCR Image</h4>
                                            <Input
                                                label="GHCR Username"
                                                placeholder="e.g., 00alexo"
                                                value={ghcrUsername}
                                                onChange={(e) => setGhcrUsername(e.target.value)}
                                            />
                                        </div>

                                        {/* Google Cloud Configuration */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-[rgb(121,134,203)] mb-3 uppercase tracking-wide">Google Cloud</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    label="Instance ID"
                                                    placeholder="e.g., 1234567890123456789"
                                                    value={gcpInstanceId}
                                                    onChange={(e) => setGcpInstanceId(e.target.value)}
                                                />
                                                <Input
                                                    label="Instance Name"
                                                    placeholder="e.g., vm-instance-1"
                                                    value={gcpInstance}
                                                    onChange={(e) => setGcpInstance(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Docker Configuration */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-[rgb(121,134,203)] mb-3 uppercase tracking-wide">Docker Image</h4>
                                            <div className="grid grid-cols-3 gap-4">
                                                <Input
                                                    label="Image Name"
                                                    placeholder="e.g., infobase"
                                                    value={dockerImage}
                                                    onChange={(e) => setDockerImage(e.target.value)}
                                                />
                                                <Input
                                                    label="Tag"
                                                    placeholder="e.g., latest"
                                                    value={ghcrTag}
                                                    onChange={(e) => setGhcrTag(e.target.value)}
                                                />
                                                <Input
                                                    label="Port"
                                                    placeholder="e.g., 3000 (optional)"
                                                    value={port}
                                                    onChange={(e) => setPort(e.target.value)}
                                                />
                                            </div>
                                            <p className="text-xs text-[rgb(159,168,218)] mt-2">
                                                Image: ghcr.io/{ghcrUsername || 'username'}/{dockerImage || 'image'}:{ghcrTag || 'latest'}
                                            </p>
                                        </div>

                                        {/* Network Configuration */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-[rgb(121,134,203)] mb-3 uppercase tracking-wide">Network</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    label="Public IP"
                                                    placeholder="e.g., 34.76.123.45"
                                                    value={publicIp}
                                                    onChange={(e) => setPublicIp(e.target.value)}
                                                />
                                                <Input
                                                    label="DNS (optional)"
                                                    placeholder="e.g., app.example.com"
                                                    value={dns}
                                                    onChange={(e) => setDns(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {/* Dockerfile Upload */}
                                {deployMethod === 'dockerfile' && (
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
                                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
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
                                                    <svg className="w-6 h-6 text-[rgb(121,134,203)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </div>
                                                <p className="font-medium text-[rgb(92,107,192)] mb-1">Drop your Dockerfile here</p>
                                                <p className="text-sm text-[rgb(159,168,218)]">or click to browse</p>
                                            </div>
                                        )}
                                    </Card>
                                )}

                                {deployStatus && (
                                    <div className={`mb-4 p-4 rounded-lg ${isDeploying ? 'bg-[rgb(232,234,246)]' : 'bg-green-100'}`}>
                                        <p className={`text-sm font-medium flex items-center gap-2 ${isDeploying ? 'text-[rgb(92,107,192)]' : 'text-green-700'}`}>
                                            {isDeploying && (
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )}
                                            {deployStatus}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1"
                                        onClick={handleDeploy}
                                        disabled={isDeploying || (deployMethod === 'ghcr' && (!ghcrUsername || !dockerImage || !publicIp)) || (deployMethod === 'dockerfile' && !uploadedFile)}
                                    >
                                        {isDeploying ? 'Deploying...' : 'Deploy to Cloud'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setGhcrUsername('');
                                            setGhcrTag('latest');
                                            setDeployStatus('');
                                            setGcpInstanceId('');
                                            setGcpInstance('');
                                            setDockerImage('');
                                            setDns('');
                                            setPublicIp('');
                                            setPort('');
                                            setUploadedFile(null);
                                        }}
                                        disabled={isDeploying}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                )}
                {activeTab === 'dashboard' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-4xl font-bold text-[rgb(92,107,192)] mb-2">Control Panel</h1>
                                <p className="text-lg text-[rgb(121,134,203)]">Manage your cloud instances</p>
                            </div>
                            <div className="flex items-center gap-2 text-base">
                                <span className="text-[rgb(159,168,218)] font-medium">{instances.length} instance{instances.length !== 1 ? 's' : ''}</span>
                            </div>
                        </div>

                        {/* Instances List */}
                        <div className="flex flex-col gap-5 mb-8">
                            {instances.length === 0 ? (
                                <Card className="text-center py-16">
                                    <div className="w-20 h-20 bg-[rgb(232,234,246)] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-[rgb(159,168,218)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[rgb(92,107,192)] mb-3">No instances yet</h3>
                                    <p className="text-base text-[rgb(159,168,218)] mb-4">Add your first cloud instance to get started</p>
                                </Card>
                            ) : (
                                instances.map((instance, index) => (
                                    <Card key={index} className="hover:border-[rgb(121,134,203)] transition-all p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                    instance.status === 'online' 
                                                        ? 'bg-green-100' 
                                                        : instance.status === 'aws-failover'
                                                            ? 'bg-orange-100'
                                                            : 'bg-red-100'
                                                }`}>
                                                    <div className={`w-4 h-4 rounded-full ${
                                                        instance.status === 'online' 
                                                            ? 'bg-green-500' 
                                                            : instance.status === 'aws-failover'
                                                                ? 'bg-orange-500'
                                                                : 'bg-red-500'
                                                    }`}></div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                                            instance.status === 'online'
                                                                ? 'bg-green-100 text-green-700'
                                                                : instance.status === 'aws-failover'
                                                                    ? 'bg-orange-100 text-orange-700'
                                                                    : 'bg-red-100 text-red-700'
                                                        }`}>
                                                            {instance.status === 'online' 
                                                                ? 'Online' 
                                                                : instance.status === 'aws-failover'
                                                                    ? 'Running on AWS'
                                                                    : 'Offline'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-8 text-base">
                                                        <div>
                                                            <span className="text-[rgb(159,168,218)]">DNS: </span>
                                                            <span className="font-mono text-[rgb(92,107,192)] font-medium">{instance.dns || '-'}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-[rgb(159,168,218)]">Public IP: </span>
                                                            <span className="font-mono text-[rgb(92,107,192)] font-medium">{instance.publicIp || '-'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    className="text-red-500 hover:bg-red-50 p-2"
                                                    onClick={() => {
                                                        setInstances(instances.filter((_, i) => i !== index));
                                                    }}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>

                        {/* Add New Instance */}
                        {!showAddInstance ? (
                            <Button 
                                variant="outline" 
                                className="w-full py-5 border-dashed flex items-center justify-center gap-3 text-lg"
                                onClick={() => setShowAddInstance(true)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Instance
                            </Button>
                        ) : (
                            <Card className="p-8">
                                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[rgb(197,202,233)]">
                                    <div className="w-10 h-10 bg-[rgb(92,107,192)] rounded-xl flex items-center justify-center text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[rgb(92,107,192)]">Add New Instance</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mb-6">
                                    <Input
                                        label="DNS"
                                        placeholder="e.g., app.example.com"
                                        value={newInstanceDns}
                                        onChange={(e) => setNewInstanceDns(e.target.value)}
                                    />
                                    <Input
                                        label="Public IP"
                                        placeholder="e.g., 34.76.123.45"
                                        value={newInstanceIp}
                                        onChange={(e) => setNewInstanceIp(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        className="px-6 py-3"
                                        onClick={() => {
                                            if (newInstanceIp) {
                                                setInstances([...instances, {
                                                    status: 'offline',
                                                    dns: newInstanceDns,
                                                    publicIp: newInstanceIp
                                                }]);
                                                setNewInstanceDns('');
                                                setNewInstanceIp('');
                                                setShowAddInstance(false);
                                            }
                                        }}
                                        disabled={!newInstanceIp}
                                    >
                                        Add Instance
                                    </Button>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => {
                                            setShowAddInstance(false);
                                            setNewInstanceDns('');
                                            setNewInstanceIp('');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </div>
                )}
                {activeTab === 'logs' && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-[rgb(92,107,192)] mb-2">Logs</h1>
                            <p className="text-lg text-[rgb(121,134,203)]">Container logs and events</p>
                        </div>
                        <Card variant="dark" className="font-mono text-base">
                            <div className="flex gap-3 mb-5 pb-4 border-b border-[rgb(55,55,55)]">
                                <button className="text-white bg-[rgb(55,55,55)] px-4 py-2 rounded-lg border-none text-sm font-medium cursor-pointer">AWS</button>
                                <button className="text-gray-500 bg-transparent px-4 py-2 rounded-lg border-none text-sm font-medium cursor-pointer hover:text-gray-400">GCP</button>
                            </div>
                            <div className="h-96 flex items-center justify-center text-gray-500 text-lg">
                                No logs available
                            </div>
                        </Card>
                    </div>
                )}
                {activeTab === 'settings' && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-[rgb(92,107,192)] mb-2">Settings</h1>
                            <p className="text-lg text-[rgb(121,134,203)]">Configure your deployment</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <Card className="p-6">
                                <h3 className="font-semibold text-[rgb(92,107,192)] text-lg mb-5">Environment variables</h3>
                                <div className="flex gap-3">
                                    <Input variant="mono" placeholder="KEY" className="flex-1" />
                                    <Input variant="mono" placeholder="VALUE" className="flex-1" />
                                    <Button variant="secondary">Add</Button>
                                </div>
                            </Card>
                            <Card className="p-6">
                                <h3 className="font-semibold text-[rgb(92,107,192)] text-lg mb-5">Custom domain</h3>
                                <div className="flex gap-3">
                                    <Input placeholder="yourdomain.com" className="flex-1" />
                                    <Button variant="primary">Add</Button>
                                </div>
                                <p className="text-sm text-[rgb(159,168,218)] mt-3">Point CNAME to faylo-proxy.com</p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="font-semibold text-[rgb(92,107,192)] text-lg mb-5">Monitoring</h3>
                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-base text-[rgb(92,107,192)] font-medium">Ping interval</p>
                                            <p className="text-sm text-[rgb(159,168,218)]">How often we check your service</p>
                                        </div>
                                        <select className="p-3 text-base border border-[rgb(179,186,227)] rounded-xl outline-none">
                                            <option value="10">10 seconds</option>
                                            <option value="30">30 seconds</option>
                                            <option value="60">1 minute</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-base text-[rgb(92,107,192)] font-medium">Health endpoint</p>
                                            <p className="text-sm text-[rgb(159,168,218)]">Path to check</p>
                                        </div>
                                        <Input variant="mono" placeholder="/health" className="w-32" />
                                    </div>
                                </div>
                            </Card>
                            <Card variant="danger" className="p-6">
                                <h3 className="font-semibold text-red-600 text-lg mb-5">Danger zone</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-base text-[rgb(92,107,192)] font-medium">Delete deployment</p>
                                        <p className="text-sm text-[rgb(159,168,218)]">Remove containers from all clouds</p>
                                    </div>
                                    <Button variant="danger">Delete</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
            {showHelp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="p-8 max-w-xl w-full max-h-[85vh] overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[rgb(92,107,192)]">Help</h2>
                            <Button
                                variant="ghost"
                                onClick={() => setShowHelp(false)}
                                className="w-10 h-10 text-xl"
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