'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { APP_NAME } from '@/lib/constants';

function Page() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card variant="elevated" className="text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Bienvenue!</h1>
          {user ? (
            <p className="text-gray-700 text-lg">
              Bonjour, {user.user_metadata?.displayName || user.email}!
            </p>
          ) : (
            <p className="text-gray-700 text-lg">
              Vous êtes connecté avec succès.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Page;
