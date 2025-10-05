import React, { useEffect, useState } from 'react';
import LoggedInNavBar from '../../components/LoggedInNavBar';

function ComptePage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showResend, setShowResend] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsername = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/profile/username', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erreur lors de la récupération du nom d’utilisateur');
        const text = await res.text();
        setUsername(text);
      } catch {
        setUsername('Erreur');
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, [token]);

  const handleEmailChange = async () => {
    if (!email) return;

    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/profile/email', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage(data.message || 'Email mis à jour. Veuillez vérifier votre boîte mail.');
        setShowResend(true);
        startCooldown();
      } else {
        setIsError(true);
        setMessage(data.message || "Erreur lors de la mise à jour de l'email.");
      }
    } catch {
      setIsError(true);
      setMessage("Erreur lors de la mise à jour de l'email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;

    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/profile/resend-update-verification', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(email),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage(data.message || 'Courriel de confirmation renvoyé.');
        startCooldown();
      } else if (res.status === 429) {
        setIsError(true);
        setMessage(data.message || 'Veuillez patienter avant de renvoyer un autre courriel.');
      } else {
        setIsError(true);
        setMessage(data.message || "Erreur lors de l'envoi du courriel.");
      }
    } catch {
      setIsError(true);
      setMessage("Erreur lors de l'envoi du courriel.");
    } finally {
      setLoading(false);
    }
  };

  const startCooldown = () => setCooldown(30);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    setDeleteMessage('');
    setDeleteError(false);

    try {
      const res = await fetch('/api/profile', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setDeleteMessage(data.message);
      setDeleteError(!data.success);

      if (data.success) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    } catch {
      setDeleteError(true);
      setDeleteMessage('Erreur lors de la suppression du compte.');
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNavBar />
      <main className="max-w-xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold text-center mb-8">Mon Profil</h1>

        <section className="mb-8">
          <p className="text-lg">
            <strong>Nom d'utilisateur :</strong>{' '}
            <span className="text-gray-700">{loading ? 'Chargement...' : username}</span>
          </p>
        </section>

        <section className="mb-8">
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
            Changer l'adresse email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Nouvel email"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            disabled={loading}
            aria-describedby="emailHelp"
          />
          <button
            onClick={handleEmailChange}
            disabled={loading || !email.trim()}
            className={`mt-4 w-full rounded-md py-2 font-semibold text-white transition-colors ${
              loading || !email.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {loading ? 'Chargement...' : 'Mettre à jour'}
          </button>

          {showResend && (
            <p id="emailHelp" className="mt-3 text-sm text-gray-600">
              Vous n'avez pas reçu le courriel de vérification ?{' '}
              <button
                onClick={handleResend}
                disabled={cooldown > 0}
                className={`underline text-emerald-600 hover:text-emerald-800 focus:outline-none ${
                  cooldown > 0 ? 'text-gray-400 cursor-not-allowed underline-offset-2' : ''
                }`}
                aria-disabled={cooldown > 0}
                aria-live="polite"
              >
                Cliquez ici pour renvoyer {cooldown > 0 && `(${cooldown}s)`}
              </button>
            </p>
          )}

          {message && (
            <p
              role="alert"
              className={`mt-4 text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}
            >
              {message}
            </p>
          )}
        </section>

        <hr className="my-10 border-gray-300" />

        <section>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleteLoading}
            className={`w-full rounded-md py-2 font-semibold text-white transition-colors ${
              deleteLoading
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            }`}
            aria-expanded={showDeleteConfirm}
            aria-controls="deleteConfirmDialog"
          >
            {deleteLoading ? 'Suppression...' : 'Supprimer mon compte'}
          </button>

          {showDeleteConfirm && (
            <div
              id="deleteConfirmDialog"
              className="mt-6 p-6 max-w-md mx-auto bg-red-50 border border-red-600 rounded shadow"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="deleteConfirmTitle"
              aria-describedby="deleteConfirmDesc"
            >
              <h2
                id="deleteConfirmTitle"
                className="text-xl font-semibold text-red-700 mb-4"
              >
                Êtes-vous sûr de vouloir supprimer votre compte ?
              </h2>
              <p
                id="deleteConfirmDesc"
                className="mb-6 text-red-700"
              >
                Cette action est irréversible.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="rounded-md bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {deleteLoading ? 'Suppression...' : 'Confirmer'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleteLoading}
                  className="rounded-md bg-gray-300 px-5 py-2 font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {deleteMessage && (
            <p
              role="alert"
              className={`mt-6 text-center text-sm font-medium ${
                deleteError ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {deleteMessage}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default ComptePage;
