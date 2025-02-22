"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaInstagram, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    emailId: "", 
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(form.emailId.length > 0 && form.password.length > 0));
  }, [form]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", form);
      console.log(response.data);
      toast.success("Login successful!");
      router.push("/mainpage");
    } catch (error ) {
      toast.dismiss();
      toast.error(
        `Login failed: ${error.response?.data?.error || "Something went wrong"}`
      );
      console.error("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-pink-100">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-3/5 flex flex-col justify-center items-center p-10 border-r border-black"
      >
        <h2 className="text-4xl font-bold text-pink-600 mb-8">
          Welcome Back, Saheli!
        </h2>
        <input
          type="email"
          name="emailId"
          value={form.emailId}
          onChange={(e) => setForm({ ...form, emailId: e.target.value })}
          placeholder="Enter your email"
          className="w-[400px] text-black p-4 mb-4 rounded-full border border-pink-400 focus:outline-none text-lg"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Enter your password"
          className="w-[400px] p-4 mb-4 rounded-full border border-pink-400 focus:outline-none text-lg"
        />
        <div className="flex justify-between w-[400px] text-sm text-pink-600">
          <label>
            <input type="checkbox" className="mr-1" /> Remember Me?
          </label>
        </div>
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={buttonDisabled}
          whileHover={{ scale: buttonDisabled ? 1 : 1.05 }}
          whileTap={{ scale: buttonDisabled ? 1 : 0.95 }}
          className={`mt-6 w-[400px] ${
            buttonDisabled ? "bg-gray-400" : "bg-pink-600"
          } text-white py-3 rounded-full font-bold text-lg`}
        >
          {loading ? "Loading..." : "Login"}
        </motion.button>
        <div className="mt-6 text-pink-600 font-bold">OR</div>
        <div className="flex gap-6 mt-4">
          <FaGoogle className="text-4xl text-red-500 cursor-pointer" />
          <FaInstagram className="text-4xl text-pink-500 cursor-pointer" />
          <FaFacebook className="text-4xl text-blue-500 cursor-pointer" />
        </div>
        <Link href="/sign-up-as-Saheli">
          <p className="mt-6 text-pink-600">Don’t have an account?</p>
        </Link>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-2/5 flex justify-center items-center bg-[#FFECF2]"
      >
        <div className="relative w-3/5 h-3/5">
          <Image
            src="/image/ChaloSaheliLogo.png"
            alt="Chalo Saheli"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </motion.div>
    </div>
  );
}
