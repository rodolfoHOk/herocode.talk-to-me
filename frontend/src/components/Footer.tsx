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
import { MutableRefObject, useState } from 'react';
import { IconButton } from './IconButton';

interface IFooter {
  videoMediaStream: MediaStream | null;
  peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>;
  localStream: MutableRefObject<HTMLVideoElement | null>;
  logout: () => void;
}

export function Footer({
  videoMediaStream,
  peerConnections,
  localStream,
  logout,
}: IFooter) {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const toggleMuted = () => {
    videoMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = isMuted;
    });
    setIsMuted(!isMuted);

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'audio') {
          if (
            videoMediaStream &&
            videoMediaStream.getAudioTracks().length > 0
          ) {
            sender.replaceTrack(
              videoMediaStream
                .getAudioTracks()
                .find((track) => track.kind === 'audio') || null
            );
          }
        }
      });
    });
  };

  const toggleVideo = () => {
    videoMediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOff;
    });
    setIsCameraOff(!isCameraOff);

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(
            videoMediaStream
              ?.getVideoTracks()
              .find((track) => track.kind === 'video') || null
          );
        }
      });
    });
  };

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      if (localStream.current) localStream.current.srcObject = videoShareScreen;

      Object.values(peerConnections.current).forEach((peerConnection) => {
        peerConnection.getSenders().forEach((sender) => {
          if (sender.track?.kind === 'video') {
            sender.replaceTrack(videoShareScreen.getVideoTracks()[0]);
          }
        });
      });
      setIsScreenSharing(!isScreenSharing);
    } else {
      if (localStream.current) localStream.current.srcObject = videoMediaStream;

      Object.values(peerConnections.current).forEach((peerConnection) => {
        peerConnection.getSenders().forEach((sender) => {
          if (sender.track?.kind === 'video') {
            sender.replaceTrack(
              videoMediaStream ? videoMediaStream.getVideoTracks()[0] : null
            );
          }
        });
      });
      setIsScreenSharing(!isScreenSharing);
    }
  };

  return (
    <footer className="max-w-7xl w-full fixed bottom-0 bg-app-gray-950 py-9">
      <div className="grid grid-cols-3 items-center">
        <span className="text-[22px] font-medium">{`${hours}:${minutes}`}</span>
        <div className="flex gap-3 justify-center">
          <IconButton
            className={isMuted ? 'bg-red-500' : ''}
            onClick={toggleMuted}
          >
            {isMuted ? (
              <MicrophoneOff className="w-6 translate-y-[1px]" />
            ) : (
              <Microphone className="w-6" />
            )}
          </IconButton>
          <IconButton
            className={isCameraOff ? 'bg-red-500' : ''}
            onClick={toggleVideo}
          >
            {isCameraOff ? (
              <VideoOff className="w-[43px] translate-x-[1px] translate-y-[-1px]" />
            ) : (
              <Video className="w-9" />
            )}
          </IconButton>
          <IconButton
            className={isScreenSharing ? 'bg-red-500' : ''}
            onClick={toggleScreenSharing}
          >
            {isScreenSharing ? (
              <DisplayOff className="w-[38px]" />
            ) : (
              <Display className="w-[34px]" />
            )}
          </IconButton>
          <IconButton className="bg-app-cyan-500" onClick={logout}>
            <Call className="w-[34px]" />
          </IconButton>
        </div>
        <span className=""></span>
      </div>
    </footer>
  );
}
