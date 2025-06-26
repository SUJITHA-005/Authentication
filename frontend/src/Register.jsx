import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Registering with data:', data);

    try {
      await axios.post(
        'https://authentication-dy3p.onrender.com/api/auth/register',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      navigate('/login');
    } catch (err) {
      console.error('Registration Error:', err.response);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handle} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              id="name"
              value={data.name}
              placeholder="Enter your full name" 
              onChange={e => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              value={data.email}
              placeholder="Enter your email" 
              onChange={e => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={data.password}
              placeholder="Create a password" 
              onChange={e => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="auth-link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
