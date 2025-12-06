import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Input, Button } from '../components/ui';
import usePageBackground from '../hooks/usePageBackground';
import { useAuthContext } from '../hooks/useAuthContext';

const SignUp = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    usePageBackground();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:4000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data);
                setIsLoading(false);
                return;
            }

            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: data });

            setIsLoading(false);
            navigate('/payment');
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar variant="auth" />
            <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-brand-lg p-14 w-full max-w-[500px] border border-[rgb(197,202,233)]">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-bold text-[rgb(92,107,192)] mb-4">Create Account</h2>
                    <p className="text-lg text-[rgb(121,134,203)] font-medium">Sign up to get started</p>
                </div>
                
                <form onSubmit={handleSignUp} className="flex flex-col gap-6">
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-4 text-lg border-2 border-[rgb(159,168,218)] rounded-xl outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_4px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-base font-semibold text-[rgb(92,107,192)] mb-1">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="p-4 text-lg border-2 border-[rgb(159,168,218)] rounded-xl outline-none transition-all duration-300 bg-white text-[rgb(92,107,192)] focus:border-[rgb(121,134,203)] focus:shadow-[0_0_0_4px_rgba(121,134,203,0.1)]"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`p-4 text-lg font-semibold text-white rounded-xl cursor-pointer transition-all duration-300 mt-3 flex items-center justify-center gap-2 ${
                            isLoading 
                                ? 'bg-[rgb(159,168,218)] cursor-not-allowed' 
                                : 'bg-[rgb(92,107,192)] hover:bg-[rgb(121,134,203)] hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(92,107,192,0.25)] hover:shadow-[0_8px_20px_rgba(92,107,192,0.35)]'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
                
                {error && (
                    <div className="bg-red-100 text-red-600 p-4 rounded-xl text-base mt-5 border border-red-200">
                        {error}
                    </div>
                )}
                
                <div className="text-center mt-8 pt-8 border-t border-[rgb(197,202,233)]">
                    <p className="text-base text-[rgb(121,134,203)] mb-3">Already have an account?</p>
                    <Link 
                        to="/signin" 
                        className="text-[rgb(92,107,192)] no-underline font-semibold text-lg transition-colors duration-300 hover:text-[rgb(121,134,203)] hover:underline"
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