'use client';

import React, { useState } from 'react';
import { signup } from '../login/actions';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function register() {
  const [error,setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeated, setShowRepeated] = useState(false);
  const [success,setSuccess] = useState<string|null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);

    const result = await signup(formData);

    if(result?.error){
      setError(result.error);
    }

    if(result?.success)
    {
      setSuccess(result.success);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Inscription</h1>
          <p className="text-gray-600">Créez votre compte Back2Class</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input 
                id="username"
                name="username" 
                type="text" 
                placeholder="Votre nom d'utilisateur" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input 
                id="email"
                name="email" 
                type="email" 
                placeholder="votre@email.com" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeSlashIcon className='h-5 w-5' />
                  ) : (
                    <EyeIcon className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Repeat Password Field */}
            <div>
              <label htmlFor="repeatedPass" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="repeatedPass"
                  name="repeatedPass"
                  type={showRepeated ? 'text' : 'password'}
                  placeholder="Répétez votre mot de passe"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowRepeated((prev) => !prev)}
                  aria-label="Toggle repeated password visibility"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                >
                  {showRepeated ? (
                    <EyeSlashIcon className='h-5 w-5' />
                  ) : (
                    <EyeIcon className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              S'inscrire
            </button>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Links */}
            <div className='space-y-3 text-center'>
              <a 
                href='/login' 
                className="block text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                Vous avez déjà un compte? Cliquez ici.
              </a>
              <a 
                href='/reset-password' 
                className="block text-gray-600 hover:text-green-600 transition-colors duration-200"
              >
                Oublié votre mot de passe?
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
