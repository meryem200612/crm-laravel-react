import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2';

const Login = () => {
  const [email, setEmail] = useState('admin@mjinformatique.dz');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-icon" style={{ margin: '0 auto 1rem' }}>MJ</div>
          <h1 className="auth-title">Connexion</h1>
          <p className="auth-subtitle">Accédez à votre espace MJ CRM</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-group">
              <span className="input-icon"><HiOutlineEnvelope /></span>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-group">
              <span className="input-icon"><HiOutlineLockClosed /></span>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.875rem; font-weight: 600; color: var(--text-muted); }
        .input-group { position: relative; }
        .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); display: flex; }
        .input-group input { width: 100%; padding: 0.75rem 0.75rem 0.75rem 2.5rem; border: 1px solid var(--border); border-radius: var(--radius-md); outline: none; transition: border-color 0.2s; }
        .input-group input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        .btn-block { width: 100%; justify-content: center; padding: 0.875rem; font-size: 1rem; }
        .alert { padding: 0.75rem 1rem; border-radius: var(--radius-md); margin-bottom: 1rem; font-size: 0.875rem; }
        .alert-danger { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
      `}} />
    </div>
  );
};

export default Login;
