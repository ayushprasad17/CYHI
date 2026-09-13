import { useState } from 'react';
import { GradCapIcon } from './Icons.jsx';

export default function Login({ onLogin, showToast }) {
  const [email, setEmail] = useState('admin@university.edu');
  const [password, setPassword] = useState('demo1234');
  const [showPw, setShowPw] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Demo mode — any email & password signs you in, matching the original.
    onLogin();
  }

  return (
    <div id="login-screen">
      <div className="login-card">
        <div className="brand-mark">
          <GradCapIcon stroke="#fff" width={28} height={28} />
        </div>
        <h1>Student Information Hub</h1>
        <p className="sub">Admin Portal</p>
        <div className="login-panel">
          <h2>Sign in to your account</h2>
          <p className="desc">Manage campus information and services</p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="login-email">Email address</label>
              <input
                type="email"
                id="login-email"
                placeholder="admin@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="login-pass">Password</label>
              <div className="pw-wrap">
                <input
                  type={showPw ? 'text' : 'password'}
                  id="login-pass"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPw((s) => !s)}>
                  {showPw ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>
            <div className="row-between">
              <label className="remember"><input type="checkbox" /> Remember me</label>
              <button
                type="button"
                className="link-btn"
                onClick={() => showToast('Password reset link sent (demo)')}
              >
                Forgot password?
              </button>
            </div>
            <button type="submit" className="btn-primary">Sign in</button>
          </form>
          <div className="login-hint">Demo mode — any email &amp; password will sign you in.</div>
        </div>
        <p className="login-foot">© 2026 University of Technology · Student Information Hub</p>
      </div>
    </div>
  );
}
