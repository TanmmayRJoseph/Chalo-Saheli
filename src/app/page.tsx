"use client";
import Image from "next/image";
import { motion, } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-pink-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="ml-12 mt-5 "
        >
          <Image
            src="/image/ChaloSaheliLogo.png"
            alt="Chalo Saheli"
            width={300}
            height={300}
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-pink-700 text-xl font-semibold mt-4"
        >
          Women for Women, Safe Journey Always.
        </motion.h1>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300"
        >
          <Link href="/langSelection">  Experience</Link>
        </motion.button>
      </motion.div>
    </div>
  );
}