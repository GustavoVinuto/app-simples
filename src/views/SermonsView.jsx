import React, { useState, useMemo } from 'react';
import { 
  Play, Pause, Search, Bookmark, Check, Bell, BellRing, 
  MoreHorizontal, Share2, Sparkles, Filter, ArrowUpDown, 
  BookOpen, ExternalLink, X, CheckCircle2,
  SlidersHorizontal, User, Calendar, Clock, RotateCcw
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { INITIAL_SERIES, CHURCH_INFO } from '../data/mockData';

export default function SermonsView() {
  const { 
    sermons, currentSermon, isPlaying, playSermon, togglePlay,
    savedFavorites, toggleFavorite, setIsExpandedOpen 
  } = useAudio();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState('series'); // series | all | favorites
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all'); // all | short (<40) | long (>=40)
  const [onlyWithQuestions, setOnlyWithQuestions] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest'); // newest | oldest
  const [isFollowing, setIsFollowing] = useState(() => {
    return localStorage.getItem('simples_spotify_following') === 'true';
  });
  const [hasNotifications, setHasNotifications] = useState(() => {
    return localStorage.getItem('simples_spotify_bell') === 'true';
  });
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleFollow = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    localStorage.setItem('simples_spotify_following', String(next));
  };

  const toggleBell = () => {
    const next = !hasNotifications;
    setHasNotifications(next);
    localStorage.setItem('simples_spotify_bell', String(next));
  };

  const handleSharePodcast = () => {
    const text = encodeURIComponent(
      `🎙️ *Podcast Pregações da Igreja Cristã Simples*\n\n` +
      `Acompanhe as mensagens de cada culto da Simples: bíblicas, missionais e à volta da mesa.\n\n` +
      `Ouça no App da Simples: ${CHURCH_INFO.website}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    setShowMoreModal(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(CHURCH_INFO.website);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
      setShowMoreModal(false);
    }, 1500);
  };

  // Extracted unique filters
  const availableSpeakers = useMemo(() => {
    const set = new Set();
    sermons.forEach(s => {
      if (s.speaker) set.add(s.speaker);
    });
    return Array.from(set);
  }, [sermons]);

  const availableSeries = useMemo(() => {
    const set = new Set();
    INITIAL_SERIES.forEach(s => {
      if (s.title) set.add(s.title);
    });
    sermons.forEach(s => {
      if (s.seriesTitle) set.add(s.seriesTitle);
    });
    return Array.from(set);
  }, [sermons]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedSpeaker !== 'all') count++;
    if (selectedSeries) count++;
    if (selectedDuration !== 'all') count++;
    if (onlyWithQuestions) count++;
    if (sortOrder === 'oldest') count++;
    return count;
  }, [selectedSpeaker, selectedSeries, selectedDuration, onlyWithQuestions, sortOrder]);

  const resetFilters = () => {
    setSelectedSpeaker('all');
    setSelectedSeries(null);
    setSelectedDuration('all');
    setOnlyWithQuestions(false);
    setSortOrder('newest');
    setSearchQuery('');
  };

  // Filter & Search Logic
  const filteredSermons = useMemo(() => {
    let list = [...sermons];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.seriesTitle.toLowerCase().includes(q) ||
        s.bibleText.toLowerCase().includes(q) ||
        s.summary?.toLowerCase().includes(q)
      );
    }

    // Series filter
    if (selectedSeries) {
      list = list.filter(s => s.seriesTitle === selectedSeries);
    }

    // Speaker filter
    if (selectedSpeaker && selectedSpeaker !== 'all') {
      list = list.filter(s => s.speaker === selectedSpeaker);
    }

    // Duration filter
    if (selectedDuration === 'short') {
      list = list.filter(s => {
        const num = parseInt(s.duration, 10);
        return !isNaN(num) && num < 40;
      });
    } else if (selectedDuration === 'long') {
      list = list.filter(s => {
        const num = parseInt(s.duration, 10);
        return !isNaN(num) && num >= 40;
      });
    }

    // Only with questions
    if (onlyWithQuestions) {
      list = list.filter(s => s.tableQuestions && s.tableQuestions.length > 0);
    }

    // Tab filter
    if (activeFilter === 'favorites') {
      list = list.filter(s => savedFavorites.includes(s.id));
    }

    // Sort
    if (sortOrder === 'oldest') {
      list.reverse();
    }

    return list;
  }, [sermons, searchQuery, selectedSeries, selectedSpeaker, selectedDuration, onlyWithQuestions, activeFilter, savedFavorites, sortOrder]);

  const latestSermon = sermons[0];

  const handleMainPlay = () => {
    if (isPlaying) {
      togglePlay();
    } else {
      if (currentSermon) {
        togglePlay();
      } else if (latestSermon) {
        playSermon(latestSermon);
      }
    }
  };

  // Color palettes for Spotify Genre/Series cards
  const seriesGradients = [
    { bg: 'linear-gradient(135deg, #141829, #080a13)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #5c6340, #343825)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #c76f61, #873e33)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #37634d, #1e3b2d)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #445373, #232c40)', text: '#ffffff' }
  ];

  return (
    <div className="spotify-view">
      {/* SPOTIFY PODCAST HERO HEADER */}
      <div className="spotify-hero">
        <div className="spotify-hero-inner">
          <div className="spotify-cover-wrap">
            <img
              src={latestSermon?.cover || '/serie-inside-outside.jpg'}
              alt="Pregações Simples"
              className="spotify-show-cover"
            />
          </div>

          <div className="spotify-show-meta">
            <div className="spotify-badge-type">PODCAST OFICIAL</div>
            <h1 className="spotify-show-title">Pregações Simples</h1>
            <div className="spotify-show-creator">
              <span>{CHURCH_INFO.name}</span>
              <CheckCircle2 size={14} color="#1ed760" fill="#1ed760" />
            </div>
            <div className="spotify-stats">
              <span>★ 5.0 (148 avaliações) • Domingos às 09h</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="spotify-actions-bar">
          <div className="spotify-actions-left">
            {/* Big Green Play Button */}
            <button
              className="spotify-play-btn"
              onClick={handleMainPlay}
              aria-label={isPlaying ? 'Pausar pregação' : 'Reproduzir pregação mais recente'}
              title={isPlaying ? 'Pausar' : 'Reproduzir pregações'}
            >
              {isPlaying ? <Pause size={24} fill="#000" /> : <Play size={24} fill="#000" style={{ marginLeft: 3 }} />}
            </button>

            {/* Follow Button */}
            <button
              className={`spotify-follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'SEGUINDO' : 'SEGUIR'}
            </button>

            {/* Notification Bell */}
            <button
              className={`spotify-icon-btn ${hasNotifications ? 'active' : ''}`}
              onClick={toggleBell}
              title={hasNotifications ? 'Notificações ativadas' : 'Ativar notificações de novos cultos'}
            >
              {hasNotifications ? <BellRing size={20} /> : <Bell size={20} />}
            </button>

            {/* More Options */}
            <button
              className="spotify-icon-btn"
              onClick={() => setShowMoreModal(true)}
              title="Mais opções"
            >
              <MoreHorizontal size={22} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              className={`spotify-icon-btn ${showSearch ? 'active' : ''}`}
              onClick={() => setShowSearch(!showSearch)}
              title="Buscar pregações"
            >
              <Search size={20} />
            </button>

            <button
              className={`spotify-icon-btn ${activeFiltersCount > 0 ? 'active' : ''}`}
              onClick={() => setIsFilterModalOpen(true)}
              title="Filtros avançados (pregador, data, duração)"
              style={{ position: 'relative' }}
            >
              <SlidersHorizontal size={20} />
              {activeFiltersCount > 0 && (
                <span className="spotify-filter-badge-count">{activeFiltersCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR (Toggled or inline) */}
      {showSearch && (
        <div className="spotify-search-box animate-fade-in">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: 12, color: 'var(--color-text-dim)' }} />
            <input
              type="text"
              autoFocus
              placeholder="Buscar por título, pregador, texto bíblico..."
              className="spotify-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 14, top: 11, color: 'var(--color-text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* FILTER PILLS */}
      <div className="spotify-pills-row">
        <button
          className={`spotify-pill ${activeFilter === 'series' || selectedSeries ? 'active' : ''}`}
          onClick={() => { setActiveFilter('series'); }}
        >
          Séries & Temas
        </button>

        <button
          className={`spotify-pill ${activeFilter === 'all' && !selectedSeries ? 'active' : ''}`}
          onClick={() => { setActiveFilter('all'); setSelectedSeries(null); }}
        >
          Todos os episódios
        </button>

        <button
          className={`spotify-pill ${activeFilter === 'favorites' ? 'active' : ''}`}
          onClick={() => { setActiveFilter('favorites'); setSelectedSeries(null); }}
        >
          Salvos na Biblioteca ({savedFavorites.length})
        </button>
      </div>

      {/* ACTIVE SERIES BREADCRUMB */}
      {selectedSeries && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 18px 10px',
          fontSize: '0.82rem',
          color: '#1ed760'
        }}>
          <span>Filtrando por Série: <strong>{selectedSeries}</strong></span>
          <button
            onClick={() => setSelectedSeries(null)}
            style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}
          >
            <X size={14} /> Limpar filtro
          </button>
        </div>
      )}

      {/* SPOTIFY BROWSE GRID (WHEN IN SERIES TAB OR OVERVIEW) */}
      {activeFilter === 'series' && !selectedSeries && (
        <div className="animate-fade-in">
          <div className="spotify-section-head">
            <span className="spotify-section-title">Navegar por Séries</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{INITIAL_SERIES.length} coleções</span>
          </div>

          <div className="spotify-browse-grid">
            {INITIAL_SERIES.map((serie, index) => {
              const gradient = seriesGradients[index % seriesGradients.length];
              return (
                <div
                  key={serie.id}
                  className="spotify-genre-card"
                  style={{ background: gradient.bg }}
                  onClick={() => setSelectedSeries(serie.title)}
                >
                  <div className="spotify-genre-name">{serie.title}</div>
                  <span className="spotify-badge-count">{serie.totalMessages} mensagens</span>
                  <img src={serie.cover} alt={serie.title} className="spotify-genre-img" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION HEADER, FILTER & SORT */}
      <div className="spotify-section-head">
        <span className="spotify-section-title">
          {selectedSeries ? `Episódios de "${selectedSeries}"` : 'Todos os Episódios'}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            className={`spotify-sort-btn ${activeFiltersCount > 0 ? 'active' : ''}`}
            onClick={() => setIsFilterModalOpen(true)}
            title="Abrir filtros"
          >
            <Filter size={13} />
            {activeFiltersCount > 0 ? `Filtros (${activeFiltersCount})` : 'Filtrar'}
          </button>

          <button
            className="spotify-sort-btn"
            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
            title="Alternar ordem dos episódios"
          >
            <ArrowUpDown size={13} />
            {sortOrder === 'newest' ? 'Recentes' : 'Antigos'}
          </button>
        </div>
      </div>

      {/* ACTIVE FILTERS PILLS ROW */}
      {activeFiltersCount > 0 && (
        <div className="spotify-active-filters-row animate-fade-in">
          {selectedSeries && (
            <span className="spotify-active-filter-tag" onClick={() => setSelectedSeries(null)}>
              Série: {selectedSeries} <X size={12} />
            </span>
          )}
          {selectedSpeaker !== 'all' && (
            <span className="spotify-active-filter-tag" onClick={() => setSelectedSpeaker('all')}>
              Pregador: {selectedSpeaker} <X size={12} />
            </span>
          )}
          {selectedDuration !== 'all' && (
            <span className="spotify-active-filter-tag" onClick={() => setSelectedDuration('all')}>
              {selectedDuration === 'short' ? '< 40 min' : '≥ 40 min'} <X size={12} />
            </span>
          )}
          {onlyWithQuestions && (
            <span className="spotify-active-filter-tag" onClick={() => setOnlyWithQuestions(false)}>
              Guia da Mesa <X size={12} />
            </span>
          )}
          {sortOrder === 'oldest' && (
            <span className="spotify-active-filter-tag" onClick={() => setSortOrder('newest')}>
              Mais antigos <X size={12} />
            </span>
          )}
          <button className="spotify-clear-all-btn" onClick={resetFilters}>
            Limpar tudo
          </button>
        </div>
      )}

      {/* SPOTIFY EPISODE LIST */}
      <div className="spotify-episodes-container">
        {filteredSermons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--color-text-dim)' }}>
            <p style={{ fontSize: '0.95rem', marginBottom: 8 }}>Nenhum episódio encontrado.</p>
            <button
              className="spotify-follow-btn"
              onClick={() => { setSearchQuery(''); setSelectedSeries(null); setActiveFilter('all'); }}
            >
              Ver todos os episódios
            </button>
          </div>
        ) : (
          filteredSermons.map((sermon) => {
            const isThisPlaying = currentSermon?.id === sermon.id && isPlaying;
            const isCurrentTrack = currentSermon?.id === sermon.id;
            const isFav = savedFavorites.includes(sermon.id);

            return (
              <div
                key={sermon.id}
                className={`spotify-episode-card ${isCurrentTrack ? 'is-active' : ''}`}
                onClick={() => {
                  playSermon(sermon);
                  setIsExpandedOpen(true);
                }}
              >
                {/* Top: Thumbnail, Title, Speaker */}
                <div className="spotify-episode-top">
                  <img
                    src={sermon.cover}
                    alt={sermon.title}
                    className="spotify-episode-thumb"
                  />

                  <div className="spotify-episode-details">
                    <h3 className="spotify-episode-title">
                      {sermon.title}
                    </h3>
                    <div className="spotify-episode-speaker">
                      <span>{sermon.speaker}</span>
                      <span>•</span>
                      <span>{sermon.bibleText}</span>
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="spotify-episode-desc">
                  {sermon.summary}
                </p>

                {/* Bottom: Play pill & action tools */}
                <div className="spotify-episode-bottom">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                      className={`spotify-play-pill ${isThisPlaying ? 'playing' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playSermon(sermon);
                      }}
                      title={isThisPlaying ? 'Pausar pregação' : 'Ouvir pregação agora'}
                    >
                      <div className="spotify-mini-play-circle">
                        {isThisPlaying ? (
                          <div className="spotify-equalizer">
                            <span className="spotify-eq-bar" />
                            <span className="spotify-eq-bar" />
                            <span className="spotify-eq-bar" />
                          </div>
                        ) : (
                          <Play size={13} fill="#000" style={{ marginLeft: 1 }} />
                        )}
                      </div>
                      <span>{isThisPlaying ? 'Tocando agora' : sermon.duration}</span>
                    </button>

                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)' }}>
                      {sermon.date}
                    </span>
                  </div>

                  {/* Right Tools: Bookmark, Share, Details */}
                  <div className="spotify-episode-tools" onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`spotify-tool-btn ${isFav ? 'active' : ''}`}
                      onClick={() => toggleFavorite(sermon.id)}
                      title={isFav ? 'Remover da biblioteca' : 'Adicionar à biblioteca'}
                    >
                      {isFav ? <Check size={18} /> : <Bookmark size={18} />}
                    </button>

                    <button
                      className="spotify-tool-btn"
                      onClick={() => {
                        const text = encodeURIComponent(
                          `🎙️ *Pregação da Igreja Cristã Simples*\n\n` +
                          `*${sermon.title}*\n` +
                          `📖 ${sermon.bibleText} • ${sermon.speaker}\n` +
                          `🗓️ ${sermon.date}\n\n` +
                          `Ouça agora: ${CHURCH_INFO.website}`
                        );
                        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                      }}
                      title="Compartilhar no WhatsApp"
                    >
                      <Share2 size={16} />
                    </button>

                    <button
                      className="spotify-tool-btn"
                      onClick={() => {
                        playSermon(sermon);
                        setIsExpandedOpen(true);
                      }}
                      title="Ver notas e esboço"
                    >
                      <BookOpen size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* SPOTIFY INTEGRATION PROMO BANNER */}
      <div style={{
        margin: '10px 16px 20px',
        padding: '16px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(30,215,96,0.12), rgba(20,24,18,0.9))',
        border: '1px solid rgba(30,215,96,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#1ed760',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#000">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <div>
            <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block' }}>
              Tem conta no Spotify?
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Você também pode nos ouvir direto no app do Spotify se preferir.
            </span>
          </div>
        </div>

        <a
          href="https://open.spotify.com/search/igreja%20crista%20simples"
          target="_blank"
          rel="noreferrer"
          className="spotify-follow-btn"
          style={{ padding: '6px 12px', fontSize: '0.72rem', flexShrink: 0 }}
        >
          Abrir Spotify
        </a>
      </div>

      {/* MORE OPTIONS SPOTIFY MODAL */}
      {showMoreModal && (
        <div className="modal-overlay" onClick={() => setShowMoreModal(false)}>
          <div 
            className="modal-content animate-fade-in" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 400 }}
          >
            <div className="modal-header">
              <h3 className="modal-title">Pregações Simples</h3>
              <button className="header-icon-btn" onClick={() => setShowMoreModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={handleSharePodcast}
              >
                <Share2 size={16} /> Compartilhar Podcast no WhatsApp
              </button>

              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={handleCopyLink}
              >
                <Check size={16} /> {copiedLink ? 'Link copiado!' : 'Copiar link do Podcast'}
              </button>

              <a
                href={CHURCH_INFO.website}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <ExternalLink size={16} /> Visitar Site Oficial da Igreja
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FILTER BOTTOM SHEET / MODAL */}
      {isFilterModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFilterModalOpen(false)}>
          <div className="filter-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SlidersHorizontal size={18} color="#1ed760" />
                <h3 className="filter-modal-title">Filtros & Ordenação</h3>
              </div>
              <button className="filter-modal-close" onClick={() => setIsFilterModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="filter-modal-body">
              {/* 1. PREGADORES */}
              <div className="filter-group">
                <label className="filter-label">
                  <User size={14} color="#1ed760" /> Pregador
                </label>
                <div className="filter-chips-grid">
                  <button
                    className={`filter-chip ${selectedSpeaker === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedSpeaker('all')}
                  >
                    Todos os pregadores
                  </button>
                  {availableSpeakers.map(spk => (
                    <button
                      key={spk}
                      className={`filter-chip ${selectedSpeaker === spk ? 'active' : ''}`}
                      onClick={() => setSelectedSpeaker(selectedSpeaker === spk ? 'all' : spk)}
                    >
                      {spk}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. SÉRIES & TEMAS */}
              <div className="filter-group">
                <label className="filter-label">
                  <BookOpen size={14} color="#60a5fa" /> Série / Tema
                </label>
                <div className="filter-chips-grid">
                  <button
                    className={`filter-chip ${!selectedSeries ? 'active' : ''}`}
                    onClick={() => setSelectedSeries(null)}
                  >
                    Todas as séries
                  </button>
                  {availableSeries.map(ser => (
                    <button
                      key={ser}
                      className={`filter-chip ${selectedSeries === ser ? 'active' : ''}`}
                      onClick={() => setSelectedSeries(selectedSeries === ser ? null : ser)}
                    >
                      {ser}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. ORDENAÇÃO POR DATA */}
              <div className="filter-group">
                <label className="filter-label">
                  <Calendar size={14} color="#e5b25d" /> Ordenar por Data
                </label>
                <div className="filter-chips-grid">
                  <button
                    className={`filter-chip ${sortOrder === 'newest' ? 'active' : ''}`}
                    onClick={() => setSortOrder('newest')}
                  >
                    Mais recentes primeiro
                  </button>
                  <button
                    className={`filter-chip ${sortOrder === 'oldest' ? 'active' : ''}`}
                    onClick={() => setSortOrder('oldest')}
                  >
                    Mais antigas primeiro
                  </button>
                </div>
              </div>

              {/* 4. DURAÇÃO */}
              <div className="filter-group">
                <label className="filter-label">
                  <Clock size={14} color="#ec4899" /> Duração da Mensagem
                </label>
                <div className="filter-chips-grid">
                  <button
                    className={`filter-chip ${selectedDuration === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedDuration('all')}
                  >
                    Qualquer duração
                  </button>
                  <button
                    className={`filter-chip ${selectedDuration === 'short' ? 'active' : ''}`}
                    onClick={() => setSelectedDuration(selectedDuration === 'short' ? 'all' : 'short')}
                  >
                    Até 40 min
                  </button>
                  <button
                    className={`filter-chip ${selectedDuration === 'long' ? 'active' : ''}`}
                    onClick={() => setSelectedDuration(selectedDuration === 'long' ? 'all' : 'long')}
                  >
                    Mais de 40 min
                  </button>
                </div>
              </div>

              {/* 5. APENAS COM PERGUNTAS DE MESA */}
              <div className="filter-group">
                <label className="filter-label">
                  <Sparkles size={14} color="#a855f7" /> Recursos Adicionais
                </label>
                <div className="filter-chips-grid">
                  <button
                    className={`filter-chip ${onlyWithQuestions ? 'active' : ''}`}
                    onClick={() => setOnlyWithQuestions(!onlyWithQuestions)}
                  >
                    {onlyWithQuestions ? '✓ Com Perguntas para a Mesa' : 'Com Perguntas para a Mesa'}
                  </button>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="filter-modal-footer">
              <button className="filter-btn-reset" onClick={resetFilters}>
                <RotateCcw size={14} />
                Limpar
              </button>
              <button className="filter-btn-apply" onClick={() => setIsFilterModalOpen(false)}>
                Ver {filteredSermons.length} {filteredSermons.length === 1 ? 'resultado' : 'resultados'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
