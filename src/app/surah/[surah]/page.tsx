"use client";
import { useState, useEffect, use } from "react";
import QuranVerse from "./QuranVerse";

const Page = ({ params }: { params: { juz: string; quarters: string } }) => {
  const { surah } = use(params);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (Number(surah) > 30 ) {
      setValid(false);
    }
  }, [surah]);

  return (
    <>
      <div className="mb-20 flex min-h-screen overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75% selection:bg-emerald-400">
        <QuranVerse surah={surah} valid={valid} />
      </div>
    </>
  );
};

export default Page;
