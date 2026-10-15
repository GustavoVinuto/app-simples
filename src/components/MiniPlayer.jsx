import React from 'react';
import { Play, Pause, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function MiniPlayer() {
  const { currentSermon, isPlaying, togglePlay, currentTime, duration, setIsExpandedOpen, closePlayer } = useAudio();

  if (!currentSermon) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="mini-player"
      onClick={() => setIsExpandedOpen(true)}
      role="region"
      aria-label="Reprodutor de Áudio Mini"
    >
      <img
        src={currentSermon.cover}
        alt={currentSermon.title}
        className="mini-cover"
        onClick={() => setIsExpandedOpen(true)}
        style={{ cursor: 'pointer' }}
        title="Toque para expandir"
      />

      <div 
        className="mini-info"
        onClick={() => setIsExpandedOpen(true)}
        style={{ cursor: 'pointer' }}
        title="Toque no título para expandir"
      >
        <div className="mini-title">{currentSermon.title}</div>
        <div className="mini-speaker">{currentSermon.speaker} • {currentSermon.bibleText}</div>
      </div>

      <div className="mini-controls" onClick={(e) => e.stopPropagation()}>
        {isPlaying && (
          <div className="waveform-bars" title="Reproduzindo áudio">
            <span className="waveform-bar" />
            <span className="waveform-bar" />
            <span className="waveform-bar" />
            <span className="waveform-bar" />
          </div>
        )}

        <button
          className="mini-btn primary"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar áudio' : 'Reproduzir áudio'}
          title={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
        </button>

        <button
          className="mini-btn close-btn"
          onClick={(e) => {
            e.stopPropagation();
            closePlayer();
          }}
          aria-label="Fechar reprodutor"
          title="Fechar reprodutor"
        >
          <X size={17} />
        </button>
      </div>

      <div
        className="mini-progress-bar"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}
