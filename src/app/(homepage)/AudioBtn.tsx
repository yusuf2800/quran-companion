import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface AudioBtnProp {
  onClick: () => void;
}

export const AudioBtn = ({ onClick }: AudioBtnProp) => {
  return (
    <>
      <motion.button
        className="relative flex cursor-pointer rounded-full border border-emerald-400 px-3 py-2.5 text-emerald-400 transition-colors hover:bg-emerald-900"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        onClick={onClick}
      >
        <span className="ml-1 selection:text-gray-700">Audio Recitations</span>
        <span className="ml-1">
          <ArrowDown />
        </span>
      </motion.button>
    </>
  );
};
