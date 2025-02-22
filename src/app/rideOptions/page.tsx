"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const RideOptions = () => {
  const rides = [
    { name: 'Gulmohar Ride', src: '/image/gulmohar.jpg' },
    { name: 'Raftar Ride', src: '/image/raftar.jpeg' },
    { name: 'Jhilmil Ride', src: '/image/jhilmil.jpeg' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <motion.h1
        className="text-3xl font-bold text-pink-600 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How would you like to ride, Saheli?
      </motion.h1>
      <motion.p
        className="text-pink-500 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Choose your comfort - and travel your way, safely and hassle-free!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rides.map((ride, index) => (
          <motion.div
            key={ride.name}
            className="text-center bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <div className="w-[300px] h-[300px] overflow-hidden rounded-lg">
              <Image
                src={ride.src}
                alt={ride.name}
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <motion.button
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {ride.name}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RideOptions;