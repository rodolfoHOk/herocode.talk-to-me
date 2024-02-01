import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function Button({ title, type, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className="w-full p-4 bg-app-cyan-500 rounded-md font-medium text-lg text-app-gray-900 hover:bg-app-cyan-500/80 transition-colors duration-200"
      {...rest}
    >
      <span className="">{title}</span>
    </button>
  );
}
