import Image from 'next/image';

export default function OffRoadPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-pink-100 text-center p-6">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/image/wings.png"
          alt="Wings Background"
          layout="fill"
          objectFit="contain"
          className="opacity-20"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-pink-600">Oops Saheli!</h1>
        <p className="mt-4 text-2xl text-pink-700 font-semibold">
          Looks like We’re Off the Road Right Now!
        </p>
        <p className="mt-2 text-xl text-pink-700 font-medium">
          Our rides are available from <span className="font-bold">6 AM to 8 PM</span>.
        </p>
        <p className="mt-2 text-xl text-pink-700 font-medium">
          Feel free to check within our service hours, we can’t wait to take you on our next adventure!
        </p>
      </div>
      <div className="absolute top-6 right-6">
        <Image src="/image/ChaloSaheliLogo.png" alt="Chalo Saheli Logo" width={96} height={96} />
      </div>
    </div>
  );
}
