import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, X, GripVertical } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function MiniPlayer() {
  const { currentSermon, isPlaying, togglePlay, currentTime, duration, setIsExpandedOpen, closePlayer } = useAudio();
  const playerRef = useRef(null);

  // Position state: null = default floating position, or { x, y } in px
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag tracking refs
  const dragStartRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const hasMovedRef = useRef(false);

  const startDrag = (clientX, clientY) => {
    if (!playerRef.current) return;
    const rect = playerRef.current.getBoundingClientRect();
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: rect.left,
      initialY: rect.top,
    };
    hasMovedRef.current = false;
  };

  const onDrag = useCallback((clientX, clientY) => {
    const deltaX = clientX - dragStartRef.current.startX;
    const deltaY = clientY - dragStartRef.current.startY;

    if (!hasMovedRef.current && Math.hypot(deltaX, deltaY) > 5) {
      hasMovedRef.current = true;
      setIsDragging(true);
    }

    if (hasMovedRef.current && playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      const playerWidth = rect.width;
      const playerHeight = rect.height;

      // Keep within viewport boundaries
      const minX = 10;
      const maxX = Math.max(minX, window.innerWidth - playerWidth - 10);
      const minY = 55; // Below header
      const maxY = Math.max(minY, window.innerHeight - playerHeight - 75); // Above bottom nav

      const newX = Math.min(Math.max(dragStartRef.current.initialX + deltaX, minX), maxX);
      const newY = Math.min(Math.max(dragStartRef.current.initialY + deltaY, minY), maxY);

      setPosition({ x: newX, y: newY });
    }
  }, []);

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse drag handler
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    startDrag(e.clientX, e.clientY);

    const handleMouseMove = (moveEvent) => {
      onDrag(moveEvent.clientX, moveEvent.clientY);
    };

    const handleMouseUp = () => {
      endDrag();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Touch drag handler
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      onDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  // Re-clamp position on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev || !playerRef.current) return prev;
        const rect = playerRef.current.getBoundingClientRect();
        const minX = 10;
        const maxX = Math.max(minX, window.innerWidth - rect.width - 10);
        const minY = 55;
        const maxY = Math.max(minY, window.innerHeight - rect.height - 75);
        return {
          x: Math.min(Math.max(prev.x, minX), maxX),
          y: Math.min(Math.max(prev.y, minY), maxY),
        };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!currentSermon) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleClick = () => {
    if (hasMovedRef.current) return;
    setIsExpandedOpen(true);
  };

  // Inline style when dragged from default position
  const inlineStyle = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        bottom: 'auto',
        right: 'auto',
        width: 'calc(100% - 24px)',
        maxWidth: '440px',
        transform: 'none',
        margin: 0,
        zIndex: 65,
        touchAction: 'none',
        boxSizing: 'border-box',
      }
    : {
        touchAction: 'none',
      };

  return (
    <div
      ref={playerRef}
      className={`mini-player ${isDragging ? 'is-dragging' : ''}`}
      style={inlineStyle}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Reprodutor de Áudio Mini Flutuante (Arraste para mover)"
      title="Toque para expandir ou arraste para mover"
    >
      <div 
        className="mini-drag-handle" 
        title="Arraste para mover"
        aria-hidden="true"
      >
        <GripVertical size={16} />
      </div>

      <img
        src={currentSermon.cover}
        alt={currentSermon.title}
        className="mini-cover"
        style={{ cursor: 'pointer' }}
      />

      <div className="mini-info">
        <div className="mini-title">{currentSermon.title}</div>
        <div className="mini-speaker">{currentSermon.speaker} • {currentSermon.bibleText}</div>
      </div>

      <div 
        className="mini-controls" 
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
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
