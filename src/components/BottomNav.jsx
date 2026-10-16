import React from 'react';
import { Home, Camera, Mic, Newspaper, Grid } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function BottomNav({ activeTab, setActiveTab }) {
  const { isPlaying } = useAudio();

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'sermons', label: 'Pregações', icon: Mic, badge: isPlaying ? 'Ao vivo' : null },
    { id: 'feed', label: 'Feed', icon: Camera, isCenter: true },
    { id: 'bulletins', label: 'Informativos', icon: Newspaper },
    { id: 'more', label: 'Mais', icon: Grid }
  ];

  return (
    <nav className="bottom-nav" aria-label="Navegação Principal">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        const isCenter = item.isCenter;
        return (
          <button
            key={item.id}
            className={`nav-item ${isCenter ? 'center-tab' : ''} ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (item.id === 'home') {
                window.dispatchEvent(new CustomEvent('resetHomeMinistry'));
              }
              setActiveTab(item.id);
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {isCenter ? (
              <div className="center-icon-wrapper">
                <Icon size={19} className="nav-icon" />
              </div>
            ) : (
              <Icon size={22} className="nav-icon" />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
