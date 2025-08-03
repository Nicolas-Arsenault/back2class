'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

function Page() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    if (!email) {
      setMessage({ type: 'error', text: 'Veuillez entrer votre adresse email.' });
      setIsLoading(false);
      return;
    }
    
    if(email.indexOf('@') == -1) {
      setMessage({ type: 'error', text: 'Veuillez entrer une adresse email valide.' });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Email de réinitialisation envoyé. Vérifiez votre boîte de réception.' });
      setEmail('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Réinitialiser le mot de passe</h1>
          <p className="text-gray-600">Entrez votre adresse email pour recevoir un lien de réinitialisation</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleReset} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                placeholder="votre@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
            </button>

            {/* Message */}
            {message && (
              <div className={`rounded-lg p-4 ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${
                  message.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {message.text}
                </p>
              </div>
            )}

            {/* Links */}
            <div className='space-y-3 text-center'>
              <a 
                href='/login' 
                className="block text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                Retour à la connexion
              </a>
              <a 
                href='/register' 
                className="block text-gray-600 hover:text-green-600 transition-colors duration-200"
              >
                Créer un nouveau compte
              </a>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export default Page;
