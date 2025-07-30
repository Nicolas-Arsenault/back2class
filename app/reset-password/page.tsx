'use client'; // Note: should be 'use client' if using client-side logic

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Make sure you're importing from client version

function Page() {
  const [email, setEmail] = useState('');
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return alert('Please enter your email.');

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error(error.message);
    } else {
      alert('Password reset email sent.');
    }
  };

  return (
    <div>
      <form onSubmit={handleReset}>
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default Page;
