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
  iconResponsive?: boolean;
}

const Button = ({ text, disabled, variant, icon, iconPosition, className, onClick, iconResponsive }: ButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={
          `px-6 py-4 rounded-md flex shadow-main cursor-pointer font-poppins
          ${variant === 'primary' ? 'bg-violet-main text-white hover:bg-violet-700' : 'bg-white text-violet-main border border-violet-main hover:bg-violet-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className ? className : ''}
          `
        }
      >
        {icon && iconPosition === 'left' && <span className={`${iconResponsive ? 'content-center lg:mr-2' : 'mr-2'}`}>{icon}</span>}
        <span className={`content-center ${iconResponsive ? 'hidden lg:block' : ''}`}>
          {text}
        </span>
        {icon && iconPosition === 'right' && <span className={`${iconResponsive ? 'content-center lg:ml-2' : 'ml-2'}`}>{icon}</span>}
      </button>
    </>
  );
};

export default Button;