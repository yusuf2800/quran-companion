"use client";
import QuranVerse from "./QuranVerse";
import { useState, useEffect } from "react";

const Page = ({ params }: { params: { juz: string; quarters: string } }) => {
  const { juz, quarters } = params;
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (Number(juz) > 30 || Number(quarters) > 4) {
      setValid(false);
    }
  }, [juz, quarters]);

  return (
    <>
      <div className="mb-20 flex min-h-screen overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75% selection:bg-emerald-400">
        <QuranVerse juz={juz} quarter={quarters} valid={valid} />
      </div>
    </>
  );
};

export default Page;
