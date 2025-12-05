import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/signup')}>
                signup
            </button>
            <button onClick={() => navigate('/signin')}>
                signin
            </button>
        </div>
    );
}
 
export default HomePage;