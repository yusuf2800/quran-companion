"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { juzs, surahs } from "./bodyData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Tabs {
  name: string;
  value: string;
}

export const SurahCard = () => {
  const router = useRouter();
  const navigate = (page: string) => {
    router.push(`${page}`);
  };

  const tabs: Tabs[] = [
    { name: "Quarter", value: "quarters" },
    { name: "Surah", value: "surahs" },
    { name: "Juz", value: "juz" },
  ];

  const nums: number[] = [...Array(4)].map((_, i) => i + 1);

  const [currentTab, setCurrentTab] = useState<string>("quarters");

  useEffect(() => {
    const savedTab = localStorage.getItem("currentTab");

    if (savedTab) setCurrentTab(savedTab);
  }, []);

  return (
    <div className="mt-30 mb-10">
      <Tabs
        value={currentTab}
        className="flex w-screen justify-center overflow-y-auto"
        onValueChange={(val) => {
          setCurrentTab(val);
          localStorage.setItem("currentTab", val);
        }}
      >
        <motion.div
          className="mx-auto h-9 w-screen bg-transparent shadow-2xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <TabsList className="h-full w-screen rounded-none bg-transparent text-center shadow-2xl selection:bg-transparent">
            {tabs.map(({ name, value }, index) => (
              <TabsTrigger
                key={index}
                value={value}
                className="cursor-pointer p-3 text-[16px] font-[700] text-white data-[state=active]:border-b-emerald-400 data-[state=active]:text-emerald-400"
                onClick={() => localStorage.setItem("currentTab", value)}
              >
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>
        <TabsContent value="quarters">
          <div className="mx-3 my-6 grid max-w-screen auto-rows-fr place-items-center gap-x-5 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
            {juzs.map(({ juz }, i) => (
              <motion.div
                key={i}
                className="relative flex w-[100%] flex-col gap-y-4 rounded-[6px] bg-gray-800/50 p-3 py-5 font-[700] text-white shadow-xl backdrop-blur-lg selection:bg-emerald-400 hover:outline-2 hover:outline-emerald-300"
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="text-lg font-extrabold">Juz {juz}</div>
                {nums.map((num, idx) => (
                  <div
                    key={idx}
                    className="relative flex w-full cursor-pointer rounded-xs p-3 text-white shadow-lg hover:outline-2 hover:outline-emerald-300"
                    onClick={() => {
                      navigate(`/${juz}/quarter/${idx + 1}`);
                    }}
                  >
                    <div className="my-auto ml-2 flex aspect-square w-11 rotate-45 items-center justify-center rounded-[3px] bg-emerald-400 selection:bg-emerald-400">
                      <label className="-rotate-45 cursor-pointer text-[15px]">
                        {num}
                      </label>
                    </div>

                    <div className="my-auto mr-[10px] flex w-full flex-col items-end justify-end selection:bg-emerald-400">
                      <label className="cursor-pointer text-[12px] font-[600] uppercase"></label>
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="surahs">
          <div className="mx-3 my-6 grid max-w-screen auto-rows-fr place-items-center gap-x-5 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
            {surahs.map(({ surah, ayah, eng_name, translation }, i) => (
              <motion.div
                key={i}
                className="relative mr-1.5 flex h-20 w-full cursor-pointer rounded-[6px] bg-gray-800/50 p-3 font-[700] shadow-xl backdrop-blur-lg hover:outline-2 hover:outline-emerald-300"
                onClick={() => navigate(`/surah/${i + 1}`)}
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="relative flex w-full justify-between text-white">
                  <div className="flex flex-row">
                    <div className="mx-3 my-auto flex aspect-square w-10 rotate-45 items-center justify-center rounded-[3px] bg-emerald-400 selection:bg-emerald-400">
                      <label className="-rotate-45 cursor-pointer text-[19px]">
                        {surah}
                      </label>
                    </div>
                    <div className="mx-2 flex w-[100px] flex-col justify-center text-[16px] selection:bg-emerald-400">
                      <span className="">{eng_name}</span>
                      <span className="text-[11px] font-[600]">
                        {translation}
                      </span>
                    </div>
                  </div>
                  <div className="my-auto mr-[10px] flex w-[95%] flex-col items-end justify-end selection:bg-emerald-400">
                    <label className="font-surahNameV4 cursor-pointer text-2xl font-[500]">
                      {surah > 9
                        ? `${surah > 99 ? `surah${surah}` : `surah0${surah}`} `
                        : `surah00${surah}`}
                    </label>
                    <label className="leading-tighter cursor-pointer text-[11px] font-bold uppercase">
                      {ayah} Ayahs
                    </label>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="juz">
          <div className="mx-3 my-6 grid max-w-screen auto-rows-fr place-items-center gap-x-5 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
            {juzs.map(({ juz, ayah }, i) => (
              <motion.div
                key={i}
                className="relative flex h-20 w-[100%] cursor-pointer rounded-[6px] bg-gray-800/50 p-3 font-[700] shadow-xl backdrop-blur-lg hover:outline-2 hover:outline-emerald-300"
                onClick={() => navigate(`/juz/${i + 1}`)}
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="relative flex w-full text-white">
                  <div className="my-auto ml-2 flex aspect-square w-11 rotate-45 items-center justify-center rounded-[3px] bg-emerald-400 selection:bg-emerald-400">
                    <label className="-rotate-45 cursor-pointer text-[15px]">
                      {juz}
                    </label>
                  </div>
                  <div className="my-auto mr-[10px] flex w-full flex-col items-end justify-end selection:bg-emerald-400">
                    <label className="font-surahName mb-1 cursor-pointer text-lg font-extrabold">
                      {juz > 9 ? `j0${juz}` : `j00${juz}`}
                    </label>
                    <label className="leading-tighter cursor-pointer text-[11px] font-bold uppercase">
                      {ayah} Ayahs
                    </label>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
