import { db } from "@/lib/db";
import { shareableResults, gameResults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Navigation } from "@/components/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { WPMChartWrapper } from "@/components/wpm-chart-wrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}): Promise<Metadata> {
  const { shortId } = await params;
  const shareable = await db.query.shareableResults.findFirst({
    where: eq(shareableResults.shortId, shortId),
  });

  if (!shareable) {
    return {
      title: "Result not found",
    };
  }

  const gameResult = await db.query.gameResults.findFirst({
    where: eq(gameResults.id, shareable.gameResultId),
    with: {
      user: true,
    },
  });

  if (!gameResult) {
    return {
      title: "Result not found",
    };
  }

  return {
    title: `${gameResult.wpm} WPM • ${gameResult.accuracy}% Accuracy`,
    description: `Check out this typing test result: ${gameResult.wpm} WPM with ${gameResult.accuracy}% accuracy`,
    openGraph: {
      title: `${gameResult.wpm} WPM • ${gameResult.accuracy}% Accuracy`,
      description: `Check out this typing test result: ${gameResult.wpm} WPM with ${gameResult.accuracy}% accuracy`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${gameResult.wpm} WPM • ${gameResult.accuracy}% Accuracy`,
      description: `Check out this typing test result: ${gameResult.wpm} WPM with ${gameResult.accuracy}% accuracy`,
    },
  };
}

export default async function SharedResultPage({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;
  const shareable = await db.query.shareableResults.findFirst({
    where: eq(shareableResults.shortId, shortId),
  });

  if (!shareable) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Result not found</h1>
            <p className="text-gray-600 dark:text-gray-400">
              This result may have expired or doesn&apos;t exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const gameResult = await db.query.gameResults.findFirst({
    where: eq(gameResults.id, shareable.gameResultId),
    with: {
      user: true,
    },
  });

  if (!gameResult) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Result not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <div className="flex flex-col items-start justify-center min-h-screen p-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-start mb-16">
          <div className="text-6xl md:text-[120px] font-normal leading-none tracking-tighter mb-4">
            <span className="text-orange-500">{gameResult.wpm}</span>
            <span className="text-gray-500"> WPM</span>
            </div>
          <div className="text-6xl md:text-[120px] font-normal leading-none tracking-tighter">
            <span className="text-orange-500">{gameResult.accuracy}%</span>
            <span className="text-gray-500"> ACC</span>
            </div>
          </div>

        {gameResult.wpmHistory && gameResult.wpmHistory.length > 0 && (
          <div className="w-full mb-8 mt-8">
            <WPMChartWrapper data={gameResult.wpmHistory} />
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Link
            href="/"
            className="text-lg text-orange-500 cursor-pointer hover:text-orange-600 transition-colors uppercase"
          >
            Play again
          </Link>
          <span className="text-lg text-gray-400 uppercase">
            Shared on {new Date(gameResult.createdAt).toLocaleDateString()}
            {gameResult.user && ` by ${gameResult.user.name}`}
          </span>
        </div>
      </div>
    </div>
  );
}

