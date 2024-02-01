import { useRef } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export function Create() {
  const name = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input type="text" placeholder="Seu nome" ref={name} />
      <Button type="button" title="Entrar" />
    </>
  );
}
