
'use client';
import React, { useState } from 'react';
import { login } from './actions';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout 
      title="Connexion"
      subtitle="Connectez-vous à votre compte Back2Class"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="email"
            type="email"
            label="Adresse email"
            placeholder="votre@email.com"
            required
          />

          <PasswordInput
            name="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            required
          />

          <Button 
            type="submit"
            className="w-full"
            size="lg" 
            disabled={isLoading}
            isLoading={isLoading}
          >
            Se connecter
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className='space-y-3 text-center'>
            <a 
              href={ROUTES.REGISTER}
              className="block text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              Vous n'avez pas de compte? Cliquez ici.
            </a>
            <a 
              href={ROUTES.RESET_PASSWORD}
              className="block text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Oublié votre mot de passe?
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Page;
