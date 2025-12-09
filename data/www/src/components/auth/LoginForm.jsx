import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../../services/auth';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [geslo, setGeslo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await loginService({ email, geslo });
      
      if (response.success) {
        login(response.user);
        navigate('/');
        
        // Close modal if onSuccess was provided
        if (onSuccess) {
          onSuccess();
        }
        
      } else {
        setError(response.message || 'Prijava ni uspela');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Napačen email ali geslo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>Prijava</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
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
            value={geslo}
            onChange={(e) => setGeslo(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Prijavljanje...' : 'Prijava'}
          </button>
        </form>
        
        <div className="auth-link">
          Nimate računa? <Link to="/register" onClick={onSuccess}>Registrirajte se</Link>
        </div>
      </div>
    </div>
  );
}