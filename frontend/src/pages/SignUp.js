import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, confirmPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || data);
                setLoading(false);
                return;
            }

            console.log('Signup success:', data);
            
            // Salvează în localStorage
            localStorage.setItem('user', JSON.stringify(data));
            
            // Actualizează AuthContext
            dispatch({ type: 'LOGIN', payload: data });
            
            alert('Signup successful! Token: ' + data.token);
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (err) {
            setError('Error connecting to server: ' + err.message);
            console.error('Signup error:', err);
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
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
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
 
export default SignUp;