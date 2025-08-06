'use client';

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { time } from 'console';

interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
}


const RoundButton = React.forwardRef<HTMLButtonElement,RoundButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    
        const [isExpanded,setIsExpanded] = useState(false);
        const baseStyles =
        'inline-flex items-center justify-center font-semibold rounded-full transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
      const variants = {
        primary: 'bg-green-600 text-white hover:bg-green-700 shadow-md',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 shadow-md',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
        ghost: 'text-green-600 hover:text-green-700 hover:bg-green-50',
      };
  
      const sizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
      };
  
      const isDisabled = disabled || isLoading;

      const handleClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        if(isDisabled) return;

        setIsExpanded(true);
        if(props.onClick)props.onClick(e);
      }

      useEffect(()=>{
        if(isExpanded){
            const timeout = setTimeout(()=>setIsExpanded(false),100);
            return ()=>clearTimeout(timeout);
        }
      },[isExpanded])
  
      return (
        <button
          ref={ref}
          disabled={isDisabled}
          onClick={handleClick}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            isDisabled && 'opacity-50 cursor-not-allowed',
            isExpanded && 'scale-130',
            className
          )}
          {...props}
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 
                5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {children}
        </button>
      );
    }
  );
  
  RoundButton.displayName = 'RoundButton';

export default RoundButton;
