'use client'
import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const Button = ({ text, disabled, variant, icon, iconPosition, className, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={
          `px-6 py-4 rounded flex drop-shadow-md cursor-pointer font-poppins
          ${variant === 'primary' ? 'bg-violet-main text-white hover:bg-violet-700' : 'bg-white text-violet-main hover:bg-violet-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className ? className : ''}
          `
        }
      >
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {text}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </button>
    </div>
  );
};

export default Button;