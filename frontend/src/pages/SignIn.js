import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || data);
                setLoading(false);
                return;
            }

            console.log('Signin success:', data);
            
            // Salvează în localStorage
            localStorage.setItem('user', JSON.stringify(data));
            
            // Actualizează AuthContext
            dispatch({ type: 'LOGIN', payload: data });
            
            alert('Signin successful! Token: ' + data.token);
            setEmail('');
            setPassword('');

        } catch (err) {
            setError('Error connecting to server: ' + err.message);
            console.error('Signin error:', err);
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
 
export default SignIn;