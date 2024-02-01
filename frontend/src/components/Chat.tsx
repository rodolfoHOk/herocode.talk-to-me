'use client';
import { SocketContext } from '@/contexts/SocketContext';
import Image from 'next/image';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

interface IChat {
  roomId: string;
}

interface IChatMessage {
  message: string;
  username: string;
  roomId: string;
  date_time: string;
}

export function Chat({ roomId }: IChat) {
  const { socket } = useContext(SocketContext);
  const currentMsg = useRef<HTMLInputElement>(null);
  const [chat, setChat] = useState<IChatMessage[]>([]);

  useEffect(() => {
    socket?.on('chat', (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, [socket]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentMsg.current && currentMsg.current.value.trim() !== '') {
      const sendMsgToServer = {
        message: currentMsg.current.value,
        username: 'Rudolf HiOk',
        roomId: roomId,
        date_time: new Date().toISOString(),
      };
      socket?.emit('chat', sendMsgToServer);
      setChat((prev) => [...prev, sendMsgToServer]);
      currentMsg.current.value = '';
    }
  }

  return (
    <div className="w-1/5 h-[68vh] bg-app-gray-700 px-4 pt-4 rounded-md mt-8 mb-2 mx-2 hidden md:flex">
      <div className="relative w-full flex flex-col overflow-y-auto">
        <div className="flex-1 flex w-full flex-col">
          {chat.map((message, index) => (
            <div
              key={`message-${index}`}
              className="bg-app-gray-500 rounded p-2 mb-4"
            >
              <div className="flex items-center gap-2 leading-6 text-app-pink-500">
                <span className="font-medium text-xs">{message.username}</span>
                <span className="font-normal text-2xs">
                  {new Date(message.date_time).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-app-gray-50 text-xs mt-2">
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="w-full mb-3" onSubmit={(e) => sendMessage(e)}>
          <div className="relative flex">
            <input
              ref={currentMsg}
              type="text"
              className="w-full p-4 bg-app-gray-500 rounded-md placeholder:text-app-gray-300 text-lg"
            />
            <button type="submit">
              <Image
                className="absolute right-2 top-4"
                alt="Enviar"
                src="/icons/send.png"
                width={26}
                height={26}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
