"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100  relative">
      {/* Logo at the Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-5 right-5"
      >
        <Image src="/image/ChaloSaheliLogo.png" alt="Logo" width={100} height={100} />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-pink-700 text-3xl font-bold text-center pb-14 "
      >
        New to Chalo Saheli? <br /> Sign up Saarthi!
      </motion.h2>

      {/* Sign-up Form Container */}
      <div className="w-full max-w-5xl bg-pink-200 p-10 rounded-lg shadow-lg flex items-center">
        {/* Grid Layout for Three Sections */}
        <div className="grid grid-cols-3 w-full gap-6 items-center">
          
          {/* Left Column: Input Fields */}
          <div className="flex flex-col space-y-6">
            {["Name", "Gender", "Date of Birth", "City of residence"].map((placeholder, index) => (
              <motion.input
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                type="text"
                placeholder={placeholder}
                className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            ))}
          </div>

          {/* Middle Column: Girl Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center items-center"
          >
            <Image src="/image/girl.png" alt="Girl Illustration" width={180} height={180} />
          </motion.div>

          {/* Right Column: Input Fields */}
          <div className="flex flex-col space-y-6">
            {["Phone Number", "Vehicle Available", "Email id", "Password"].map((placeholder, index) => (
              <motion.input
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                type={placeholder.toLowerCase().includes("password") ? "password" : "text"}
                placeholder={placeholder}
                className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            ))}
          </div>

        </div>

        {/* Submit Button Below the Form */}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-8 px-8 py-3 bg-pink-500 text-white text-xl font-bold rounded-full hover:bg-pink-600 transition-all"
      >
        Create Profile
      </motion.button>
    </div>
  );
}
