"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import { arabic } from "./surah";
import { eng_names } from "@/app/(homepage)/bodyData";

const QuranVerse = ({
  surah,
  valid,
}: {
  surah: number;
  valid: boolean;
}) => {
  const router = useRouter();
  const navigate = () => router.push("/");

  // ✅ Hooks always at the top
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeAyahIndex, setActiveAyahIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Stable handler for time updates
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    // if you want activeAyahIndex later, compute it here
  }, []);

  // ✅ Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
    setCurrentTime(time);
  };

  // ✅ Effect for metadata + time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [handleTimeUpdate]);

  // ✅ Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // ✅ Format time safely
  const formatDuration = (durationSeconds: number) => {
    if (!durationSeconds || isNaN(durationSeconds)) return "0:00";
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // ✅ Only return invalid screen AFTER hooks
  if (!valid) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-center text-2xl font-semibold text-white sm:text-4xl md:text-5xl">
          Something Went Wrong.
        </h1>
      </div>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex w-screen items-center justify-between bg-transparent/30 p-4 backdrop-blur-2xl selection:bg-emerald-400">
        <motion.label
          className="left-0 mx-3 cursor-pointer text-lg font-extrabold text-emerald-400 selection:text-gray-700 sm:text-xl"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onClick={navigate}
        >
          Quran Companion
        </motion.label>
        <div className="mx-5 flex items-center gap-x-5">
          <h1 className="cursor-pointer px-2 py-2.5 font-bold text-white">
            Reciters
          </h1>
          <h1 className="px-2 py-2.5 font-bold text-white">
            {`Surah ${eng_names[surah]}`}
          </h1>
        </div>
      </header>

      <div className="mt-5 flex justify-center px-4 text-white sm:px-8 md:px-24">
        <div className="w-screen">
          <h1 className="font-surahName mt-5 text-center text-4xl">
            Surah{" "}
            {surah > 10
              ? surah > 100
                ? surah
                : `0${surah}`
              : `00${surah}`}
          </h1>
          <h1 className="font-quranCommon mt-5 mb-10 pt-6 text-center text-4xl">
            ﷽
          </h1>
        </div>

        <div className="mx-2 sm:mx-10 md:mx-24">
          {arabic[0].map((ayah, index) => (
            <div
              key={index}
              className={`mb-6 ${
                index === activeAyahIndex ? "bg-gray-600" : ""
              }`}
            >
              <p className="font-kfguthmani mb-2 text-right text-2xl leading-loose sm:text-3xl">
                {ayah}
              </p>
              <div className="h-[1.5px] w-full bg-gray-600"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center border-none bg-gray-800 p-2.5 shadow-xl">
        {/* Progress bar */}
        <input
          type="range"
          className="h-1.5 w-full appearance-none rounded-lg bg-gray-300 accent-emerald-500 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-500 [&::-ms-thumb]:h-5 [&::-ms-thumb]:w-5 [&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
          min="0"
          max={isNaN(duration) ? 0 : duration}
          value={currentTime}
          onChange={handleSeek}
        />

        {/* Time + Controls */}
        <div className="mt-2 flex w-full items-center justify-between">
          <span className="text-xs text-gray-400">
            {formatDuration(currentTime)}
          </span>

          <span className="text-xs text-gray-400">
            {formatDuration(duration)}
          </span>
        </div>

        <div className="flex gap-x-5">
          <button
            onClick={togglePlay}
            className="cursor-pointer rounded-full bg-emerald-500 p-3 text-white shadow-lg transition hover:bg-emerald-600"
          >
            {isPlaying ? <IoPause size={15} /> : <IoPlay size={15} />}
          </button>
        </div>

        <audio ref={audioRef} src={`/audios/${surah}.mp3`} />
      </div>
    </>
  );
};

export default QuranVerse;
