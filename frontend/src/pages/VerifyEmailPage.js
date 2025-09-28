import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import EmailInput from '../components/EmailInput';
import AuthButton from '../components/AuthButton';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [message, setMessage] = useState('Verifying your email...');
  const [isError, setIsError] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [resendEmail, setResendEmail] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token || hasVerified.current) return;

    const verifyEmail = async () => {
      hasVerified.current = true;
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message || 'Email verified successfully!');
          setIsError(false);
          setShouldRedirect(true);
        } else {
          setMessage(data.message || 'Verification failed.');
          setIsError(true);
        }
      } catch (err) {
        setMessage('Something went wrong. Please try again later.');
        setIsError(true);
      }
    };

    verifyEmail();
  }, [token]);

  useEffect(() => {
    if (!shouldRedirect) return;

    if (countdown === 0) {
      navigate('/login');
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, shouldRedirect, navigate]);

  const handleResend = async () => {
    if (!resendEmail) return;

    setIsResending(true);
    setResendMessage('');
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage(data.message || 'Verification link sent!');
      } else {
        setResendMessage(data.message || 'Could not resend verification link.');
      }
    } catch (err) {
      setResendMessage('Something went wrong. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4 text-center">
      <div className="p-6 bg-white rounded shadow-md max-w-md w-full">
        <h1 className={`text-xl font-semibold mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </h1>

        {!isError && shouldRedirect && (
          <p>You will be redirected to the login page in {countdown} second{countdown !== 1 ? 's' : ''}.</p>
        )}

        {isError && (
          <div className="mt-6 text-left">
            <p className="mb-2 text-sm text-gray-600">
              Didn’t get the email? Enter your email to resend the verification link:
            </p>

            <EmailInput
              text="Email"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
            />

            <div className="mt-2 flex flex-col">
              <AuthButton text={isResending ? 'Sending...' : 'Resend Link'} onClick={handleResend} />
            </div>

            {resendMessage && (
              <p className="mt-2 text-sm text-gray-700">{resendMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
