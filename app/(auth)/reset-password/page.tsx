'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { ROUTES, MESSAGES } from '@/lib/constants';

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
      setMessage({ type: 'error', text: MESSAGES.INVALID_EMAIL });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: MESSAGES.EMAIL_SENT });
      setEmail('');
    }
    
    setIsLoading(false);
  };

  return (
    <AuthLayout 
      title="Réinitialiser le mot de passe"
      subtitle="Entrez votre adresse email pour recevoir un lien de réinitialisation"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleReset} className="space-y-6">
          <Input
            id="email"
            placeholder="votre@email.com"
            type="email"
            label="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <Button 
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
          </Button>

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

          <div className='space-y-3 text-center'>
            <a 
              href={ROUTES.LOGIN}
              className="block text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              Retour à la connexion
            </a>
            <a 
              href={ROUTES.REGISTER}
              className="block text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Créer un nouveau compte
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Page;
