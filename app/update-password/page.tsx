'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

function Page() {
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [rePassword,setRePassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(rePassword != password) return alert('Passwords are different. ');

    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error('Error updating password:', error.message);
      alert('Failed to update password.');
    } else {
      alert('Password updated successfully!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email is optional here, unless you want to show it */}
        <input
          type="password"
          placeholder="new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder='repeter le mot de passe'
          value={rePassword}
          onChange={(e)=>setRePassword(e.target.value)}/>
        <button type="submit">Change password</button>
      </form>
    </div>
  );
}

export default Page;
