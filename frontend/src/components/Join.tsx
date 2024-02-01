'use client';

import { FormEvent, useRef } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { useRouter } from 'next/navigation';

export function Join() {
  const name = useRef<HTMLInputElement>(null);
  const id = useRef<HTMLInputElement>(null);

  function handleJoinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      name.current &&
      name.current.value.trim() !== '' &&
      id.current &&
      id.current.value.trim() !== ''
    ) {
      sessionStorage.setItem('username', name.current.value);
      const roomId = id.current.value;
      window.location.href = `/room/${roomId}`;
    }
  }

  return (
    <form onSubmit={handleJoinRoom} className="flex flex-col gap-10">
      <Input type="text" placeholder="Seu nome" ref={name} />
      <Input type="text" placeholder="Id da reunião" ref={id} />
      <Button type="submit" title="Entrar" />
    </form>
  );
}
