"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    address: "",
    phoneNo: "",
    emergencyNo: "",
    emailId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    // Basic validation: Check if any field is empty
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }

    // Prevent signup if gender is "Male"
    if (formData.gender.toLowerCase() === "male") {
      toast.error("Sorry, only females can sign up.");
      return;
    }

    try {
      toast.loading("Signing up...");
      const response = await axios.post("/api/auth/register", formData);
      toast.dismiss();
      toast.success("Signup successful!");
      console.log(response);
      router.push("/login-as-Saheli");
    } catch (Error:any) {
      toast.dismiss();
      toast.error(`Signup failed: ${Error.message}`);
      console.error("Signup failed", Error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 relative">
      {/* Logo at the Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-5 right-5"
      >
        <Image
          src="/image/ChaloSaheliLogo.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-pink-700 text-3xl font-bold text-center pb-14"
      >
        New to Chalo Saheli? <br /> Sign up Saheli!
      </motion.h2>

      {/* Sign-up Form Container */}
      <div className="w-full max-w-5xl bg-pink-200 p-10 rounded-lg shadow-lg flex items-center">
        {/* Grid Layout for Three Sections */}
        <div className="grid grid-cols-3 w-full gap-6 items-center">
          {/* Left Column: Input Fields */}
          <div className="flex flex-col space-y-6">
            <motion.input
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <motion.input
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <motion.input
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <motion.input
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Middle Column: Girl Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center items-center"
          >
            <Image
              src="/image/girl.png"
              alt="Girl Illustration"
              width={180}
              height={180}
            />
          </motion.div>

          {/* Right Column: Input Fields */}
          <div className="flex flex-col space-y-6">
            <motion.input
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              type="text"
              name="phoneNo"
              placeholder="Phone Number"
              value={formData.phoneNo}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <motion.input
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              type="text"
              name="emergencyNo"
              placeholder="Emergency Number"
              value={formData.emergencyNo}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <motion.input
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              type="email"
              name="emailId"
              placeholder="Email id"
              value={formData.emailId}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <motion.input
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Submit Button Below the Form */}
      <motion.button
        onClick={onSubmit}
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
