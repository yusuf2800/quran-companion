"use client";

import { useState, useEffect } from "react";
import QuranVerse from "./QuranVerse";

const Page = ({ params }: { params: { juz: string; quarters: string } }) => {
  const { juz, quarters } = params;
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (Number(juz) > 30 || Number(quarters) > 4) {
      setValid(false);
    }
  }, [juz, quarters]);

  return (
    <div className="mb-20 flex min-h-screen overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75% selection:bg-emerald-400">
      {/* ✅ changed "quarters" to "quarter" */}
      <QuranVerse juz={Number(juz)} quarter={Number(quarters)} valid={valid} />
    </div>
  );
};

export default Page;
