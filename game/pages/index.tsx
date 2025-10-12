
import type { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Auth from '../components/Auth';
import { useEffect, useState } from 'react';
import { getAdminMode, setAdminMode } from '../lib/admin';

interface Level {
  id: string;
  title: string;
  description: string;
  goal: string;
}

interface HomeProps {
  levels: Level[];
}

const Home: NextPage<HomeProps> = ({ levels }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(getAdminMode());
  }, []);

  const toggleAdminMode = () => {
    const newAdminMode = !isAdmin;
    setIsAdmin(newAdminMode);
    setAdminMode(newAdminMode);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      <div className="container mx-auto p-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold text-green-400">badcompany</h1>
            <p className="text-xl text-gray-400 mt-2">A game to hack LLM agents and improve AI security.</p>
          </div>
          <Auth />
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Mission</h2>
              <p className="text-gray-300">
                We build realistic agent systems and challenge you to break them. Your attacks help us understand and mitigate the risks of advanced AI. This is not just a game; it&apos;s a collaborative effort to make AI safer.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Global Ranking</h2>
              <p className="text-gray-300">Compete with other hackers and get your name on the leaderboard. Scores are based on the novelty and success of your attacks.</p>
              <div className="mt-4">
                <Link href="/leaderboard" className="text-blue-400 hover:underline">View Leaderboard &rarr;</Link>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-8">Available Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {levels.map((level) => (
                <div key={level.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-400 transition-all">
                  <h3 className="text-xl font-bold">{level.title}</h3>
                  <p className="text-gray-400 mt-2">{level.description}</p>
                  <div className="mt-4">
                    <Link href={`/play/${level.id}`} className="inline-block bg-green-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-green-600">Play Now</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 badcompany. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-green-400">Docs</a>
            <a href="#" className="hover:text-green-400">GitHub</a>
          </div>
          <div className="mt-4">
            <button onClick={toggleAdminMode} className="text-xs text-gray-600 hover:text-gray-400">
              {isAdmin ? 'Disable Admin Mode' : 'Enable Admin Mode'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'config', 'levels.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const levels = JSON.parse(jsonData);

  return {
    props: {
      levels,
    },
  };
};

export default Home;
