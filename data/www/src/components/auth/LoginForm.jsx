import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../../services/auth';
import { Link } from 'react-router-dom';
import { verifyCode } from '../../services/auth';
import '../../styles/Auth.css';
import { GoldButton } from '../common/Button';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [geslo, setGeslo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await loginService({ email, geslo });
      
      if (response.success) {
        setUserId(response.user_id);
        setStep(2);
        
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
  const handleCodeSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await verifyCode(code, userId);
      if (res.success){
        login(res.user)
        setLoading(false)
        navigate('/dashboard');
      } 
    } catch (error) {
      console.error('Code verification failed:', error);
      setError(error.response?.data?.message || 'Napačna koda');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>Prijava</h2>
        {step === 1 ? (
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
        </form>) : (
        <div className="auth-form">
          <p style={{ fontSize: '1rem', textAlign: 'center' }}>Na vaš email je bila poslana koda za prijavo.</p>
          <input
            type="text"
            placeholder="Vnesite kodo"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <GoldButton onClick={handleCodeSubmit} disabled={loading}>
            {loading ? 'Preverjanje kode...' : 'Potrdi kodo'}
          </GoldButton>
        </div>)}

        
        <div className="auth-link">
          Nimate računa? <Link to="/register">Registrirajte se</Link>
        </div>
      </div>
    </div>
  );
}