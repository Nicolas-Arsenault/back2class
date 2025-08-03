import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface HeaderProps {
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = true }) => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <div className='flex w-full bg-gradient-to-r from-green-600 to-green-700 items-center justify-between px-6 py-4 shadow-lg'>
      <div className="flex items-center space-x-4">
        <Image 
          src="/back2class.png" 
          width="60" 
          height="60" 
          alt={`${APP_NAME} logo`} 
          className="rounded-lg" 
        />
        <h1 className="text-white text-2xl font-bold">{APP_NAME}</h1>
      </div>

      {showAuthButtons && (
        <div className="flex space-x-4">
          <Button 
            variant="outline"
            onClick={navigateToLogin}
            className="bg-white text-green-700 hover:bg-green-50"
          >
            Connexion
          </Button>
          <Button 
            onClick={navigateToRegister}
            className="bg-green-500 hover:bg-green-600"
          >
            Inscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header; 