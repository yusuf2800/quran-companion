"use client";

import { useState, useEffect } from "react";
import QuranVerse from "./QuranVerse";

interface Props {
  params: Promise<{ surah: string }>;
}

const Page = ({ params }: Props) => {
  const [resolvedParams, setResolvedParams] = useState<{ surah: string } | null>(null);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
      
      if (Number(resolved.surah) > 114 || Number(resolved.surah) < 1) {
        setValid(false);
      }
    };
    
    resolveParams();
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className="mb-20 flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        Loading...
      </div>
    );
  }

  const { surah } = resolvedParams;

  return (
    <div className="mb-20 flex min-h-screen overflow-x-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 to-75% selection:bg-emerald-400">
      <QuranVerse surah={Number(surah)} valid={valid} />
    </div>
  );
};

export default Page;