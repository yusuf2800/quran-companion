"use client";
import { AudioBtn } from "./AudioBtn";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BodyProp {
  onClick: () => void;
};

export const Body = ({ onClick }: BodyProp) => {
  const [visible, setVisible] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartTyping(true);
    }, 1200);
  }, [])
  

  setTimeout(() => {
    setVisible(true);
  }, 3000);

  return (
    <>
      <motion.div className="flex min-h-screen min-w-screen flex-col items-center justify-center">
        {startTyping && (
          <TypeAnimation
            className="mx-3 mb-5 text-center text-4xl leading-14 font-bold text-emerald-300 selection:text-gray-700 sm:text-4xl"
            sequence={[
              "Discover The Divine Words",
              2000,
              "",
              500,
              "Unlock Your Potential",
              2000,
              "",
              1000,
              "Build Your Akhirah",
              2000,
              "",
              1000,
            ]}
            speed={20}
            deletionSpeed={20}
            repeat={Infinity}
          ></TypeAnimation>
        )}
        {visible && <AudioBtn onClick={onClick}/>}
      </motion.div>
    </>
  );
};

