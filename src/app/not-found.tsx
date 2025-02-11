"use client";
import notFound from "@/assets/404.gif";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white">
      {/* 404 GIF */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl h-80 relative"
      >
        <Image
          src={notFound}
          alt="404 Not Found"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Message */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl md:text-5xl font-bold text-purple-800 mt-8"
      >
        404 - Page Not Found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-lg text-gray-500  mt-4 max-w-lg mb-8"
      >
        Oops! The page you are looking for doesn&apos;t exist.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Link
          href="/"
          className=" px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md dark:bg-purple-500 dark:hover:bg-purple-600"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
