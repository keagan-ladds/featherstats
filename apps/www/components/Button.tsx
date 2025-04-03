import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
}

const Button = ({ children, variant = 'primary', href, className = '', ...props }: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-colors';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    outline: 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
