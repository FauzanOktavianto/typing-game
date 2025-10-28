"use server";

import { db } from "@/lib/db";
import { gameResults, shareableResults } from "@/lib/db/schema";
import { getSession } from "@/lib/auth-server";

export async function shareGameResult(data: {
  shortId: string;
  wpm: number;
  accuracy: number;
  duration: number;
  wpmHistory?: Array<{ time: number; wpm: number }>;
}) {
  try {
    if (data.accuracy < 0 || data.accuracy > 100) {
      throw new Error("Invalid accuracy value");
    }
    if (data.wpm < 0 || data.wpm > 350) {
      throw new Error("Invalid WPM value");
    }
    if (data.duration < 0 || data.duration > 300) {
      throw new Error("Invalid duration value");
    }

    const session = await getSession();
    const userId = session?.user?.id || null;

    const [gameResult] = await db
      .insert(gameResults)
      .values({
        userId,
        wpm: data.wpm,
        accuracy: data.accuracy,
        duration: data.duration,
        textExcerpt: "",
        wpmHistory: data.wpmHistory || null,
      })
      .returning();

    await db.insert(shareableResults).values({
      shortId: data.shortId,
      gameResultId: gameResult.id,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sharing game result:", error);
    throw new Error("Failed to share game result");
  }
}

