import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Input from '@/components/ui/Input';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  placeholder?: string;
  showToggle?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  placeholder = 'Votre mot de passe',
  showToggle = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const rightIcon = showToggle ? (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      aria-label="Toggle password visibility"
      className="text-gray-500 hover:text-green-600 transition-colors duration-200"
    >
      {showPassword ? (
        <EyeSlashIcon className="h-5 w-5" />
      ) : (
        <EyeIcon className="h-5 w-5" />
      )}
    </button>
  ) : undefined;

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      label={label}
      error={error}
      placeholder={placeholder}
      rightIcon={rightIcon}
      {...props}
    />
  );
};

export default PasswordInput; 