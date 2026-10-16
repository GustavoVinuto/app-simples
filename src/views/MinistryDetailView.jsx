import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Users, 
  MessageCircle, BookOpen, Check, Copy, 
  X, Navigation, ArrowUpRight,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Sparkles, Heart, Baby, Home
} from 'lucide-react';
import { CHURCH_INFO } from '../data/mockData';

export default function MinistryDetailView({ ministry, _onBack }) {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [posterSlide, setPosterSlide] = useState(0);
  const [isBookExpanded, setIsBookExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    setPosterSlide(0);
  }, [ministry?.id]);

  const isRelacional = ministry?.id === 'de-casa-em-casa';

  const eventsList = (ministry?.events && ministry.events.length > 0)
    ? ministry.events
    : [{
        id: `${ministry?.id || 'event'}-default`,
        title: ministry?.name || 'Programação',
        tagRight: ministry?.subtitle || 'Programação',
        badge: 'Programação',
        time: 'Domingos e Encontros',
        date: 'Aos Domingos',
        loc: ministry?.location || "Rua Miradouro, 319 • Industrial",
        feature2: "Comunidade",
        feature2Icon: "sparkles",
        feature3: ministry?.age || "Todos",
        feature3Icon: "users",
        image: ministry?.image,
        description: ministry?.description
      }];

  // Auto-advance cartazes a cada 5.5s (igual à página inicial)
  useEffect(() => {
    if (eventsList.length <= 1) return;
    const timer = setInterval(() => {
      setPosterSlide((prev) => (prev + 1) % eventsList.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [eventsList.length]);

  const renderFeature2Icon = (iconName) => {
    if (iconName === 'book') return <BookOpen size={14} color="#60a5fa" />;
    return <Sparkles size={14} color="#e5b25d" />;
  };

  const renderFeature3Icon = (iconName) => {
    if (iconName === 'heart') return <Heart size={14} color="var(--color-terracotta)" fill="var(--color-terracotta)" />;
    if (iconName === 'baby') return <Baby size={14} color="#7cb342" />;
    if (iconName === 'home') return <Home size={14} color="#60a5fa" />;
    return <Users size={14} color="#e5b25d" />;
  };

  if (!ministry) return null;

  const currentEvent = eventsList[posterSlide % eventsList.length];

  const handleCopyAddress = (house) => {
    navigator.clipboard.writeText(house.fullAddress);
    setCopiedId(house.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppContact = (customMessage) => {
    const text = encodeURIComponent(
      customMessage || ministry.whatsappMessage || `Olá! Gostaria de participar do ${ministry.name} da Igreja Cristã Simples.`
    );
    window.open(`https://wa.me/${CHURCH_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="apple-ministry-view animate-fade-in">
      {/* 2. APPLE KEYNOTE HERO */}
      <header className="apple-hero-section">
        <div className="apple-hero-visual-wrap">
          <img 
            src={ministry.image} 
            alt={ministry.name} 
            className="apple-hero-image"
          />
          <div className="apple-hero-gradient-overlay" />
        </div>

        <div className="apple-hero-content">
          <span className="apple-kicker">
            {isRelacional ? 'RELACIONAL SIMPLES²⁶' : (ministry.subtitle || 'MINISTÉRIO')}
          </span>
          <h1 className="apple-headline">{ministry.name}</h1>
          <p className="apple-subheadline">
            {isRelacional 
              ? 'A mesa como princípio fundamental do Evangelho. Comunhão viva de casa em casa.' 
              : ministry.description}
          </p>

          <div className="apple-meta-pills">
            <span className="apple-pill">
              <Users size={13} style={{ flexShrink: 0 }} />
              <span>{ministry.age}</span>
            </span>
            <span className="apple-pill">
              <MapPin size={13} style={{ flexShrink: 0 }} />
              <span>{ministry.location || "Rua Miradouro, 319 • Industrial"}</span>
            </span>
            {isRelacional && (
              <span className="apple-pill highlight">
                <Clock size={13} style={{ flexShrink: 0 }} />
                <span>Ter, Qua & Qui • 20h</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 3. MAIN BODY CONTAINER */}
      <main className="apple-body-container">
        {isRelacional ? (
          /* === RESUMO DO LIVRO / CATECISMO EM ESTUDO (SEM CARTAZES) === */
          <section 
            className="apple-bento-card" 
            style={{ 
              borderRadius: 0,
              padding: '24px 20px',
              background: 'rgba(22, 26, 19, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="apple-card-kicker-row" style={{ marginBottom: '6px' }}>
              <span className="apple-card-kicker">LIVRO EM ESTUDO • 2º SEMESTRE 2026</span>
              <span className="apple-card-period">{ministry.studyMaterial?.period || "Agosto a Novembro"}</span>
            </div>

            <h2 className="apple-card-title" style={{ marginBottom: '4px' }}>
              Catecismo Nova Cidade
            </h2>
            <div className="apple-card-subtitle" style={{ marginBottom: '14px' }}>
              Segunda Parte: Cristo, Redenção e Graça
            </div>

            <div className="apple-tag-capsule" style={{ borderRadius: 0, marginBottom: '14px' }}>
              <BookOpen size={14} />
              <span>{ministry.studyMaterial?.questions || "Perguntas 21 a 35"}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.94rem', lineHeight: '1.65', color: '#d2d2d7' }}>
              <p style={{ margin: 0 }}>
                O <strong>Catecismo Nova Cidade</strong> é uma abordagem contemporânea e bíblica para ensinar e consolidar as verdades centrais da fé cristã através de perguntas e respostas práticas centradas no Evangelho.
              </p>
              {isBookExpanded && (
                <div style={{ marginTop: '4px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ margin: 0 }}>
                    Neste semestre, em todas as nossas mesas nos lares, estamos nos aprofundando na <em>Segunda Parte: Cristo, Redenção e Graça (Perguntas 21 a 35)</em> — compreendendo a suficiência da cruz, a justificação pela fé e como o Espírito Santo nos capacita a viver uma fé genuína, simples e relacional nos dias comuns.
                  </p>
                  <p style={{ margin: 0 }}>
                    A mesa como princípio fundamental: um espaço de comunhão viva, hospitalidade cristã, partilha sincera das Escrituras e oração mútua pelas famílias e pela cidade.
                  </p>
                  <p style={{ margin: 0, fontStyle: 'italic', color: '#9bad82' }}>
                    “E todos os dias, no templo e de casa em casa, não cessavam de ensinar e de pregar Jesus, o Cristo.” — Atos 5:42
                  </p>
                </div>
              )}
            </div>

            <button 
              className="apple-disclose-btn"
              onClick={() => setIsBookExpanded(!isBookExpanded)}
              style={{ borderRadius: 0, marginTop: '16px' }}
            >
              <span>{isBookExpanded ? 'Minimizar resumo' : 'Ler mais sobre o livro'}</span>
              {isBookExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </section>
        ) : (
          /* === CARROSSEL DE CARTAZES (PARA OS DEMAIS MINISTÉRIOS: SIMPLE TEENS, KIDS, MULHER, ETC) === */
          <div className="apple-carousel-wrapper" style={{ width: '100%' }}>
            <div className="ref-hero-fullbleed-wrapper" style={{ marginTop: 0 }}>
              <div 
                className="ref-featured-card full-bleed"
                onClick={() => handleWhatsAppContact(`Olá! Gostaria de saber mais sobre o evento *${currentEvent.title}* do ${ministry.name}.`)}
              >
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="ref-featured-img full-bleed"
                  style={currentEvent.imagePosition ? { objectPosition: currentEvent.imagePosition } : undefined}
                />

                {/* Next / Prev Nav Arrows (Sem caixas quadradas, igual à Home) */}
                {eventsList.length > 1 && (
                  <>
                    <button
                      className="ref-hero-arrow-btn prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPosterSlide((prev) => (prev - 1 + eventsList.length) % eventsList.length);
                      }}
                      aria-label="Cartaz anterior"
                      title="Anterior"
                    >
                      <ChevronLeft size={30} strokeWidth={2.25} />
                    </button>

                    <button
                      className="ref-hero-arrow-btn next"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPosterSlide((prev) => (prev + 1) % eventsList.length);
                      }}
                      aria-label="Próximo cartaz"
                      title="Próximo"
                    >
                      <ChevronRight size={30} strokeWidth={2.25} />
                    </button>
                  </>
                )}

                {/* Bottom Overlay Details (Mesmos detalhes da home) */}
                <div className="ref-featured-overlay">
                  <div className="ref-featured-title-row">
                    <h2 className="ref-featured-title">{currentEvent.title}</h2>
                    <span className="ref-featured-tag-right">{currentEvent.tagRight || currentEvent.badge}</span>
                  </div>

                  <div className="ref-featured-loc">
                    <MapPin size={13} style={{ flexShrink: 0 }} />
                    <span>{currentEvent.loc || ministry.location || "Rua Miradouro, 319 • Industrial"}</span>
                  </div>

                  {/* Meta Row with 3 badges */}
                  <div className="ref-featured-meta-row">
                    <div className="ref-featured-meta-item">
                      <Clock size={14} color="var(--color-terracotta)" />
                      <span>{currentEvent.time || currentEvent.date}</span>
                    </div>
                    <div className="ref-featured-meta-item">
                      {renderFeature2Icon(currentEvent.feature2Icon)}
                      <span>{currentEvent.feature2 || currentEvent.badge || 'Programação'}</span>
                    </div>
                    <div className="ref-featured-meta-item">
                      {renderFeature3Icon(currentEvent.feature3Icon)}
                      <span>{currentEvent.feature3 || ministry.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dots / Pílulas Pagination below Hero */}
              {eventsList.length > 1 && (
                <div className="ref-featured-dots">
                  {eventsList.map((_, idx) => (
                    <span
                      key={idx}
                      className={`ref-dot ${posterSlide === idx ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPosterSlide(idx);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Cartaz ${idx + 1}`}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Event Description Card below Carousel */}
            {currentEvent.description && (
              <div 
                className="apple-bento-card" 
                style={{ 
                  borderRadius: 0,
                  padding: '16px 20px', 
                  marginTop: '10px',
                  background: 'rgba(22, 26, 19, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)' 
                }}
              >
                <div className="apple-card-kicker-row" style={{ marginBottom: '6px' }}>
                  <span className="apple-card-kicker">DETALHES DO EVENTO</span>
                  <span className="apple-card-period">{currentEvent.tagRight || currentEvent.badge}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.5', color: '#d2d2d7' }}>
                  {currentEvent.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* MESAS NOS BAIRROS (SE HOUVER LARES/CASAS CADASTRADAS) */}
        {ministry.houses && ministry.houses.length > 0 && (
          <section className="apple-section-group" style={{ marginTop: '8px' }}>
            <div className="apple-section-header">
              <div>
                <span className="apple-card-kicker">LOCAIS & HORÁRIOS</span>
                <h2 className="apple-section-headline">Mesas nos Bairros</h2>
              </div>
              <span className="apple-count-pill">{ministry.houses.length} Lares</span>
            </div>
            <p className="apple-section-desc">
              Toque no bairro para abrir a localização, rota e contato do lar.
            </p>

            {/* 2x2 Bento Grid */}
            <div className="apple-bento-grid">
              {ministry.houses.map((house) => (
                <div 
                  key={house.id} 
                  className="apple-bento-item"
                  onClick={() => setSelectedHouse(house)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="apple-bento-item-top">
                    <span className="apple-bento-time-tag">
                      {house.day.split('-')[0]} • 20h
                    </span>
                    <div className="apple-bento-arrow">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  <div className="apple-bento-item-body">
                    <div className="apple-bento-neighborhood">
                      {house.neighborhood.replace(/^Bairro\s+/i, '')}
                    </div>
                    <div className="apple-bento-city">{house.city}</div>
                    <div className="apple-bento-hosts">Casa: {house.hosts}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* APPLE PRIMARY CTA BUTTON */}
        <section className="apple-footer-actions">
          <button 
            className="apple-btn-primary"
            onClick={() => handleWhatsAppContact()}
          >
            <MessageCircle size={18} />
            <span>Falar com a Liderança</span>
          </button>
        </section>
      </main>

      {/* 4. APPLE iOS ACTION SHEET / BOTTOM MODAL */}
      {selectedHouse && (
        <div 
          className="apple-sheet-backdrop animate-fade-in"
          onClick={() => setSelectedHouse(null)}
          role="dialog"
          aria-label={`Detalhes da Casa ${selectedHouse.neighborhood}`}
        >
          <div 
            className="apple-sheet-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Foto da Casa ocupando todo o espaço superior */}
            {selectedHouse.image && (
              <div 
                className="apple-sheet-floating-photo"
                onClick={() => setSelectedHouse(null)}
              >
                <img 
                  src={selectedHouse.image} 
                  alt={selectedHouse.neighborhood}
                  className="apple-sheet-floating-img" 
                />
                <div className="apple-sheet-floating-overlay" />
                <div className="apple-sheet-floating-tag">
                  <span>{selectedHouse.neighborhood} • {selectedHouse.city}</span>
                </div>
              </div>
            )}

            {/* Pop-up mantido na parte inferior com arestas superiores levemente arredondadas */}
            <div className="apple-sheet-panel animate-slide-up">
              <div className="apple-sheet-handle" />

              <header className="apple-sheet-header">
                <div>
                  <span className="apple-sheet-kicker">{selectedHouse.city}</span>
                  <h3 className="apple-sheet-title">{selectedHouse.neighborhood}</h3>
                  <div className="apple-sheet-hosts">Casa: {selectedHouse.hosts}</div>
                </div>
                <button 
                  className="apple-sheet-close"
                  onClick={() => setSelectedHouse(null)}
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="apple-sheet-body">
                {/* Encontro Pill */}
                <div className="apple-sheet-time-box">
                  <Clock size={16} />
                  <span>Toda {selectedHouse.day.toLowerCase()} às {selectedHouse.time}</span>
                </div>

                {/* Endereço */}
                <div className="apple-sheet-address-box">
                  <MapPin size={18} className="apple-pin-icon" />
                  <div>
                    <div className="apple-address-street">{selectedHouse.address}</div>
                    <div className="apple-address-region">
                      {selectedHouse.neighborhood} — {selectedHouse.city}, MG
                    </div>
                  </div>
                </div>

                {/* Apple Action Buttons */}
                <div className="apple-sheet-actions">
                  <button 
                    className="apple-sheet-btn-blue"
                    onClick={() => window.open(selectedHouse.mapsUrl, '_blank')}
                  >
                    <Navigation size={17} />
                    <span>Abrir no Google Maps</span>
                  </button>

                  <button 
                    className="apple-sheet-btn-whatsapp"
                    onClick={() => handleWhatsAppContact(
                      `Olá! Gostaria de participar dos encontros do De Casa em Casa na *Casa de ${selectedHouse.hosts}* (${selectedHouse.neighborhood} - ${selectedHouse.city}). Como posso me integrar?`
                    )}
                  >
                    <MessageCircle size={17} />
                    <span>Participar pelo WhatsApp</span>
                  </button>

                  <button 
                    className="apple-sheet-btn-copy"
                    onClick={() => handleCopyAddress(selectedHouse)}
                  >
                    {copiedId === selectedHouse.id ? (
                      <>
                        <Check size={16} color="#34c759" />
                        <span>Endereço Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copiar Endereço</span>
                      </>
                    )}
                  </button>
                </div>

                <button 
                  className="apple-sheet-dismiss"
                  onClick={() => setSelectedHouse(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
