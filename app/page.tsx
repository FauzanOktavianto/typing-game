"use client";

import { TypingGame } from "@/components/typing-game";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <TypingGame />
    </div>
  );
}
