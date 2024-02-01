'use client';

import { Chat } from '@/components/Chat';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SocketContext } from '@/contexts/SocketContext';
import { useContext, useEffect } from 'react';

interface RoomProps {
  params: {
    id: string;
  };
}

export default function Room({ params }: RoomProps) {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on('connect', () => {
      console.log('connected');
      socket?.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id,
      });
    });
  }, [socket, params.id]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full flex justify-center">
        <Container>
          <div className="w-full md:w-4/5 h-[85%] p-8">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-16 h-full">
              <div className="relative bg-app-gray-700 h-full w-full rounded-md p-2">
                <video className="h-full w-full"></video>
                <span className="absolute bottom-2 left-3 text-app-white text-xl leading-6">
                  Rudolf HiOk
                </span>
              </div>

              <div className="relative bg-app-gray-700 h-full w-full rounded-md p-2">
                <video className="h-full w-full"></video>
                <span className="absolute bottom-2 left-3 text-app-white text-xl leading-6">
                  Rudolf HiOk
                </span>
              </div>

              <div className="relative bg-app-gray-700 h-full w-full rounded-md p-2">
                <video className="h-full w-full"></video>
                <span className="absolute bottom-2 left-3 text-app-white text-xl leading-6">
                  Rudolf HiOk
                </span>
              </div>

              <div className="relative bg-app-gray-700 h-full w-full rounded-md p-2">
                <video className="h-full w-full"></video>
                <span className="absolute bottom-2 left-3 text-app-white text-xl leading-6">
                  Rudolf HiOk
                </span>
              </div>
            </div>
          </div>
          <Chat roomId={params.id} />
          <Footer />
        </Container>
      </div>
    </div>
  );
}
