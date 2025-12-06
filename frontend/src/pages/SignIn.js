import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Input, Button } from '../components/ui';
import usePageBackground from '../hooks/usePageBackground';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    usePageBackground();

    const handleSignIn = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar variant="auth" />
            <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-brand-lg p-14 w-full max-w-[500px] border border-[rgb(197,202,233)]">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-bold text-[rgb(92,107,192)] mb-4">Welcome Back</h2>
                    <p className="text-lg text-[rgb(121,134,203)] font-medium">Sign in to continue to your account</p>
                </div>
                
                <form onSubmit={handleSignIn} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-base font-semibold text-[rgb(92,107,192)] mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-4 text-lg border-2 border-[rgb(159,168,218)] rounded-xl outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_4px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-base font-semibold text-[rgb(92,107,192)] mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-4 text-lg border-2 border-[rgb(159,168,218)] rounded-xl outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_4px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="p-4 text-lg font-semibold text-white rounded-xl cursor-pointer transition-all duration-300 mt-3 bg-[rgb(92,107,192)] hover:bg-[rgb(121,134,203)] hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(92,107,192,0.25)] hover:shadow-[0_8px_20px_rgba(92,107,192,0.35)]"
                    >
                        Sign In
                    </button>
                </form>
                
                {error && (
                    <div className="bg-red-100 text-red-600 p-4 rounded-xl text-base mt-5 border border-red-200">
                        {error}
                    </div>
                )}
                
                <div className="text-center mt-8 pt-8 border-t border-[rgb(197,202,233)]">
                    <p className="text-base text-[rgb(121,134,203)] mb-3">Don't have an account?</p>
                    <Link 
                        to="/signup" 
                        className="text-[rgb(92,107,192)] no-underline font-semibold text-lg transition-colors duration-300 hover:text-[rgb(121,134,203)] hover:underline"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
}
 
export default SignIn;