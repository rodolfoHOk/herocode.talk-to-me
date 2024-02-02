'use client';

import { Chat } from '@/components/Chat';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SocketContext } from '@/contexts/SocketContext';
import { useContext, useEffect, useRef, useState } from 'react';

interface IAnswer {
  description: RTCSessionDescriptionInit;
  sender: string;
}

interface ICandidates {
  candidate: RTCIceCandidate;
  sender: string;
}

interface RoomProps {
  params: {
    id: string;
  };
}

export default function Room({ params }: RoomProps) {
  const { socket } = useContext(SocketContext);
  const localStream = useRef<HTMLVideoElement>(null);
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null
  );

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('conectado');
      socket?.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id,
      });
      await initLocalCamera();
    });

    socket?.on('new user', (data) => {
      console.log('Novo usuário tentando se conectar');
      createPeerConnection(data.socketId, false);
      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
      });
    });

    socket?.on('newUserStart', (data) => {
      console.log('Usuário entrou na sala', data);
      createPeerConnection(data.sender, true);
    });

    socket?.on('sdp', (data) => handleAnswer(data));

    socket?.on('ice candidates', (data) => handleIceCandidates(data));
  }, [socket, params.id]);

  const handleIceCandidates = async (data: ICandidates) => {
    const peerConnection = peerConnections.current[data.sender];
    if (data.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  const handleAnswer = async (data: IAnswer) => {
    const peerConnection = peerConnections.current[data.sender];
    if (data.description.type === 'offer') {
      await peerConnection.setRemoteDescription(data.description);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      console.log('Criando uma resposta a oferta');
      socket?.emit('sdp', {
        to: data.sender,
        sender: socket.id,
        description: peerConnection.localDescription,
      });
    } else if (data.description.type === 'answer') {
      console.log('Ouvindo a resposta da oferta');
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.description)
      );
    }
  };

  const createPeerConnection = async (
    socketId: string,
    createOffer: boolean
  ) => {
    const config: RTCConfiguration = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
      ],
    };
    const peer = new RTCPeerConnection(config);
    peerConnections.current[socketId] = peer;
    const peerConnection = peerConnections.current[socketId];

    if (videoMediaStream) {
      videoMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream);
      });
    } else {
      const video = await initRemoteCamera();
      video.getTracks().forEach((track) => {
        peerConnection.addTrack(track, video);
      });
    }

    if (createOffer) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log('Criando uma oferta');

      socket?.emit('sdp', {
        to: socketId,
        sender: socket.id,
        description: peerConnection.localDescription,
      });
    }

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      setRemoteStreams((prev) => [...prev, remoteStream]);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit('ice candidates', {
          to: socketId,
          sender: socket.id,
          candidate: event.candidate,
        });
      }
    };
  };

  const initLocalCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
      video: true,
    });
    setVideoMediaStream(video);
    if (localStream.current) localStream.current.srcObject = video;
  };

  const initRemoteCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
      video: true,
    });
    return video;
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full flex justify-center">
        <Container>
          <div className="w-full md:w-4/5 h-[85%] p-8">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-16 h-full">
              <div className="relative bg-app-gray-700 h-full w-full rounded-md p-2">
                <video
                  className="h-full w-full mirror-mode"
                  ref={localStream}
                  autoPlay
                  playsInline
                />
                <span className="absolute bottom-2 left-3 text-app-white text-xl leading-6">
                  {sessionStorage.getItem('username')}
                </span>
              </div>

              {remoteStreams.map((stream, index) => (
                <div
                  key={index}
                  className="relative bg-app-gray-700 h-full w-full rounded-md p-2"
                >
                  <video
                    className="h-full w-full"
                    autoPlay
                    playsInline
                    ref={(video) => {
                      if (video && video.srcObject !== stream) {
                        video.srcObject = stream;
                      }
                    }}
                  />
                  <span className="absolute bottom-2 left-3 text-app-white text-xl leading-6">
                    Nome do usuário
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Chat roomId={params.id} />
          <Footer />
        </Container>
      </div>
    </div>
  );
}
