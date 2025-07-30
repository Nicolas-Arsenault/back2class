
'use client';
import React,{useState} from 'react'
import {login} from './actions';
import { EyeIcon,EyeSlashIcon } from '@heroicons/react/24/outline';


function page() {

  const [showPass,setShowPass] = useState(false);
  const [error,setError] = useState<string|null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    const result = await login(formData);

    if(result?.error){
      setError(result.error);
    }
  }

  return (
     <form onSubmit={handleSubmit}>
      <input name="email" type="text" placeholder="email" required />

      <div>
        <input
          name="password"
          type={showPass ? 'text' : 'password'}
          placeholder="mot de passe"
          required
        />
        <button
        
          type="button"
          onClick={() => setShowPass((prev) => !prev)}
          aria-label="Toggle password visibility"
        >
          {showPass ? (
            <EyeSlashIcon className='h-5 w-5 text-gray-500'></EyeSlashIcon>
          ) : (<EyeIcon className='h-5 w-5 text-gray-500'></EyeIcon>)} {/* Replace with real icon if needed */}
        </button>
      </div>
      <button type='submit'>Connexion</button>
      <div className='flex flex-col'>
        <a href='/register'>Vous n'avez pas de compte? Cliquez ici.</a>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </form>
  )
}

export default page
