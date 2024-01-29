import Image from 'next/image';

export function Chat() {
  return (
    <div className="h-[80%] w-1/5 bg-app-gray-700 px-4 pt-4 rounded-md mt-8 mb-2 mx-2 hidden md:flex">
      <div className="relative w-full">
        <div className="bg-app-gray-500 rounded p-2">
          <div className="flex items-center gap-2 leading-6 text-app-pink-500">
            <span className="font-medium text-xs">Rudolf HiOk</span>
            <span className="font-normal text-2xs">15:47</span>
          </div>
          <div className="text-app-gray-50 text-xs mt-2">
            <p>text</p>
          </div>
        </div>

        <form className="absolute bottom-3 w-full">
          <div className="relative flex">
            <input
              type="text"
              className="w-full p-4 bg-app-gray-500 rounded-md placeholder:text-app-gray-300 text-lg"
            />
            <Image
              className="absolute right-2 top-4"
              alt="Enviar"
              src="/icons/send.png"
              width={26}
              height={26}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
