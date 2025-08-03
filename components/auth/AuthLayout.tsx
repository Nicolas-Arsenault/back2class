import React from 'react';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackToHome?: boolean;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackToHome = true,
  className
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className={cn("max-w-md w-full", className)}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        {children}

        {/* Back to Home */}
        {showBackToHome && (
          <div className="text-center mt-6">
            <a 
              href="/" 
              className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              ← Retour à l'accueil
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout; 