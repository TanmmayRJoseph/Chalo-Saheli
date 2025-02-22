"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyRide() {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-10 relative">
      {/* Title */}
      <div className="border-4 border-pink-500 rounded-lg px-8 py-4 mb-14">
        <h1 className="text-4xl font-bold text-pink-600">Why Ride with Us?</h1>
      </div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full flex flex-col items-center space-y-16"
      >
        {/* First Row: 3 Items */}
        <div className="flex justify-between w-full px-16">
          {[
            { src: "/image/girlhead.png", text: "Women only rides" },
            { src: "/image/callsign.png", text: "Emergency support" },
            { src: "/image/support.png", text: "Personal Safety Steward" },
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUp}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <Image src={item.src} alt={item.text} width={150} height={150} className="w-28 h-28" />
              <div className="border-4 border-pink-500 px-6 py-3 rounded-full mt-5 text-pink-600 font-semibold text-xl text-center">
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Row: 2 Items */}
        <div className="flex justify-center w-full gap-36">
          {[
            { src: "/image/carpreference.png", text: "Ride preferences" },
            { src: "/image/tracking.png", text: "Real-time ride tracking" },
          ].map((item, index) => (
            <motion.div
              key={index + 3}
              custom={index + 3}
              variants={fadeInUp}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <Image src={item.src} alt={item.text} width={150} height={150} className="w-28 h-28" />
              <div className="border-4 border-pink-500 px-6 py-3 rounded-full mt-5 text-pink-600 font-semibold text-xl text-center">
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logo (Top Right Corner) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 right-6"
      >
        <Image src="/image/ChaloSaheliLogo.png" alt="Chalo Saheli" width={140} height={140} />
      </motion.div>
    </div>
  );
}
