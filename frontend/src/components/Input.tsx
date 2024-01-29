import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(inputProps: InputProps) {
  return (
    <input
      className="w-full p-4 bg-app-gray-500 rounded-md placeholder:text-app-gray-300 text-lg"
      {...inputProps}
    />
  );
}
