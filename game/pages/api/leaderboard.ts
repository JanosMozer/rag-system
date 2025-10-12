import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
// [...nextauth].ts exports the default NextAuth handler. For getting
// server session we can call unstable_getServerSession without passing
// authOptions here (NextAuth will pick up configuration from the route).

// Attempt to import Vercel KV. If it's not configured or not available
// in the environment where this is run, fall back to a simple in-memory
// leaderboard. The in-memory store is ephemeral and only intended for
// local testing / preview. Replace with a proper persistent store for
// production (e.g., Vercel KV) as documented in webpage.md.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let kv: any = null;
try {
  // dynamic import to avoid require() in ESM/TS contexts
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  import('@vercel/kv').then((mod) => { kv = mod; }).catch(() => { kv = null; });
} catch {
  kv = null;
}

interface LeaderboardEntry {
  name: string;
  levelId: string;
  score: number;
  timestamp: string;
}

// In-memory fallback store: { [levelId]: LeaderboardEntry[] }
const inMemoryStore: Record<string, LeaderboardEntry[]> = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === 'POST') {
  // Cast to any to avoid strict type requirement for the optional options param
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await (unstable_getServerSession as any)(req, res, {});

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { levelId, score } = req.body || {};

    if (!levelId || typeof score !== 'number') {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const entry: LeaderboardEntry = {
      name: session.user?.name || 'Anonymous',
      levelId,
      score,
      timestamp: new Date().toISOString(),
    };

    if (kv && kv.kv) {
      // Use Vercel KV if available (production path)
      await kv.kv.zadd(`leaderboard:${levelId}`, { score, member: JSON.stringify(entry) });
      return res.status(200).json(entry);
    }

    // Fallback: push to in-memory store
    inMemoryStore[levelId] = inMemoryStore[levelId] || [];
    inMemoryStore[levelId].push(entry);
    // sort desc
    inMemoryStore[levelId].sort((a, b) => b.score - a.score);

    return res.status(200).json(entry);
  } else if (method === 'GET') {
    const { levelId } = req.query || {};

    if (!levelId || Array.isArray(levelId)) {
      return res.status(400).json({ error: 'Missing levelId query parameter' });
    }

    if (kv && kv.kv) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const leaderboard = await kv.kv.zrange(`leaderboard:${levelId}`, 0, 100, { withScores: true, rev: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entries = (leaderboard as any[]).map((entry, i) => {
        const data = JSON.parse(entry as string);
        return {
          rank: i + 1,
          ...data,
        };
      });
      return res.status(200).json(entries);
    }

    // Fallback: return in-memory entries
    const arr = inMemoryStore[levelId] || [];
    const entries = arr.map((e, i) => ({ rank: i + 1, ...e }));
    return res.status(200).json(entries);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method ?? 'UNKNOWN'} Not Allowed`);
}