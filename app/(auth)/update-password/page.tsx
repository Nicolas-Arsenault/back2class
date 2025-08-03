'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/ui/Button';
import { ROUTES, MESSAGES, AUTH } from '@/lib/constants';

function Page() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(ROUTES.LOGIN);
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    if (rePassword !== password) {
      setMessage({ type: 'error', text: MESSAGES.PASSWORDS_DONT_MATCH });
      setIsLoading(false);
      return;
    }

    if (password.length < AUTH.MIN_PASSWORD_LENGTH) {
      setMessage({ type: 'error', text: MESSAGES.PASSWORD_TOO_SHORT });
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage({ type: 'error', text: `Erreur lors de la mise à jour: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: `${MESSAGES.PASSWORD_UPDATE_SUCCESS} Redirection vers la connexion...` });
      setPassword('');
      setRePassword('');
      
      // Sign out the user and redirect to login after delay
      setTimeout(async () => {
        await supabase.auth.signOut();
        router.push(ROUTES.LOGIN);
      }, AUTH.PASSWORD_UPDATE_REDIRECT_DELAY);
    }
    
    setIsLoading(false);
  };

  return (
    <AuthLayout 
      title="Changer le mot de passe"
      subtitle="Entrez votre nouveau mot de passe"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordInput
            name="password"
            label="Nouveau mot de passe"
            placeholder="Votre nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <PasswordInput
            name="rePassword"
            label="Confirmer le nouveau mot de passe"
            placeholder="Répétez votre nouveau mot de passe"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            disabled={isLoading}
          />

          <Button 
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Mise à jour...' : 'Changer le mot de passe'}
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
              href={ROUTES.RESET_PASSWORD}
              className="block text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Réinitialiser le mot de passe
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Page;
