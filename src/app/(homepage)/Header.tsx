"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const navigate = () => router.push("");

  return (
    <header className="fixed top-4 left-3 z-50 flex items-center rounded-full bg-transparent/30 py-1.5 shadow-2xl backdrop-blur-2xl selection:bg-emerald-400">
      <motion.label
        className="left-0 cursor-pointer text-xl font-extrabold text-emerald-400 selection:text-gray-700 mx-4.5 sm:text-xl"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        onClick={() => navigate()}
      >
        Quran Companion
      </motion.label>
    </header>
  );
};
