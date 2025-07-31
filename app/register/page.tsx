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
    <form onSubmit={handleSubmit}>
      
      <input name="email" type="text" placeholder="email" required />
      
      <div>
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="mot de passe"
          required
        />
        <button
        
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeSlashIcon className='h-5 w-5 text-gray-500'></EyeSlashIcon>
          ) : (<EyeIcon className='h-5 w-5 text-gray-500'></EyeIcon>)} {/* Replace with real icon if needed */}
        </button>
      </div>

      <div>
        <input
          name="repeatedPass"
          type={showRepeated ? 'text' : 'password'}
          placeholder="répéter le mot de passe"
          required
        />
        <button
          type="button"
          onClick={() => setShowRepeated((prev) => !prev)}
          aria-label="Toggle repeated password visibility"
        >
          {showRepeated ? (<EyeSlashIcon className='h-5 w-5 text-gray-500'/>) : (<EyeIcon className='h-5 w-5 text-gray-500'/>)}
        </button>
      </div>

      <button type="submit">S'inscrire</button>
      <div className='flex flex-col'>
        <a href='/login'>Vous avez deja un compte? Cliquez ici.</a>
        <a href='/reset-password'>Oubli/e votre mot de passe?</a>
        {error && <p className='text-red-600'>{error}</p>}
        {success &&<p className='text-green-500'>{success}</p>}
      </div>
    </form>
  );
}
