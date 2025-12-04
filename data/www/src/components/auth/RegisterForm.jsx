import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { register as registerService } from '../../services/auth';
import '../../styles/Auth.css';

export default function RegisterForm() {
    const [ime, setIme] = useState('');
    const [priimek, setPriimek] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (password !== confirmPassword) {
                setError('Gesli se ne ujemata');
                setLoading(false);
                return;
            }
            const response = await registerService({ ime, priimek, email, geslo: password });
            
            if (response.success) {
                login(response.user);
                navigate('/');
            } else {
                setError(response.message || 'Napaka pri registraciji');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.response?.data?.message || 'Napaka pri registraciji');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2>Registracija</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-message">{error}</div>}

                    <input
                        type="text"
                        placeholder="Ime"
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Priimek"
                        value={priimek}
                        onChange={(e) => setPriimek(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Geslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Potrdi geslo"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registracija...' : 'Registriraj se'}
                    </button>
                </form>
                
                <div className="auth-link">
                    Že imate račun? <Link to="/login">Prijavite se</Link>
                </div>
            </div>
        </div>
    );
}