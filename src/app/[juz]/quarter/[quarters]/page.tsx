"use client";

import { useState, useEffect } from "react";
import QuranVerse from "./QuranVerse";

// Update the type to match Next.js 15+ expectations
interface Props {
  params: Promise<{ juz: string; quarters: string }>;
}

const Page = ({ params }: Props) => {
  const [resolvedParams, setResolvedParams] = useState<{ juz: string; quarters: string } | null>(null);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    // Resolve the params promise
    params.then((resolved) => {
      setResolvedParams(resolved);
      
      // Validate after resolving
      if (Number(resolved.juz) > 30 || Number(resolved.quarters) > 4) {
        setValid(false);
      }
    });
  }, [params]);

  if (!resolvedParams) {
    return <div className="mb-20 flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">Loading...</div>;
  }

  const { juz, quarters } = resolvedParams;

  return (
    <div className="mb-20 flex min-h-screen overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75% selection:bg-emerald-400">
      <QuranVerse
        juz={Number(juz)}
        quarter={Number(quarters)}
        valid={valid}
      />
    </div>
  );
};

export default Page;