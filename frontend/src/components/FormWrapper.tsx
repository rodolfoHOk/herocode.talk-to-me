'use client';

import { useState } from 'react';
import { Join } from './Join';
import { Create } from './Create';

export function FormWrapper() {
  const [selectedRoom, setSelectedRoom] = useState<'join' | 'create'>('join');

  const handleSelectRoom = (room: 'join' | 'create') => {
    setSelectedRoom(room);
  };

  return (
    <div className="flex-1 mx-auto max-w-[580px] bg-app-gray-800 rounded-lg">
      <div className="flex items-center bg-app-gray-950 font-inter text-lg text-app-gray-100">
        <span
          className={`flex-1 flex justify-center py-2 rounded-t-lg cursor-pointer ${
            selectedRoom === 'join' && 'text-app-cyan-500  bg-app-gray-800'
          }`}
          onClick={() => handleSelectRoom('join')}
        >
          Ingressar
        </span>
        <span
          className={`flex-1 flex justify-center py-2 rounded-t-lg cursor-pointer ${
            selectedRoom === 'create' && 'text-app-cyan-500  bg-app-gray-800'
          }`}
          onClick={() => handleSelectRoom('create')}
        >
          Nova reunião
        </span>
      </div>
      <div className="p-12 flex flex-col">
        <RoomSelector selectedRoom={selectedRoom} />
      </div>
    </div>
  );
}

interface RoomSelectorProps {
  selectedRoom: 'join' | 'create';
}

const RoomSelector = ({ selectedRoom }: RoomSelectorProps) => {
  switch (selectedRoom) {
    case 'join':
      return <Join />;
    case 'create':
      return <Create />;
    default:
      return <Join />;
  }
};
