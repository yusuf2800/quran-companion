"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import { arabic } from "./surah";
import { eng_names } from "@/app/(homepage)/bodyData";

const QuranVerse = ({ surah, valid }: { surah: number; valid: boolean }) => {
  const router = useRouter();
  const navigate = () => router.push("/");

  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const surahs = [
    "",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760541312/Surat_Al-Fatiha_-_Mishary_Rashid_Alafasy_a2btfx.mp4",
    "https://pixeldrain.com/api/file/uCeXBG7C",
    "https://pixeldrain.com/api/file/MNVkVGgq",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760553812/Surah_An_Nisa_-_Mishary_Rashid_Alafasy_-_Quran_Recitation_l96gi5.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760554178/Surah_Al-Ma_ida_-_Mishary_Rashid_Alafasy_%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D9%85%D8%A7%D9%8A%D9%94%D8%AF%D8%A9_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_-_Alafasy_gf32bq.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760554329/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D8%A7%D9%94%D9%86%D8%B9%D8%A7%D9%85_1419%D9%87%D9%80_1998%D9%85_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surah_Al-An_am_Mishary_Alafasy_-_Alafasy_fxqp9f.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760554503/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D8%A7%D9%94%D8%B9%D8%B1%D8%A7%D9%81_1422%D9%87%D9%80_2001%D9%85_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surah_Al-A_raf_Mishary_Alafasy_-_Alafasy_qoivrz.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760554589/Surat_Al-Anfal_-_Mishary_Rashid_Alafasy_-_Alafasy_ywlqak.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760554821/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D8%AA%D9%88%D8%A8%D8%A9_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surah_At-Tawba_Mishary_Rashid_Alafasy_-_Alafasy_dhjfit.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760558015/Surat_Yunus_-_Mishary_Rashid_Alafasy_-_Alafasy_dn1vre.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760558229/Surat_Hood_-_Mishary_Rashid_Alafasy_-_Alafasy_evcbqa.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760558323/%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_%D8%B3%D9%88%D8%B1%D8%A9_%D9%8A%D9%88%D8%B3%D9%81_Surat_Yusuf_-_Mishary_Rashid_Alafasy_-_Alafasy_s84ulj.mp3",
    "https://res.cloudinary.com/ddsiorkrx/video/upload/v1760558478/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D8%B1%D8%B9%D8%AF_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surat_Ar-Ra_d_-_Mishary_Alafasy_-_Alafasy_w7ql4c.mp3",
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760559686/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%95%D8%A8%D8%B1%D8%A7%D9%87%D9%8A%D9%85_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surat_ibrahim_-_Mishary_Alafasy_-_Alafasy_xmfuje.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760559760/Surat_Al-Hijr_-_Mishary_Rashed_Alafasy_-_Alafasy_bhxfma.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760559843/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D9%86%D8%AD%D9%84_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surat_An-Nahl_Mishary_Rashed_Alafasy_1426_-_Alafasy_atdo69.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560262/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D8%A7%D9%95%D8%B3%D8%B1%D8%A7%D8%A1_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surat_Al-Isra_-_Mishary_Rashed_Alafasy_-_Alafasy_zqz2ru.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560326/Surat_Al-Kahf_-_Mishary_Rashed_Alafasy_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D9%83%D9%87%D9%81_-_Alafasy_s9iytm.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560357/%D8%B3%D9%88%D8%B1%D8%A9_%D9%85%D8%B1%D9%8A%D9%85_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surat_Maryam_-_Mishary_Rashed_Alafasy_-_Alafasy_pl4azo.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560388/Surat_Ta_Ha_-_Mishary_Rashed_Alafasy_-_Alafasy_j8nlrg.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560416/Surat_Al-Anbiya_-_Mishary_Rashed_Alafasy_-_Alafasy_togrsd.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560480/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D8%AD%D8%AC_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surat_Al-Hajj_-_Mishary_Rashed_Alafasy_-_Alafasy_cdavfw.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560611/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D9%85%D9%88%D9%94%D9%85%D9%86%D9%88%D9%86_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surah_Al-Mu_minun_-_Mishary_Rashid_Alafasy_-_Alafasy_aitgeu.mp3',
    'https://res.cloudinary.com/ddsiorkrx/video/upload/v1760560654/%D8%B3%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D9%86%D9%88%D8%B1_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_Surat_An-Nur_-_Mishary_Rashed_Alafasy_-_Alafasy_luifwv.mp3'
  ];

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
    setCurrentTime(time);
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

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {}
  };

  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "0:00";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
  };

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
            {surah > 10 ? (surah > 100 ? surah : `0${surah}`) : `00${surah}`}
          </h1>
          <h1 className="font-quranCommon mt-5 mb-10 pt-6 text-center text-4xl">
            ﷽
          </h1>
        </div>

        <div className="mx-2 sm:mx-10 md:mx-24">
          {arabic[0].map((ayah, index) => (
            <div key={index} className={`mb-6`}>
              <p className="font-kfguthmani mb-2 text-right text-2xl leading-loose sm:text-3xl">
                {ayah}
              </p>
              <div className="h-[1.5px] w-full bg-gray-600"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center border-none bg-gray-800 p-2.5 shadow-xl">
        <input
          type="range"
          className="h-1.5 w-full appearance-none rounded-lg bg-gray-300 accent-emerald-500 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-500 [&::-ms-thumb]:h-5 [&::-ms-thumb]:w-5 [&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
          min="0"
          max={isNaN(duration) ? 0 : duration}
          value={currentTime}
          onChange={handleSeek}
        />

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

        <audio ref={audioRef} src={surahs[surah]} />
      </div>
    </>
  );
};

export default QuranVerse;
