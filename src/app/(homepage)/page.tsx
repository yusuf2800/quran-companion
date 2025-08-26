"use client";
import { Header } from "./Header";
import { Body } from "./Body";
import { SurahCard } from "./SurahCard";
import { useEffect, useRef } from "react";

const Page = () => {
  useEffect(() => {
    document.title = "Quran Companion";
  }, []);

  const surahsRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    surahsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <div className="flex min-h-screen max-w-screen flex-col items-center justify-center overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75%">
          <Body onClick={() => handleClick()} />
          <div ref={surahsRef}>
            <SurahCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
