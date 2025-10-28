"use client";

import Link from "next/link";
import { Keyboard } from "lucide-react";

export function BottomNav() {
  return (
    <Link
      href="/"
      className="fixed bottom-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground/60 hover:text-muted-foreground transition-colors"
      aria-label="Back to typing game"
    >
      <Keyboard className="w-5 h-5" />
    </Link>
  );
}

