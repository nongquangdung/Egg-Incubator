import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'highlight';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  onClick
}) => {
  const baseClass = variant === 'default' 
    ? 'card' 
    : variant === 'light' 
      ? 'card-light' 
      : 'card-highlight';
  
  return (
    <div 
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
