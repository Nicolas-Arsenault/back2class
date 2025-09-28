import React, { useState } from 'react';
import AuthCard from '../../components/Auth/AuthCard';
import NotLoggedInHeader from '../../components/NotLoggedInHeader';
import EmailInput from '../../components/Auth/EmailInput';
import AuthButton from '../../components/Auth/AuthButton';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/auth/recover-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage(data.message || 'If this email exists, a reset link will be sent.');
      } else if (res.status === 429) { // TOO_MANY_REQUESTS
        setIsError(true);
        setMessage(data.message || 'Please wait before requesting another reset link.');
      } else {
        setIsError(true);
        setMessage(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      setIsError(true);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen text-center'>
      <NotLoggedInHeader />
      <h2 className='font-bold text-2xl mt-10'>Forgot your password</h2>

      <AuthCard>
        <div className='flex flex-col gap-2'>
          <EmailInput value={email} onChange={e => setEmail(e.target.value)} />
          <AuthButton text={loading ? 'Sending...' : 'Email me a link'} onClick={handleSubmit} />
          {message && (
            <p className={`mt-3 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </AuthCard>

      <p className='mt-5'>
        Already have an account?{' '}
        <a href='/login' className='text-blue-600'>Sign in</a>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
