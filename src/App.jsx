import React, { useState, useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import MiniPlayer from './components/MiniPlayer';
import ExpandedPlayer from './components/ExpandedPlayer';
import BulletinDetailModal from './components/BulletinDetailModal';
import PixModal from './components/PixModal';
import AdminModal from './components/AdminModal';

import HomeView from './views/HomeView';
import FeedView from './views/FeedView';
import SermonsView from './views/SermonsView';
import BulletinsView from './views/BulletinsView';
import MesasView from './views/MesasView';
import MoreView from './views/MoreView';

import { INITIAL_BULLETINS } from './data/mockData';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('simples_theme') || 'light';
  });

  const [activeTab, setActiveTab] = useState('home');
  const [bulletins, setBulletins] = useState(() => {
    const saved = localStorage.getItem('simples_bulletins');
    return saved ? JSON.parse(saved) : INITIAL_BULLETINS;
  });

  const [selectedBulletin, setSelectedBulletin] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPixOpen, setIsPixOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('simples_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AudioProvider>
      <div className="app-container">
        {/* Top Header */}
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenPix={() => setIsPixOpen(true)}
        />

        {/* Main Content by Tab */}
        <main className="main-content">
          {activeTab === 'home' && (
            <HomeView 
              setActiveTab={setActiveTab}
              onOpenPix={() => setIsPixOpen(true)}
              onSelectBulletin={(b) => setSelectedBulletin(b)}
              bulletins={bulletins}
            />
          )}

          {activeTab === 'feed' && (
            <FeedView />
          )}

          {activeTab === 'sermons' && (
            <SermonsView />
          )}

          {activeTab === 'bulletins' && (
            <BulletinsView 
              bulletins={bulletins}
              onSelectBulletin={(b) => setSelectedBulletin(b)}
            />
          )}

          {activeTab === 'mesas' && (
            <MesasView />
          )}

          {activeTab === 'more' && (
            <MoreView 
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          )}
        </main>

        {/* Floating Mini Audio Player */}
        <MiniPlayer />

        {/* Fullscreen Sermon Player Drawer */}
        <ExpandedPlayer />

        {/* Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Bulletin Full Reader Modal */}
        <BulletinDetailModal 
          bulletin={selectedBulletin}
          onClose={() => setSelectedBulletin(null)}
          setActiveTab={setActiveTab}
        />

        {/* PIX Generosity Modal */}
        <PixModal 
          isOpen={isPixOpen}
          onClose={() => setIsPixOpen(false)}
        />

        {/* Admin Leadership Dashboard */}
        <AdminModal 
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          bulletins={bulletins}
          setBulletins={setBulletins}
        />
      </div>
    </AudioProvider>
  );
}
