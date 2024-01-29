import Image from 'next/image';
import { Container } from './Container';

export function Header() {
  return (
    <header className="bg-app-gray-900 flex">
      <Container>
        <div className="h-[120px] w-full flex flex-row justify-between items-center">
          <Image src="/app-logo.svg" alt="Talk to Me" width={180} height={40} />
          <Image
            src="/herocode-logo.svg"
            alt="Hero Code"
            width={42}
            height={35}
          />
        </div>
      </Container>
    </header>
  );
}
