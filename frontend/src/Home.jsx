import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [u, setU] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(r => setU(r.data.user))
      .catch(() => setU(null));
  }, []);

  const lg = async () => {
    await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    setU(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {u ? (
          <>
            <h1 className="auth-title">Welcome, <span className="user-name">{u.name}</span></h1>
            <p className="auth-message">You're successfully logged in!</p>
            <button onClick={lg} className="auth-button logout-button">Logout</button>
          </>
        ) : (
          <>
            <h1 className="auth-title">Welcome to Our Platform</h1>
            <p className="auth-message">Please login or register to continue</p>
            <div className="auth-actions">
              <button onClick={() => navigate('/login')} className="auth-button login-button">Login</button>
              <button onClick={() => navigate('/register')} className="auth-button register-button">Register</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}