import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, ...rest },
  ref
) => {
  return (
    <input
      className={`w-full p-4 bg-app-gray-500 rounded-md placeholder:text-app-gray-300 text-lg ${className}`}
      ref={ref}
      {...rest}
    />
  );
};

export const Input = forwardRef(InputBase);
