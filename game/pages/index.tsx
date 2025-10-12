
import type { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);

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
        <div className="flex gap-8">
          {/* Left sidebar tab */}
          {/* Left sidebar: to remove this sidebar entirely, delete this <aside> block. */}
          <aside className={`w-64 bg-gray-800 bg-opacity-40 backdrop-blur-md p-4 rounded-lg border border-gray-700 flex-col hidden md:flex ${sidebarOpen ? '' : 'hidden'}`}>
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#16A34A" strokeWidth="1.5"/>
                  <path d="M7 12h10" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <h1 className="text-2xl font-bold text-green-400">badcompany</h1>
                  <p className="text-xs text-gray-400">Hone your red-team skills</p>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <Link href="/leaderboard" className="px-3 py-2 rounded hover:bg-gray-700 transition-all">Global Ranking</Link>
              <a href="#about" className="px-3 py-2 rounded hover:bg-gray-700 transition-all">About</a>
              <a href="mailto:contact@badcompany.example" className="px-3 py-2 rounded hover:bg-gray-700 transition-all">Contact</a>
            </nav>

            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setShareOpen(!shareOpen)} className="flex-1 w-full bg-gradient-to-r from-green-500 to-green-400 text-gray-900 font-bold py-2 px-3 rounded hover:brightness-110 transition-all">
                  {shareOpen ? 'Close' : 'Share this game'}
                </button>
                <button onClick={() => setSidebarOpen(false)} title="Collapse sidebar" className="bg-gray-700 text-gray-200 p-2 rounded hover:bg-gray-600">✕</button>
              </div>
              {shareOpen && (
                <div className="mt-2 bg-gray-900 border border-gray-700 p-3 rounded">
                  <p className="text-xs text-gray-400 mb-2">Share link or copy/embed</p>
                  <div className="flex gap-2">
                    <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Link copied'); }} className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded">Copy link</button>
                    <button onClick={() => { const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out badcompany — a hacker-style LLM game')}&url=${encodeURIComponent(window.location.href)}`; window.open(twitter, '_blank'); }} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded">Twitter</button>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Small sidebar toggle for quick removal/restore */}
          {!sidebarOpen && (
            <div className="flex items-start">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden bg-gray-800 text-green-300 px-3 py-2 rounded ml-2">☰</button>
              <button onClick={() => setSidebarOpen(true)} className="hidden md:inline-block bg-gray-800 text-green-300 px-3 py-2 rounded ml-2">Show sidebar</button>
            </div>
          )}

          <main className="flex-1">
            <header className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold text-green-400">Retro hacking playground</h2>
                <p className="text-sm text-gray-400 mt-1">A game to hack LLM agents and improve AI security.</p>
              </div>
              <div className="hidden md:block text-sm text-gray-400">Play responsibly — for education only</div>
            </header>

            <section>
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-[0_6px_20px_rgba(16,185,129,0.06)]">
                  <h2 className="text-2xl font-bold text-green-400 mb-4">Mission</h2>
                  <p className="text-gray-300">
                    We build realistic agent systems and challenge you to break them. Your attacks help us understand and mitigate the risks of advanced AI. This is not just a game; it&apos;s a collaborative effort to make AI safer.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 id="about" className="text-3xl font-bold text-center text-green-400 mb-6">Available Games</h2>
              <div className="grid grid-cols-1 gap-8">
                {/* For now there is a single game: "LLM Agent in a company". Render it as a game card with nested levels. */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">LLM Agent in a company</h3>
                      <p className="text-gray-400 mt-2">Simulate a company&apos;s assistant agent and try to find prompt-injection and social engineering vulnerabilities.</p>
                    </div>
                    <div className="text-sm text-gray-400">Game • Cybersecurity</div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Levels</h4>
                    <div className="space-y-3">
                      {levels.map((level) => (
                        <div key={level.id} className="flex items-center gap-4 bg-gray-900 p-3 rounded border border-gray-800">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-gray-300">{level.title}</div>
                                <div className="text-xs text-gray-500">{level.description}</div>
                              </div>
                              <div className="w-48">
                                {/* simple progress bar stub - for now set 0% */}
                                <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
                                  <div className="bg-green-500 h-2 rounded" style={{ width: '0%' }} />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">Progress: 0%</div>
                          </div>
                          <div>
                            <Link href={`/play/${level.id}`} className="inline-block bg-gradient-to-r from-green-500 to-green-400 text-gray-900 font-bold py-2 px-4 rounded hover:brightness-110 transition-all">Play Now</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
          </main>
        </div>
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
