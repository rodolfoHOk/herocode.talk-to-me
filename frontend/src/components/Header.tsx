import Image from 'next/image';

export function Header() {
  return (
    <header>
      <div className="h-[120px] px-14 flex flex-row justify-between items-center bg-app-gray-900">
        <Image src="/app-logo.svg" alt="Talk to Me" width={180} height={40} />
        <Image
          src="/herocode-logo.svg"
          alt="Hero Code"
          width={42}
          height={35}
        />
      </div>
    </header>
  );
}
