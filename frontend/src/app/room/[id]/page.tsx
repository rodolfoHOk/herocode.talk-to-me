'use client';

import { Chat } from '@/components/Chat';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SocketContext } from '@/contexts/SocketContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';

export interface IDataStream {
  id: string;
  stream: MediaStream;
  username: string;
}

interface INewUser {
  socketId: string;
  username: string;
}

interface INewUserStart {
  sender: string;
  username: string;
}

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
  const router = useRouter();
  const { socket } = useContext(SocketContext);
  const localStream = useRef<HTMLVideoElement>(null);
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const [remoteStreams, setRemoteStreams] = useState<IDataStream[]>([]);
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null
  );

  const createPeerConnection = async (
    socketId: string,
    createOffer: boolean,
    username: string
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
      const dataStream: IDataStream = {
        id: socketId,
        stream: remoteStream,
        username,
      };
      setRemoteStreams((prevState) => {
        if (!prevState.some((stream) => stream.id === socketId)) {
          return [...prevState, dataStream];
        }
        return prevState;
      });
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

    peerConnection.onsignalingstatechange = (event) => {
      switch (peerConnection.signalingState) {
        case 'closed':
          setRemoteStreams((prevState) =>
            prevState.filter((data) => data.id !== socketId)
          );
          break;
      }
    };

    peerConnection.onconnectionstatechange = (event) => {
      switch (peerConnection.connectionState) {
        case 'disconnected':
          setRemoteStreams((prevState) =>
            prevState.filter((data) => data.id !== socketId)
          );
          break;
        case 'failed':
          setRemoteStreams((prevState) =>
            prevState.filter((data) => data.id !== socketId)
          );
          break;
        case 'closed':
          setRemoteStreams((prevState) =>
            prevState.filter((data) => data.id !== socketId)
          );
          break;
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

  const logout = () => {
    videoMediaStream?.getTracks().forEach((track) => {
      track.stop();
    });
    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.close();
    });
    socket?.disconnect();
    router.push('/');
  };

  const handleConnect = async (username: string, roomId: string) => {
    console.log('conectado');
    socket?.emit('subscribe', {
      roomId,
      socketId: socket.id,
      username,
    });
    await initLocalCamera();
  };

  const handleNewUser = async (data: INewUser, username: string) => {
    console.log('Novo usuário tentando se conectar');
    createPeerConnection(data.socketId, false, data.username);
    socket?.emit('newUserStart', {
      to: data.socketId,
      sender: socket.id,
      username,
    });
  };

  const handleNewUserStart = (data: INewUserStart) => {
    console.log('Usuário entrou na sala', data);
    createPeerConnection(data.sender, true, data.username);
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

  const handleIceCandidates = async (data: ICandidates) => {
    const peerConnection = peerConnections.current[data.sender];
    if (data.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  useEffect(() => {
    const username = sessionStorage.getItem('username') as string;
    socket?.on('connect', () => handleConnect(username, params.id));
    socket?.on('new user', (data) => handleNewUser(data, username));
    socket?.on('newUserStart', (data) => handleNewUserStart(data));
    socket?.on('sdp', (data) => handleAnswer(data));
    socket?.on('ice candidates', (data) => handleIceCandidates(data));
  }, [socket, params.id]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full flex justify-center">
        <Container>
          <div className="w-full md:w-4/5 h-[85%] p-8">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-16 h-full">
              <div className="relative bg-app-gray-700 h-1/2 w-full rounded-md p-2">
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

              {remoteStreams.map((data, index) => (
                <div
                  key={index}
                  className="relative bg-app-gray-700 h-1/2 w-full rounded-md p-2"
                >
                  <video
                    className="h-full w-full"
                    autoPlay
                    playsInline
                    ref={(video) => {
                      if (video && video.srcObject !== data.stream) {
                        video.srcObject = data.stream;
                      }
                    }}
                  />
                  <span className="absolute bottom-2 left-3 text-app-white text-xl leading-6">
                    {data.username}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Chat roomId={params.id} />
          <Footer
            videoMediaStream={videoMediaStream}
            peerConnections={peerConnections}
            localStream={localStream}
            logout={logout}
          />
        </Container>
      </div>
    </div>
  );
}
