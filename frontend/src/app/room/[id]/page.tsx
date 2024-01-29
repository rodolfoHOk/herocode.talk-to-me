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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full h-full flex justify-center">
        <Container>
          <span>Room</span>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
