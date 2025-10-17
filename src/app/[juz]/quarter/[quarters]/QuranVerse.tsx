"use client";
import { arabic, alafsayTimestamps, translation } from "./quran";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

const QuranVerse = ({
  juz,
  quarter,
  valid,
}: {
  juz: number;
  quarter: number;
  valid: boolean;
}) => {
  const router = useRouter();
  const navigate = () => router.push("/");

  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeAyahIndex, setActiveAyahIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const t = audio.currentTime;
    setCurrentTime(t);
    setDuration(audio.duration || 0);

    const ayahs = alafsayTimestamps[juz]?.[quarter] ?? [];
    const idx = ayahs.findIndex((a) => t >= a.start && t < a.end);
    setActiveAyahIndex(idx >= 0 ? idx : null);
  }, [juz, quarter]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
    setCurrentTime(time);

    const ayahs = alafsayTimestamps[juz]?.[quarter] ?? [];
    const idx = ayahs.findIndex((a) => time >= a.start && time < a.end);
    setActiveAyahIndex(idx >= 0 ? idx : null);
  };

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

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatDuration = (durationSeconds: number) => {
    if (!durationSeconds || isNaN(durationSeconds)) return "0:00";
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const reciters = ["Mishary Rashid Alafsay", "Yasser Al Dosari"];

  const [, setTypeReciter] = useState("Mishary Rashid Alafsay");

  useEffect(() => {
    if (activeAyahIndex === null) return;
    const el = ayahRefs.current[activeAyahIndex];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeAyahIndex]);

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
      <header className="fixed top-0 left-0 z-50 flex w-screen items-center justify-between bg-transparent/30 backdrop-blur-2xl selection:bg-emerald-400">
        <motion.label
          className="left-0 mx-3 cursor-pointer text-lg font-extrabold text-emerald-400 selection:text-gray-700"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onClick={navigate}
        >
          Quran Companion
        </motion.label>

        <div className="mx-5 flex items-center gap-x-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer flex-row border-0 px-10 font-extrabold text-white">
              Reciters <ChevronDown size={20} className="my-auto ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3 rounded-[3px] border-0 bg-gray-800 font-semibold text-white shadow-lg selection:bg-emerald-400">
              {reciters.map((reciter, index) => (
                <DropdownMenuItem
                  key={index}
                  className="cursor-pointer border-0 text-white hover:bg-gray-700"
                  onClick={() => setTypeReciter(reciter)}
                >
                  {reciter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <h1 className="px-2 py-2.5 font-bold text-white">
            {`Quarter ${quarter} - Juz ${juz}`}
          </h1>
        </div>
      </header>

      <div className="mx-2 mt-24 max-w-screen">
        <div className="px-4 text-white sm:px-8">
          <div className="my-12 flex items-center justify-center">
            <h1 className="font-quranCommon mx-auto mt-4 text-center text-4xl sm:my-2">
              ﷽
            </h1>
          </div>

          <div className="mx-2 sm:mx-10">
            {arabic[juz][quarter].map((ayah, index) => (
              <div
                key={index}
                ref={(el) => {
                  ayahRefs.current[index] = el;
                }}
                className={`mb-6 rounded-lg p-3 transition-colors duration-300 ${
                  index === activeAyahIndex
                    ? "bg-gray-600 text-emerald-500"
                    : "bg-transparent"
                }`}
              >
                <p
                  className={`font-indopak mb-2 text-right text-2xl leading-loose sm:text-3xl ${
                    index === activeAyahIndex ? "text-emerald-500" : ""
                  }`}
                >
                  {ayah}
                </p>
                <p className="mt-5 mb-6 text-base text-gray-300 sm:text-lg">
                  {translation[juz][quarter][index]}
                </p>
                <div className="h-[1.5px] w-full bg-gray-600"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center border-none bg-gray-800 shadow-xl">
        <input
          type="range"
          className="h-1 w-screen appearance-none bg-gray-300 accent-emerald-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-500 [&::-ms-thumb]:h-4 [&::-ms-thumb]:w-4 [&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
          min="0"
          max={isNaN(duration) ? 0 : duration}
          value={currentTime}
          style={{
            background: `linear-gradient(to right, #10b981 ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%)`,
          }}
          onChange={handleSeek}
        />

        <div className="mx-2 flex w-full justify-between">
          <span className="text-md mx-3 my-auto text-gray-400">
            {formatDuration(currentTime)}
          </span>
          <button
            onClick={togglePlay}
            className="my-0.5 cursor-pointer rounded-full p-2` text-white transition hover:bg-emerald-600"
          >
            {isPlaying ? <IoPauseSharp size={25} /> : <IoPlaySharp size={25} />}
          </button>
          <span className="text-md mx-3 my-auto text-gray-400">
            {formatDuration(duration)}
          </span>
        </div>

        <audio ref={audioRef} src={"/audios/1.1.mp3"} />
      </div>
    </>
  );
};

export default QuranVerse;
