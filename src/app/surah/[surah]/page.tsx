"use client";
import { useState, useEffect } from "react";
import QuranVerse from "./QuranVerse";

interface PageProps {
  params: {
    juz: string;
    quarters: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { juz, quarters } = params;
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (Number(juz) > 30) {
      setValid(false);
    }
  }, [juz]);

  return (
    <div className="mb-20 flex min-h-screen overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75% selection:bg-emerald-400">
      <QuranVerse juz={juz} quarters={quarters} valid={valid} />
    </div>
  );
};

export default Page;
