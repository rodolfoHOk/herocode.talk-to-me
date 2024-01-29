import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { inter } from './layout';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full h-full flex items-center justify-center">
        <Container>
          <div className="flex-1 mx-auto max-w-[580px] bg-app-gray-800 rounded-lg">
            <div className="flex items-center bg-app-gray-950">
              <span
                className={`${inter.className} flex-1 flex justify-center px-4 py-2 text-lg text-app-cyan-500 rounded-t-lg bg-app-gray-800`}
              >
                Ingressar
              </span>
              <span
                className={`${inter.className} flex-1 flex justify-center px-4 py-2 text-lg text-app-gray-100 rounded-t-lg bg-app-gray-950`}
              >
                Nova reunião
              </span>
            </div>
            <div className="p-12 flex flex-col gap-10">
              <Input type="text" placeholder="Seu nome" />
              <Input type="text" placeholder="Id da reunião" />
              <Button type="button" title="Entrar" />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
