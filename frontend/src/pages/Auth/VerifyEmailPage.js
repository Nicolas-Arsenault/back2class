import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import EmailInput from '../../components/Auth/EmailInput';
import AuthButton from '../../components/Auth/AuthButton';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [message, setMessage] = useState('Vérification de votre email...');
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
          setMessage(data.message || 'Courriel vérifié avec succès !');
          setIsError(false);
          setShouldRedirect(true);
        } else {
          setMessage(data.message || 'Échec de la vérification.');
          setIsError(true);
        }
      } catch (err) {
        setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
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
        setResendMessage(data.message || 'Lien de vérification envoyé !');
      } else {
        setResendMessage(data.message || 'Impossible de renvoyer le lien de vérification.');
      }
    } catch (err) {
      setResendMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
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
          <p>Vous allez être redirigé vers la page de connexion dans {countdown} seconde{countdown !== 1 ? 's' : ''}.</p>
        )}

        {isError && (
          <div className="mt-6 text-left">
            <p className="mb-2 text-sm text-gray-600">
              Vous n'avez pas reçu le courriel ? Entrez votre adresse e-mail pour renvoyer le lien de vérification :
            </p>

            <EmailInput
              text="Email"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
            />

            <div className="mt-2 flex flex-col">
              <AuthButton text={isResending ? 'Envoi en cours...' : 'Renvoyer le lien'} onClick={handleResend} />
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
