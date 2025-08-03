'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Start countdown
        const countdownTimer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownTimer);
                    // Redirect to login page instead of home
                    router.push('/login');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(countdownTimer);
        };
    }, [router]); // Added dependency array
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Compte vérifié!</h1>
                    <p className="text-gray-600">Votre compte a été vérifié avec succès</p>
                </div>

                {/* Success Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="mb-6">
                        <p className="text-gray-700 text-lg mb-4">
                            Votre compte a été vérifié avec succès! Vous serez redirigé vers la page de connexion dans quelques secondes.
                        </p>
                        
                        {countdown > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Redirection dans:</p>
                                <div className="text-2xl font-bold text-green-600">{countdown}</div>
                            </div>
                        )}
                    </div>

                    {/* Manual Link */}
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Si vous n'êtes pas redirigé automatiquement, cliquez sur le bouton ci-dessous:
                        </p>
                        <a 
                            href="/login" 
                            className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                        >
                            Aller à la connexion
                        </a>
                    </div>
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

export default Page;
