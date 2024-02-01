import { Chat } from '@/components/Chat';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

interface RoomProps {
  params: {
    id: string;
  };
}

export default function Room({ params }: RoomProps) {
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
          <Chat />
          <Footer />
        </Container>
      </div>
    </div>
  );
}