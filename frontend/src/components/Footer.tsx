'use client';

import {
  Call,
  Display,
  DisplayOff,
  Microphone,
  MicrophoneOff,
  Video,
  VideoOff,
} from '@/icons';
import { IconButton } from './IconButton';
import { useState } from 'react';

export function Footer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return (
    <footer className="max-w-7xl w-full fixed bottom-0 bg-app-gray-950 py-9">
      <div className="grid grid-cols-3 items-center">
        <span className="text-[22px] font-medium">{`${hours}:${minutes}`}</span>
        <div className="flex gap-3 justify-center">
          <IconButton
            className={isMuted ? 'bg-red-500' : ''}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <MicrophoneOff className="w-6 translate-y-[1px]" />
            ) : (
              <Microphone className="w-6" />
            )}
          </IconButton>
          <IconButton
            className={isCameraOff ? 'bg-red-500' : ''}
            onClick={() => setIsCameraOff(!isCameraOff)}
          >
            {isCameraOff ? (
              <VideoOff className="w-[43px] translate-x-[1px] translate-y-[-1px]" />
            ) : (
              <Video className="w-9" />
            )}
          </IconButton>
          <IconButton
            className={isScreenSharing ? 'bg-red-500' : ''}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            {isScreenSharing ? (
              <DisplayOff className="w-[38px]" />
            ) : (
              <Display className="w-[34px]" />
            )}
          </IconButton>
          <IconButton className="bg-app-cyan-500">
            <Call className="w-[34px]" />
          </IconButton>
        </div>
        <span className=""></span>
      </div>
    </footer>
  );
}
