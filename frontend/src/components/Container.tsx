import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl mx-auto w-full h-full flex">{children}</div>;
}
