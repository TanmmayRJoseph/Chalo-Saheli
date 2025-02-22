import Image from 'next/image';
import Link from 'next/link';

export default function LanguageSelection() {
  return (
    <div className="relative z-0 flex flex-col items-center justify-center min-h-screen bg-pink-100 overflow-hidden">
      {/* Background Wings */}
      <div className="absolute mb-20 opacity-10 transition-all duration-1500">
        <Image
          src="/image/wings.png"
          alt="Wings Background"
          width={900}
          height={900}
          objectPosition='center'
          objectFit='cover'
          layout='absolute'
        />
      </div>

      {/* Logo in Top Right */}
      <div className="absolute top-5 right-5 opacity-100 transition-all duration-1000 transform translate-x-0">
        <Image
          src="/image/ChaloSaheliLogo.png"
          alt="Chalo Saheli Logo"
          width={160}
          height={160}
        />
      </div>

      {/* Girl Sticker */}
      <div className="relative z-10 opacity-100 transition-all duration-1000 transform translate-y-0">
        <Image
          src="/image/girl.png"
          alt="Girl Illustration"
          width={250}
          height={250}
        />
      </div>

      <h2 className="mt-4 text-pink-700 text-4xl font-semibold opacity-100 transition-all duration-1000 transform translate-y-0">
        Login As
      </h2>

      {/* Login Buttons */}
      <div className="mt-6 flex space-x-6 opacity-100 transition-all duration-1000 transform translate-y-0 delay-500">
        <Link href="/login-as-Saheli">
          <button className="px-6 py-3 border-2 border-pink-500 text-pink-700 text-3xl font-bold rounded-xl hover:bg-pink-200 transition-all">
            Saheli
          </button>
        </Link>
        <Link href="/login-as-Saarthi">
          <button className="px-6 py-3 border-2 border-pink-500 text-pink-700 text-3xl font-bold rounded-xl hover:bg-pink-200 transition-all">
            Saarthi
          </button>
        </Link>
      </div>
    </div>
  );
}
