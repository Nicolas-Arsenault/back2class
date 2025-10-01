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
        setMessage(data.message || 'Si le courriel existe, un lien de réinitialisation sera envoyé. (Vérifiez votre dossier de spam)');
      } else if (res.status === 429) { // TOO_MANY_REQUESTS
        setIsError(true);
        setMessage(data.message || 'Veuillez attendre avant de demander un autre lien de réinitialisation.');
      } else {
        setIsError(true);
        setMessage(data.message || "Échec de l'envoi du lien de réinitialisation.");
      }
    } catch (err) {
      setIsError(true);
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen text-center'>
      <NotLoggedInHeader />
      <h2 className='font-bold text-2xl mt-10'>Mot de passe oublié</h2>

      <AuthCard>
        <div className='flex flex-col gap-2'>
          <EmailInput value={email} onChange={e => setEmail(e.target.value)} />
          <AuthButton text={loading ? 'Envoi...' : 'Envoyer un lien par courriel'} onClick={handleSubmit} />
          {message && (
            <p className={`mt-3 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </AuthCard>

      <p className='mt-5'>
        Vous avez déjà un compte ?{' '}
        <a href='/login' className='text-blue-600'>Se connecter</a>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
