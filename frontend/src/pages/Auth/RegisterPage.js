import React, { useState, useEffect } from 'react';
import NotLoggedInHeader from '../../components/NotLoggedInHeader';
import AuthCard from '../../components/Auth/AuthCard';
import EmailInput from '../../components/Auth/EmailInput';
import PasswordInput from '../../components/Auth/PasswordInput';
import AuthButton from '../../components/Auth/AuthButton';
import CityInput from '../../components/Auth/CityInput';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showResend, setShowResend] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password !== passwordConfirm) {
      setIsError(true);
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, city })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsError(false);
        setMessage(data.message);
        setShowResend(true);
        startCooldown();
      } else {
        setIsError(true);
        setMessage(data.message || "Échec de l'inscription.");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setMessage(data.message);
      setIsError(!data.success);
      if (data.success) {
        startCooldown();
      }
    } catch {
      setIsError(true);
      setMessage("Erreur lors de l'envoi du courriel de vérification.");
    }
  };

  const startCooldown = () => {
    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className='bg-gray-100 min-h-screen text-center'>
      <NotLoggedInHeader/>
      <h2 className='text-2xl mt-10 font-bold'>Créer un nouveau compte</h2>
      <AuthCard>
        <form onSubmit={handleSubmit} className='flex flex-col mb-5'>
          <EmailInput value={email} onChange={e => setEmail(e.target.value)} />
          <label className="text-left mb-2 font-medium">Nom d'utilisateur</label>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <CityInput value={city} onChange={e => setCity(e.target.value)} />
          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
          <PasswordInput
            text='Confirmer le mot de passe'
            placeholderText='Confirmer le mot de passe'
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />

          {message && (
            <div className={`mt-5 text-sm mb-4 rounded p-2 ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}

          <AuthButton text={loading ? "Signing up..." : "Sign up"} disabled={loading} />
        </form>

          {showResend && (
            <p className="text-sm mt-2">
              Didn't receive the verification email?{" "}
              <span
                onClick={cooldown === 0 ? handleResend : null}
                className={`underline cursor-pointer ${
                  cooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Click here to resend {cooldown > 0 ? `(${cooldown}s)` : ''}
              </span>
            </p>
          )}

        <a href='/forgot-password' className='text-blue-600 mt-5'>Forgot password?</a>
      </AuthCard>
      <p className='mt-5'>Already have an account? <a className='text-blue-600' href='/login'>Sign in</a></p>
    </div>
  );
}

export default RegisterPage;
