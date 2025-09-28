import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/Auth/AuthCard';
import NotLoggedInHeader from '../../components/NotLoggedInHeader';
import PasswordInput from '../../components/Auth/PasswordInput';
import AuthButton from '../../components/Auth/AuthButton';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing reset token.');
      setIsError(true);
    }
  }, [token]);

  const handleSubmit = async () => {
    if (!token) return;

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage(data.message || 'Password reset successful! Redirecting to login...');
        // Redirect after short delay
        setTimeout(() => navigate('/login'), 4000);
      } else {
        setIsError(true);
        setMessage(data.message || 'Failed to reset password.');
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
      <h2 className='font-bold text-2xl mt-10'>Reset your password</h2>

      <AuthCard>
        <div className='flex flex-col gap-2'>
          <PasswordInput
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholderText='New password'
          />
          <PasswordInput
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholderText='Confirm new password'
          />
          <AuthButton text={loading ? 'Resetting...' : 'Reset Password'} onClick={handleSubmit} />
          {message && (
            <p className={`mt-3 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          {!isError && message && message.toLowerCase().includes('successful') && (
            <p className="mt-2 text-blue-600 font-medium">Redirecting to login page...</p>
          )}

        </div>
      </AuthCard>
    </div>
  );
}

export default ResetPasswordPage;
