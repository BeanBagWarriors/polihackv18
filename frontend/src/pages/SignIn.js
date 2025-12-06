import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const gradient = 'linear-gradient(135deg, rgb(232,234,246) 0%, rgb(197,202,233) 100%)';
        document.documentElement.style.background = gradient;
        document.documentElement.style.minHeight = '100vh';
        document.body.style.background = gradient;
        document.body.style.minHeight = '100vh';
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.documentElement.style.background = '';
            document.documentElement.style.minHeight = '';
            document.body.style.background = '';
            document.body.style.minHeight = '';
            document.body.style.overflow = '';
        };
    }, []);

    const handleSignIn = (e) => {
        e.preventDefault();
        // Interface only - no backend
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(92,107,192,0.15)] p-12 w-full max-w-[440px] border border-[rgb(197,202,233)]">
                <div className="text-center mb-8">
                    <h2 className="text-[32px] font-bold text-[rgb(92,107,192)] mb-2">Welcome Back</h2>
                    <p className="text-base text-[rgb(121,134,203)] font-normal">Sign in to continue to your account</p>
                </div>
                
                <form onSubmit={handleSignIn} className="flex flex-col gap-5">
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3.5 text-base border-2 border-[rgb(159,168,218)] rounded-lg outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_3px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="p-3.5 text-base font-semibold text-white rounded-lg cursor-pointer transition-all duration-300 mt-2 bg-[rgb(92,107,192)] hover:bg-[rgb(121,134,203)] hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(92,107,192,0.25)] hover:shadow-[0_6px_16px_rgba(92,107,192,0.35)]"
                    >
                        Sign In
                    </button>
                </form>
                
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mt-4 border border-red-200">
                        {error}
                    </div>
                )}
                
                <div className="text-center mt-6 pt-6 border-t border-[rgb(197,202,233)]">
                    <p className="text-sm text-[rgb(121,134,203)] mb-2">Don't have an account?</p>
                    <Link 
                        to="/signup" 
                        className="text-[rgb(92,107,192)] no-underline font-semibold text-sm transition-colors duration-300 hover:text-[rgb(121,134,203)] hover:underline"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default SignIn;