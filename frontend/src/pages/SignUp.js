import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Input, Button } from '../components/ui';
import usePageBackground from '../hooks/usePageBackground';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    usePageBackground();

    const handleSignUp = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar variant="auth" />
            <div className="flex-1 flex items-center justify-center p-5">
            <div className="bg-white rounded-2xl shadow-brand-lg p-12 w-full max-w-[440px] border border-[rgb(197,202,233)]">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-[rgb(92,107,192)] mb-3">Create Account</h2>
                    <p className="text-base text-[rgb(121,134,203)] font-medium">Sign up to get started</p>
                </div>
                
                <form onSubmit={handleSignUp} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[rgb(92,107,192)] mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3.5 text-base border-2 border-[rgb(159,168,218)] rounded-lg outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_3px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[rgb(92,107,192)] mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3.5 text-base border-2 border-[rgb(159,168,218)] rounded-lg outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_3px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[rgb(92,107,192)] mb-1">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="p-3.5 text-base border-2 border-[rgb(159,168,218)] rounded-lg outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_3px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="p-3.5 text-base font-semibold text-white rounded-lg cursor-pointer transition-all duration-300 mt-2 bg-[rgb(92,107,192)] hover:bg-[rgb(121,134,203)] hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(92,107,192,0.25)] hover:shadow-[0_6px_16px_rgba(92,107,192,0.35)]"
                    >
                        Sign Up
                    </button>
                </form>
                
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mt-4 border border-red-200">
                        {error}
                    </div>
                )}
                
                <div className="text-center mt-6 pt-6 border-t border-[rgb(197,202,233)]">
                    <p className="text-sm text-[rgb(121,134,203)] mb-2">Already have an account?</p>
                    <Link 
                        to="/signin" 
                        className="text-[rgb(92,107,192)] no-underline font-semibold text-sm transition-colors duration-300 hover:text-[rgb(121,134,203)] hover:underline"
                    >
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
}
 
export default SignUp;