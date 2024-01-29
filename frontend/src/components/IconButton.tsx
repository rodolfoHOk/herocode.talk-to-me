import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function IconButton({ children, className, ...rest }: IconButtonProps) {
  return (
    <button
      className={`w-[72px] h-[52px] bg-app-gray-500 rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-app-pink-500 transition-colors duration-200 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
