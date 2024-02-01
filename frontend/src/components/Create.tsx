'use client';

import { FormEvent, useRef } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { useRouter } from 'next/navigation';

export function Create() {
  const name = useRef<HTMLInputElement>(null);

  function handleCreateRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.current && name.current.value.trim() !== '') {
      sessionStorage.setItem('username', name.current.value);
      const roomId = generateRandomString();
      window.location.href = `/room/${roomId}`;
    }
  }

  function generateRandomString() {
    const randomString = Math.random().toString(36).substring(2, 12);
    return randomString;
  }

  return (
    <form
      onSubmit={(e) => handleCreateRoom(e)}
      className="flex flex-col gap-10"
    >
      <Input type="text" placeholder="Seu nome" ref={name} />
      <Button type="submit" title="Entrar" />
    </form>
  );
}
