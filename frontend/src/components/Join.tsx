'use client';

import { useRef } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export function Join() {
  const name = useRef<HTMLInputElement>(null);
  const id = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input type="text" placeholder="Seu nome" ref={name} />
      <Input type="text" placeholder="Id da reunião" ref={id} />
      <Button type="button" title="Entrar" />
    </>
  );
}
