import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { db } from '@/lib/db';
import { shareableResults, gameResults, user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';
export const alt = 'Typing Test Result';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;

  const shareable = await db.query.shareableResults.findFirst({
    where: eq(shareableResults.shortId, shortId),
  });

  if (!shareable) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            color: 'white',
            fontSize: '48px',
          }}
        >
          Result not found
        </div>
      ),
      { ...size }
    );
  }

  const gameResult = await db.query.gameResults.findFirst({
    where: eq(gameResults.id, shareable.gameResultId),
  });

  if (!gameResult) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            color: 'white',
            fontSize: '48px',
          }}
        >
          Result not found
        </div>
      ),
      { ...size }
    );
  }

  let userImage: string | null = null;
  if (gameResult.userId) {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, gameResult.userId),
    });
    userImage = userData?.image || null;
  }

  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/CursorGothic-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '60px',
          fontFamily: 'CursorGothic',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <div
            style={{
              fontSize: '120px',
              fontWeight: '400',
              lineHeight: 1,
              letterSpacing: '-4px',
              display: 'flex',
              gap: '20px',
            }}
          >
            <span style={{ color: '#ff6b35', display: 'flex' }}>{gameResult.wpm}</span>
            <span style={{ color: '#6b7280', display: 'flex' }}>WPM</span>
          </div>
          <div
            style={{
              fontSize: '120px',
              fontWeight: '400',
              lineHeight: 1,
              letterSpacing: '-4px',
              display: 'flex',
              gap: '20px',
            }}
          >
            <span style={{ color: '#ff6b35', display: 'flex' }}>{gameResult.accuracy}%</span>
            <span style={{ color: '#6b7280', display: 'flex' }}>ACC</span>
          </div>
        </div>

        {userImage && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <img
              src={userImage}
              alt="User avatar"
              width="96"
              height="96"
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'CursorGothic',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}

