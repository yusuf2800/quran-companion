"use client";

import { useState, useEffect } from "react";
import QuranVerse from "./QuranVerse";

// Define the params interface
interface Params {
  surah: string;
}

interface Props {
  params: Params;
}

const Page = ({ params }: Props) => {
  const { surah } = params;
  const [valid, setValid] = useState(true);

  useEffect(() => {
    // Validate surah number range
    if (Number(surah) > 114 || Number(surah) < 1) { // assuming max surah is 114
      setValid(false);
    }
  }, [surah]);

  return (
    <div className="mb-20 flex min-h-screen overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75% selection:bg-emerald-400">
      {/* Convert surah to number before passing to QuranVerse */}
      <QuranVerse surah={Number(surah)} valid={valid} />
    </div>
  );
};

export default Page;
