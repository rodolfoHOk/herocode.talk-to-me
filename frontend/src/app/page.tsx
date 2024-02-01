import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { FormWrapper } from '@/components/FormWrapper';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full h-full flex justify-center mt-[200px]">
        <Container>
          <FormWrapper />
        </Container>
      </div>
    </main>
  );
}
