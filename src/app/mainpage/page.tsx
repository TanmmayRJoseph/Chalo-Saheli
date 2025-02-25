"use client";
import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
    return (
        <div className="min-h-screen bg-pink-100 p-6">
            {/* Heading Section */}
            <div className="flex justify-between items-center text-center px-6">
                <Image
                    src="/image/girlhead.png"
                    height={60}
                    width={60}
                    alt="Girl Head"
                    className="scale-x-[-1] ml-32"
                />
                <h3 className="text-2xl font-bold text-pink-600 text-center max-w-2xl">
                    Ride with Confidence, Travel with Care - <br /> Where Women&#39s Safety
                    Comes First
                </h3>
                <Image
                    src="/image/girlhead.png"
                    height={60}
                    width={60}
                    alt="Girl Head"
                    className="mr-32"
                />
                {/* <Image
          src="/image/ChaloSaheliLogo.png"
          height={150}
          width={150}
          alt="Chalo Saheli"
          className="z-10"
        /> */}
            </div>

            {/* Navigation Bar */}
            <div className=" border-t-2 border-pink-500 mt-4">
                <nav className=" flex justify-evenly space-x-8 text-pink-600 text-lg font-semibold mt-3">
                    <Link href="/" className="hover:text-pink-800">Home</Link>
                    <Link href="/rideOptions" className="hover:text-pink-800">Offerings</Link>
                    <Link href="/why-us" className="hover:text-pink-800">Why Us?</Link>
                    <Link href="/login-as" className="hover:text-pink-800">Login / Sign Up</Link>
                </nav>
                <div className=" border-t-2 border-pink-500 mt-2"></div>
            </div>
            {/* main img and chatbot will go here */}
            <div className="img flex  justify-between">


                <div className="imgsection ml-32">
                    <Image
                        src="/image/homepagePoster.png"
                        height={700}
                        width={700}
                        alt="Chalo Saheli"
                        className="z-10"
                    />
                </div>
                {/* chatbot here */}
                <div className="chatbot">
                    {/* here will come the chatbot */}
                </div>

            </div>











        </div>
    );
}
