'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

function Page() {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Change password</button>
      </form>
    </div>
  );
}

export default Page;
