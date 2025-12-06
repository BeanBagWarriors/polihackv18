import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ variant = 'default' }) => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('token');

    // Navbar pentru pagini publice (Welcome, SignIn, SignUp)
    if (variant === 'public') {
        return (
            <nav className="flex justify-between items-center px-8 py-5 max-w-6xl mx-auto">
                <Link to="/" className="text-xl font-semibold text-[rgb(92,107,192)]">
                    Faylo
                </Link>
                <div className="flex gap-6 items-center">
                    <Link 
                        to="/signin" 
                        className="text-sm text-[rgb(92,107,192)] font-medium hover:text-[rgb(121,134,203)] transition-colors"
                    >
                        Sign in
                    </Link>
                    <Link 
                        to="/signup" 
                        className="bg-[rgb(92,107,192)] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[rgb(121,134,203)] transition-all"
                    >
                        Get started
                    </Link>
                </div>
            </nav>
        );
    }

    // Navbar pentru pagini de auth (doar logo)
    if (variant === 'auth') {
        return (
            <nav className="flex justify-center items-center px-8 py-5">
                <Link to="/" className="text-xl font-semibold text-[rgb(92,107,192)]">
                    Faylo
                </Link>
            </nav>
        );
    }

    // Navbar pentru dashboard (user logat)
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-[rgb(197,202,233)]">
            <Link to="/home" className="text-xl font-semibold text-[rgb(92,107,192)]">
                Faylo
            </Link>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleLogout}
                    className="text-sm text-[rgb(121,134,203)] hover:text-[rgb(92,107,192)] transition-colors"
                >
                    Sign out
                </button>
                <div className="w-8 h-8 bg-[rgb(92,107,192)] rounded-full flex items-center justify-center text-white text-sm font-medium">
                    U
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
