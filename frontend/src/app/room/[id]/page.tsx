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
          <div className="w-4/5 h-[85%]">
            <span>Room</span>
          </div>
          <Chat />
          <Footer />
        </Container>
      </div>
    </div>
  );
}
