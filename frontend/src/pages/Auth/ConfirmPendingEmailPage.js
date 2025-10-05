import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ConfirmPendingEmailPage() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setStatus({ success: false, message: "Token manquant." });
      return;
    }

    fetch(`/api/auth/confirm-pending-email?token=${token}`)
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => setStatus({ success: false, message: "Erreur lors de la confirmation." }));
  }, [params]);

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Confirmation d'email</h2>
      {status ? (
        <p className={status.success ? 'text-green-600' : 'text-red-500'}>
          {status.message}
        </p>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default ConfirmPendingEmailPage;
