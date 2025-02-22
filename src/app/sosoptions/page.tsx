"use client";
import Image from 'next/image';

export default function SecureSaheliPage() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center p-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 py-4 flex justify-center">
                <h1 className="text-4xl font-bold text-pink-600">#SecureSaheli</h1>
            </div>

            {/* First Row: 3 icons */}
            <div className="flex justify-around w-full mt-24">
                <div className="flex flex-col items-center">
                    <Image src="/image/police.png" alt="Police" width={150} height={150} />
                    <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">Call Police</button>
                </div>
                <div className="flex flex-col items-center">
                    <Image src="/image/callsign.png" alt="Emergency Contact" width={150} height={150} />
                    <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">Call Emergency Contact</button>
                </div>
                <div className="flex flex-col items-center">
                    <Image src="/image/ambulance.png" alt="Ambulance" width={260} height={260} />
                    <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">Call Ambulance</button>
                </div>
            </div>

            {/* Second Row: 2 icons */}
            <div className="flex justify-around w-full mt-6">
                <div className="flex flex-col items-center">
                    <Image src="/image/safety.png" alt="Safety Steward" width={150} height={150} />
                    <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">Call Safety Steward</button>
                </div>
                <div className="flex flex-col items-center">
                    <Image src="/image/chat.png" alt="Chat Support" width={150} height={150} />
                    <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">Chat Support</button>
                </div>
            </div>
        </div>
    );
}
