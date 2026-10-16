import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { INITIAL_SERMONS } from '../data/mockData';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [sermons, setSermons] = useState(() => {
    const saved = localStorage.getItem('simples_sermons');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // If the new featured sermon isn't present, prepend it
          const hasNewest = parsed.some(s => s.id === INITIAL_SERMONS[0].id);
          if (!hasNewest) {
            return [INITIAL_SERMONS[0], ...parsed];
          }
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SERMONS;
  });

  const [currentSermon, setCurrentSermon] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isExpandedOpen, setIsExpandedOpen] = useState(false);
  const [personalNotes, setPersonalNotes] = useState(() => {
    const saved = localStorage.getItem('simples_sermon_notes');
    return saved ? JSON.parse(saved) : {};
  });
  const [savedFavorites, setSavedFavorites] = useState(() => {
    const saved = localStorage.getItem('simples_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const audioRef = useRef(new Audio());

  // Save sermons if updated by admin
  useEffect(() => {
    localStorage.setItem('simples_sermons', JSON.stringify(sermons));
  }, [sermons]);

  // Save notes
  useEffect(() => {
    localStorage.setItem('simples_sermon_notes', JSON.stringify(personalNotes));
  }, [personalNotes]);

  // Save favorites
  useEffect(() => {
    localStorage.setItem('simples_favorites', JSON.stringify(savedFavorites));
  }, [savedFavorites]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const playSermon = (sermon) => {
    const audio = audioRef.current;
    if (currentSermon?.id === sermon.id) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(err => console.log('Audio play error:', err));
      }
    } else {
      setCurrentSermon(sermon);
      audio.src = sermon.audioUrl;
      audio.playbackRate = playbackRate;
      audio.currentTime = 0;
      audio.play().catch(err => console.log('Audio load/play error:', err));
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio.src && currentSermon) {
      audio.src = currentSermon.audioUrl;
      audio.playbackRate = playbackRate;
    }
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log('Audio play error:', err));
    }
  };

  const seek = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const skipTime = (seconds) => {
    const audio = audioRef.current;
    const target = Math.min(Math.max(audio.currentTime + seconds, 0), duration || 9999);
    seek(target);
  };

  const changeSpeed = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const saveNote = (sermonId, text) => {
    setPersonalNotes(prev => ({
      ...prev,
      [sermonId]: text
    }));
  };

  const toggleFavorite = (sermonId) => {
    setSavedFavorites(prev => 
      prev.includes(sermonId) ? prev.filter(id => id !== sermonId) : [...prev, sermonId]
    );
  };

  const addNewSermon = (newSermon) => {
    setSermons(prev => [newSermon, ...prev]);
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setCurrentSermon(null);
    setIsExpandedOpen(false);
  };

  return (
    <AudioContext.Provider
      value={{
        sermons,
        setSermons,
        currentSermon,
        closePlayer,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        isExpandedOpen,
        setIsExpandedOpen,
        playSermon,
        togglePlay,
        seek,
        skipTime,
        changeSpeed,
        personalNotes,
        saveNote,
        savedFavorites,
        toggleFavorite,
        addNewSermon
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
