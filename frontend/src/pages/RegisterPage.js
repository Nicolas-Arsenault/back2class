import React, { useState } from 'react';
import NotLoggedInHeader from '../components/NotLoggedInHeader';
import AuthCard from '../components/AuthCard';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import AuthButton from '../components/AuthButton';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState(null); // string or null
  const [isError, setIsError] = useState(false); // true if error, false if success
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage(null);

    if (password !== passwordConfirm) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsError(false);
        setMessage(data.message);
        // Optionally clear form or redirect
      } else {
        setIsError(true);
        setMessage(data.message || 'Signup failed.');
      }
    } catch (err) {
      setIsError(true);
      setMessage('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className='bg-gray-100 min-h-screen text-center'>
      <NotLoggedInHeader/>
      <h2 className='text-2xl mt-10 font-bold'>Create a new account</h2>
      <AuthCard>
        <form onSubmit={handleSubmit} className='flex flex-col mb-5'>
          <EmailInput value={email} onChange={e => setEmail(e.target.value)} />
          
          <label className="text-left mb-2 font-medium">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
          <PasswordInput
            text='Re-type Password'
            placeholderText='Re-type password'
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />

          {message && (
          <div
            className={`mt-5 text-sm mb-4 rounded p-2 ${
              isError === true
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

          <AuthButton text={loading ? "Signing up..." : "Sign up"} disabled={loading} />
        </form>
        <a href='/forgot-password' className='text-blue-600 mt-5'>Forgot password?</a>
      </AuthCard>
      <p className='mt-5'>Already have an account? <a className='text-blue-600' href='/login'>Sign in</a></p>
    </div>
  );
}

export default RegisterPage;
