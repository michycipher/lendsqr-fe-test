import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import { routePaths } from '../../routes/route-paths';
import '../../styles/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate(routePaths.dashboard.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="login-page__logo">
          <img src="/logo.svg" alt="Lendsqr" />
        </div>
        <div className="login-page__illustration">
          <img src="/login-illustration.svg" alt="Welcome" />
        </div>
      </div>
      <div className="login-page__right">
        <div className="login-page__form-container">
          <h1 className="login-page__heading">Welcome!</h1>
          <p className="login-page__subheading">Enter details to login.</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__group">
              <input
                type="email"
                className={`login-form__input ${error ? 'error' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="email-input"
              />
            </div>
            
            <div className="login-form__group">
              <div className="login-form__password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`login-form__input ${error ? 'error' : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="password-input"
                />
                <button
                  type="button"
                  className="login-form__show-password"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="toggle-password"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {error && <div className="login-form__error">{error}</div>}
            </div>
            
            <button
              type="button"
              className="login-form__forgot"
              onClick={() => alert('Password reset functionality')}
            >
              Forgot Password?
            </button>
            
            <button
              type="submit"
              className="login-form__submit"
              disabled={loading}
              data-testid="submit-button"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          <div style={{ marginTop: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', fontSize: '14px' }}>
            <strong>Test Credentials:</strong><br />
            Email: test@lendsqr.com<br />
            Password: password
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;