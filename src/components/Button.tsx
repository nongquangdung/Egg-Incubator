import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick,
  icon,
  fullWidth = false
}) => {
  const baseClass = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'secondary' 
      ? 'btn-secondary' 
      : 'btn-outline';
  
  return (
    <button 
      className={`${baseClass} ${fullWidth ? 'w-full' : ''} flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
