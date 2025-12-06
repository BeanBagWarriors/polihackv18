import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import faylogo from '../assets/faylogo.png';

const Navbar = ({ variant = 'default' }) => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('token');

    if (variant === 'public') {
        return (
            <nav className="flex justify-between items-center px-8 py-0 max-w-7xl mx-auto">
                <Link to="/" className="hover:opacity-90 transition-all duration-200">
                    <img src={faylogo} alt="Faylo" className="h-16" />
                </Link>
                <div className="flex gap-8 items-center">
                    <Link 
                        to="/signin" 
                        className="text-sm text-[rgb(92,107,192)] font-medium hover:text-[rgb(121,134,203)] transition-colors duration-200"
                    >
                        Sign in
                    </Link>
                    <Link 
                        to="/signup" 
                        className="bg-[rgb(92,107,192)] text-white text-sm px-6 py-2.5 rounded-lg font-semibold hover:bg-[rgb(121,134,203)] hover:shadow-brand transition-all duration-200 active:scale-95"
                    >
                        Get started
                    </Link>
                </div>
            </nav>
        );
    }
    if (variant === 'auth') {
        return (
            <nav className="flex justify-center items-center px-8 py-6">
                <Link to="/" className="hover:opacity-90 transition-all duration-200">
                    <img src={faylogo} alt="Faylo" className="h-20" />
                </Link>
            </nav>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-[rgb(197,202,233)] shadow-md">
            <Link to="/home" className="hover:opacity-90 transition-all duration-200">
                <img src={faylogo} alt="Faylo" className="h-12" />
            </Link>
            <div className="flex items-center gap-6">
                <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-[rgb(121,134,203)] hover:text-[rgb(92,107,192)] transition-colors duration-200"
                >
                    Sign out
                </button>
                <div className="w-9 h-9 bg-gradient-to-br from-[rgb(121,134,203)] to-[rgb(92,107,192)] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-brand">
                    U
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
