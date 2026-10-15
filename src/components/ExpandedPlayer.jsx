import React, { useState } from 'react';
import { 
  X, Play, Pause, RotateCcw, RotateCw, Bookmark, Share2, 
  ExternalLink, BookOpen, MessageSquare, Edit3, Check
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function ExpandedPlayer() {
  const { 
    currentSermon, isPlaying, togglePlay, currentTime, duration, seek, 
    skipTime, playbackRate, changeSpeed, isExpandedOpen, setIsExpandedOpen,
    personalNotes, saveNote, savedFavorites, toggleFavorite
  } = useAudio();

  const [activeSubtab, setActiveSubtab] = useState('outline'); // outline | questions | notes
  const [noteText, setNoteText] = useState(() => (currentSermon ? personalNotes[currentSermon.id] || '' : ''));
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Sync noteText when sermon changes
  React.useEffect(() => {
    if (currentSermon) {
      setNoteText(personalNotes[currentSermon.id] || '');
    }
  }, [currentSermon, personalNotes]);

  if (!isExpandedOpen || !currentSermon) return null;

  const isFavorited = savedFavorites.includes(currentSermon.id);

  const handleSaveNote = () => {
    saveNote(currentSermon.id, noteText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎙️ *Pregação da Igreja Cristã Simples*\n\n` +
      `*${currentSermon.title}*\n` +
      `📖 Texto: ${currentSermon.bibleText}\n` +
      `👤 Pregador: ${currentSermon.speaker}\n` +
      `🗓️ ${currentSermon.date}\n\n` +
      `Ouça no App da Simples: https://igrejacristasimples.com.br/`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="expanded-player-overlay" onClick={() => setIsExpandedOpen(false)}>
      <div 
        className="expanded-player-sheet animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Reprodutor Completo da Pregação"
      >
        <div className="expanded-header">
          <div className="drag-handle" />
          <button
            className="header-icon-btn"
            onClick={() => setIsExpandedOpen(false)}
            aria-label="Fechar reprodutor"
          >
            <X size={20} />
          </button>
        </div>

        <div className="expanded-body">
          <img
            src={currentSermon.cover}
            alt={currentSermon.title}
            className="sermon-hero-cover"
          />

          <div className="sermon-meta-badge">
            {currentSermon.seriesTitle}
          </div>

          <h2 className="player-title">{currentSermon.title}</h2>
          <div className="player-speaker">{currentSermon.speaker} • {currentSermon.date}</div>

          <div className="player-scripture">
            <BookOpen size={16} />
            <span>{currentSermon.bibleText}</span>
          </div>

          {/* Time Seeker Bar */}
          <div className="time-slider-container">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="time-slider"
              aria-label="Tempo da pregação"
            />
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Core Controls */}
          <div className="main-controls-row">
            <button
              className="control-btn"
              onClick={() => skipTime(-15)}
              title="Voltar 15 segundos"
              aria-label="Voltar 15 segundos"
            >
              <RotateCcw size={20} />
            </button>

            <button
              className="control-btn play-pause-lg"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pausar pregação' : 'Reproduzir pregação'}
            >
              {isPlaying ? <Pause size={30} /> : <Play size={30} style={{ marginLeft: 3 }} />}
            </button>

            <button
              className="control-btn"
              onClick={() => skipTime(30)}
              title="Avançar 30 segundos"
              aria-label="Avançar 30 segundos"
            >
              <RotateCw size={20} />
            </button>
          </div>

          {/* Speed, Favorites & Share */}
          <div className="player-actions-row">
            <div className="speed-chips">
              {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  className={`speed-chip ${playbackRate === spd ? 'active' : ''}`}
                  onClick={() => changeSpeed(spd)}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className={`control-btn ${isFavorited ? 'active' : ''}`}
                style={{ width: 36, height: 36, color: isFavorited ? 'var(--color-terracotta)' : 'inherit' }}
                onClick={() => toggleFavorite(currentSermon.id)}
                title={isFavorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
              >
                <Bookmark size={18} fill={isFavorited ? 'var(--color-terracotta)' : 'none'} />
              </button>

              <button
                className="control-btn"
                style={{ width: 36, height: 36 }}
                onClick={handleShareWhatsApp}
                title="Compartilhar no WhatsApp"
              >
                <Share2 size={18} />
              </button>

              {currentSermon.spotifyUrl && (
                <a
                  href={currentSermon.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="control-btn"
                  style={{ width: 36, height: 36, color: '#1DB954' }}
                  title="Abrir no Spotify (se tiver app)"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          {copiedShare && (
            <div style={{ color: 'var(--color-success)', fontSize: '0.8rem', textAlign: 'center', marginBottom: 12 }}>
              ✓ Link formatado preparado para compartilhar!
            </div>
          )}

          {/* Tabs Inside Sermon View */}
          <div className="player-subtabs">
            <button
              className={`player-subtab ${activeSubtab === 'outline' ? 'active' : ''}`}
              onClick={() => setActiveSubtab('outline')}
            >
              <BookOpen size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Esboço & Resumo
            </button>
            <button
              className={`player-subtab ${activeSubtab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveSubtab('questions')}
            >
              <MessageSquare size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Perguntas da Mesa
            </button>
            <button
              className={`player-subtab ${activeSubtab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveSubtab('notes')}
            >
              <Edit3 size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Minhas Anotações
            </button>
          </div>

          {/* Tab 1: Outline */}
          {activeSubtab === 'outline' && (
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: 16, lineHeight: 1.6 }}>
                {currentSermon.summary}
              </p>

              <h4 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', marginBottom: 10, fontSize: '0.95rem' }}>
                Pontos Centrais da Pregação
              </h4>
              <div className="outline-list">
                {currentSermon.outline?.map((item, index) => (
                  <div key={index} className="outline-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Table Questions */}
          {activeSubtab === 'questions' && (
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: 16 }}>
                Perguntas para reflexão em família ou para debate no seu grupo relacional (Mesa) durante a semana:
              </p>
              <div className="outline-list">
                {currentSermon.tableQuestions?.map((q, idx) => (
                  <div key={idx} className="outline-item" style={{ borderLeft: '3px solid var(--color-terracotta)' }}>
                    <strong>{idx + 1}.</strong> {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Personal Notes */}
          {activeSubtab === 'notes' && (
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.84rem', marginBottom: 10 }}>
                Suas anotações pessoais ficam salvas no seu aparelho para você consultar quando quiser.
              </p>
              <textarea
                className="notes-editor"
                placeholder="Escreva aqui insights, versículos e reflexões durante a mensagem..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, gap: 10 }}>
                <button className="btn-primary" onClick={handleSaveNote}>
                  <Check size={16} />
                  {savedSuccess ? 'Salvo!' : 'Salvar Anotação'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
