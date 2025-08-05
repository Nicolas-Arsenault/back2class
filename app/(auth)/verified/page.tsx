'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import Button from '@/components/ui/Button';
import { ROUTES, UI } from '@/lib/constants';

function Page() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    // Handle countdown
    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownTimer);
                    setShouldRedirect(true);
                    return 0;
                }
                return prev - 1;
            });
        }, UI.COUNTDOWN_DELAY);

        return () => {
            clearInterval(countdownTimer);
        };
    }, []); // No dependencies needed

    // Handle redirect when countdown reaches 0
    useEffect(() => {
        if (shouldRedirect) {
            const redirectTimer = setTimeout(() => {
                router.push(ROUTES.LOGIN);
            }, 1000); // Small delay to ensure state updates are complete

            return () => clearTimeout(redirectTimer);
        }
    }, [shouldRedirect, router]);
    
    return (
        <AuthLayout 
            title="Compte vérifié!"
            subtitle="Votre compte a été vérifié avec succès"
            showBackToHome={false}
        >
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

                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Si vous n'êtes pas redirigé automatiquement, cliquez sur le bouton ci-dessous:
                    </p>
                    <a href={ROUTES.LOGIN}>
                        <Button className="inline-block">
                            Aller à la connexion
                        </Button>
                    </a>

                </div>
            </div>
        </AuthLayout>
    );
}

export default Page;
