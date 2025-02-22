import Image from 'next/image';

export default function RideCompletedPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center p-6">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/image/wings.png"
          alt="Wings Background"
          layout="fill"
          objectFit="contain"
          className="opacity-20"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center max-w-lg">
        <h1 className="text-5xl font-bold text-pink-600">Saheli!</h1>
        <h2 className="text-3xl font-extrabold text-pink-700 mt-2">Your ride is completed!</h2>
        <p className="mt-4 text-2xl text-pink-700 font-semibold">
          Rate your ride with Rekha
        </p>
        <div className="flex mt-3 space-x-2 text-pink-600 text-4xl">
          <span>☆</span> <span>☆</span> <span>☆</span> <span>☆</span> <span>☆</span>
        </div>
        <p className="mt-6 text-xl font-bold text-pink-700">Write a review</p>
        <textarea className="mt-2 w-full text-black p-4 border-2 border-pink-500 bg-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600" ></textarea>
        <button className="mt-4 px-10 py-3 bg-pink-500 text-white font-bold text-xl rounded-full hover:bg-pink-600 transition-all">
          Submit
        </button>
      </div>
      <div className="absolute top-6 right-6">
        <Image src="/image/ChaloSaheliLogo.png" alt="Chalo Saheli Logo" width={120} height={120} />
      </div>
    </div>
  );
}
