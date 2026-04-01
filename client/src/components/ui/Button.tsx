import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary to-primary-variant text-on-primary hover:brightness-110 shadow-glow-primary',
    secondary: 'bg-surface-variant text-on-surface hover:bg-surface-container-highest border border-outline-variant/20',
    danger: 'bg-danger-500/10 text-danger-500 hover:bg-danger-500/20 border border-danger-500/20',
    ghost: 'hover:bg-surface-variant text-on-surface-variant hover:text-on-surface',
  };

  return (
    <button 
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent animate-spin"></span>
      ) : null}
      {children}
    </button>
  );
}
