import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Heart, Users, Baby, Utensils, 
  Sparkles, Shield, MessageCircle, X, Quote, BookOpen,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Camera
} from 'lucide-react';
import { CHURCH_INFO, CHURCH_MINISTRIES } from '../data/mockData';
import { useAudio } from '../context/AudioContext';

export default function HomeView({ setActiveTab, onOpenPix }) {
  const { sermons, playSermon } = useAudio();
  const latestSermon = sermons[0];

  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroLiked, setIsHeroLiked] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [isSimplesExpanded, setIsSimplesExpanded] = useState(false);

  const getMinistryIcon = (id) => {
    switch (id) {
      case 'simple-teens':
        return <Sparkles size={16} color="#e5b25d" />;
      case 'mulher-simples':
        return <Heart size={16} color="var(--color-terracotta)" fill="var(--color-terracotta)" />;
      case 'simple-kids':
        return <Baby size={16} color="#7cb342" />;
      case 'hermanos':
        return <Shield size={16} color="#4fc3f7" />;
      default:
        return <Users size={16} color="var(--color-olive-300)" />;
    }
  };

  // 3 Featured Event Cartazes
  const heroSlides = [
    {
      badge: "Próximo Culto",
      title: "Culto Público & Mesa",
      tagRight: "Domingo • 09h",
      loc: "Rua Miradouro, 319 • Industrial São Luiz",
      time: "Domingo às 09h00",
      feature2: "Mesa da Ceia",
      feature2Icon: "utensils",
      feature3: "Comunhão",
      feature3Icon: "users",
      image: CHURCH_INFO.heroImage,
      link: CHURCH_INFO.googleMapsUrl
    },
    {
      badge: "Mulher Simples",
      title: "Chá & Encontro de Mulheres",
      tagRight: "24 de Out • 16h",
      loc: "Rua Miradouro, 319 • Industrial São Luiz",
      time: "Sábado às 16h00",
      feature2: "Café & Partilha",
      feature2Icon: "utensils",
      feature3: "Edificação",
      feature3Icon: "heart",
      image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg",
      link: `https://wa.me/5531989844775?text=${encodeURIComponent('Olá! Gostaria de participar do Encontro Mulher Simples na Igreja Cristã Simples.')}`
    },
    {
      badge: "Simple Kids",
      title: "Manhã Especial das Crianças",
      tagRight: "18 de Out • 09h",
      loc: "Rua Miradouro, 319 • Industrial São Luiz",
      time: "Domingo às 09h00",
      feature2: "Oficina Bíblica",
      feature2Icon: "sparkles",
      feature3: "0 a 11 anos",
      feature3Icon: "baby",
      image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/banner_criancas.jpg",
      link: `https://wa.me/5531989844775?text=${encodeURIComponent('Olá! Gostaria de mais informações sobre o evento do Simple Kids na Igreja Cristã Simples.')}`
    }
  ];

  // Auto-advance cartazes every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[heroSlide];

  const handleHeroAction = () => {
    if (currentSlide.isSermon && latestSermon) {
      playSermon(latestSermon);
    } else if (currentSlide.link) {
      window.open(currentSlide.link, '_blank');
    } else {
      setActiveTab('bulletins');
    }
  };

  return (
    <div className="home-ref-container animate-fade-in">
      {/* 4. FEATURED HERO SHOWCASE CARD (Cartaz Principal Ocupando a Tela Toda, Sem Arestas Arredondadas) */}
      <div className="ref-hero-fullbleed-wrapper">
        <div className="ref-featured-card full-bleed" onClick={handleHeroAction}>
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="ref-featured-img full-bleed"
          />

          {/* Top-left Badge */}
          <div className="ref-featured-badge">
            {currentSlide.badge}
          </div>

          {/* Top-right Heart Button */}
          <button
            className="ref-featured-heart-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsHeroLiked(!isHeroLiked);
            }}
            title={isHeroLiked ? 'Remover favorito' : 'Salvar evento'}
          >
            <Heart size={18} fill={isHeroLiked ? 'var(--color-terracotta)' : 'none'} color={isHeroLiked ? 'var(--color-terracotta)' : '#1a1a1a'} />
          </button>

          {/* Next / Prev Nav Arrows */}
          <button
            className="ref-hero-arrow-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
            }}
            aria-label="Cartaz anterior"
            title="Anterior"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className="ref-hero-arrow-btn next"
            onClick={(e) => {
              e.stopPropagation();
              setHeroSlide((prev) => (prev + 1) % heroSlides.length);
            }}
            aria-label="Próximo cartaz"
            title="Próximo"
          >
            <ChevronRight size={16} />
          </button>

          {/* Bottom Overlay Details */}
          <div className="ref-featured-overlay">
            <div className="ref-featured-title-row">
              <h2 className="ref-featured-title">{currentSlide.title}</h2>
              <span className="ref-featured-tag-right">{currentSlide.tagRight}</span>
            </div>

            <div className="ref-featured-loc">
              <MapPin size={13} style={{ flexShrink: 0 }} />
              <span>{currentSlide.loc}</span>
            </div>

            {/* Meta Row with 3 badges */}
            <div className="ref-featured-meta-row">
              <div className="ref-featured-meta-item">
                <Clock size={14} color="var(--color-terracotta)" />
                <span>{currentSlide.time}</span>
              </div>
              <div className="ref-featured-meta-item">
                {currentSlide.feature2Icon === 'sparkles' ? (
                  <Sparkles size={14} color="#e5b25d" />
                ) : (
                  <Utensils size={14} color="var(--color-olive-300)" />
                )}
                <span>{currentSlide.feature2}</span>
              </div>
              <div className="ref-featured-meta-item">
                {currentSlide.feature3Icon === 'heart' ? (
                  <Heart size={14} color="var(--color-terracotta)" fill="var(--color-terracotta)" />
                ) : currentSlide.feature3Icon === 'baby' ? (
                  <Baby size={14} color="#7cb342" />
                ) : (
                  <Users size={14} color="#e5b25d" />
                )}
                <span>{currentSlide.feature3}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dots / Pílulas Pagination below Hero */}
        <div className="ref-featured-dots">
          {heroSlides.map((_, idx) => (
            <span
              key={idx}
              className={`ref-dot ${heroSlide === idx ? 'active' : ''}`}
              onClick={() => setHeroSlide(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Cartaz ${idx + 1}`}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

      {/* 5. MINISTÉRIOS SECTION (Replacing "Mesas nos Bairros") */}
      <div className="ref-section">
        <div className="ref-section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 className="ref-section-title">Ministérios</h3>
            <span className="ref-ministries-count-badge">4 Áreas</span>
          </div>
          <span className="ref-section-subtext">Comunidade em Família</span>
        </div>

        <div className="ref-ministries-grid">
          {CHURCH_MINISTRIES.map((ministry) => (
            <div
              key={ministry.id}
              className="ref-ministry-grid-card"
              onClick={() => setSelectedMinistry(ministry)}
              role="button"
              tabIndex={0}
            >
              <img
                src={ministry.image}
                alt={ministry.name}
                className="ref-ministry-grid-img"
                loading="lazy"
              />

              {/* Floating Ministry Icon Badge */}
              <div className="ref-ministry-icon-badge">
                {getMinistryIcon(ministry.id)}
              </div>

              {/* Gradient Overlay with Name and Age/Subtitle */}
              <div className="ref-ministry-grid-overlay">
                <div className="ref-ministry-grid-name">{ministry.name}</div>
                <div className="ref-ministry-grid-sub">{ministry.subtitle || ministry.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5.5 BANNER ATALHO PARA O FEED DA COMUNIDADE */}
      <div 
        className="home-feed-shortcut-card"
        onClick={() => setActiveTab('feed')}
        role="button"
        tabIndex={0}
      >
        <div className="home-feed-shortcut-left">
          <div className="home-feed-icon-circle">
            <Camera size={18} color="#ffffff" />
          </div>
          <div>
            <div className="home-feed-shortcut-title">
              <span>Mural da Comunidade</span>
              <span className="home-feed-shortcut-badge">Interativo</span>
            </div>
            <p className="home-feed-shortcut-sub">
              Fotos, vídeos e interações do culto e da semana
            </p>
          </div>
        </div>
        <ChevronRight size={18} className="home-feed-shortcut-arrow" />
      </div>

      {/* 6. CARD "A SIMPLES" - TODAS AS INFORMAÇÕES DA ABA DO SITE (EXPANSÍVEL) */}
      <div className={`a-simples-card ${isSimplesExpanded ? 'expanded' : 'collapsed'}`}>
        <div 
          className="a-simples-card-header"
          onClick={() => setIsSimplesExpanded(!isSimplesExpanded)}
          role="button"
          tabIndex={0}
          title={isSimplesExpanded ? "Toque para minimizar" : "Toque para expandir"}
        >
          <div className="a-simples-header-top">
            <div className="a-simples-badge">
              <BookOpen size={12} />
              <span>Nossa Identidade</span>
            </div>

            <button
              className="a-simples-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsSimplesExpanded(!isSimplesExpanded);
              }}
              aria-label={isSimplesExpanded ? "Minimizar card A Simples" : "Expandir card A Simples"}
            >
              <span>{isSimplesExpanded ? "Minimizar" : "Expandir"}</span>
              {isSimplesExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <h3 className="a-simples-card-title">A SIMPLES</h3>
          <p className="a-simples-card-tagline">Missional e Relevante</p>

          {!isSimplesExpanded && (
            <div className="a-simples-collapsed-preview">
              <p>
                Viver o evangelho em seu formato mínimo composto. Toque para conhecer nossa espiritualidade, dias comuns e o modelo da bacia e toalha.
              </p>
              <div className="a-simples-expand-hint">
                <span>Ver informações completas</span>
                <ChevronDown size={14} />
              </div>
            </div>
          )}
        </div>

        {/* CONTEÚDO EXPANDIDO */}
        {isSimplesExpanded && (
          <div className="a-simples-expanded-body animate-fade-in">
            {/* 1. DEUS É SIMPLES */}
            <div className="a-simples-topic">
              <div className="a-simples-topic-heading">
                <span className="a-simples-topic-indicator" />
                <h4>DEUS É SIMPLES</h4>
              </div>

              <div className="a-simples-scripture-box">
                <Quote size={20} className="a-simples-quote-icon" />
                <p className="a-simples-scripture-text">
                  “Disse Moisés a Deus: Eis que, quando eu vier aos filhos de Israel e lhes disser: O Deus de vossos pais me enviou a vós outros; e eles me perguntarem: Qual é o seu nome? Que lhes direi? Disse Deus a Moisés: <strong>Eu Sou o Que Sou</strong>. Disse mais: Assim dirás aos filhos de Israel: Eu Sou me enviou a vós outros.”
                </p>
                <span className="a-simples-scripture-ref">Êxodo 3:13-14</span>
              </div>

              <p className="a-simples-paragraph">
                Ora, então o que queremos dizer quando afirmamos que Deus é simples? Uma definição mais precisa da simplicidade de Deus é: <strong>Deus não é um ser composto</strong>. Ele não é dependente dos Seus atributos para existir, assim como Sua existência não é uma consequência dos Seus atributos. Em outras palavras, Deus não pode ser separado em partes, mas deve ser sempre considerado como um Ser único e puro, sem divisões.
              </p>

              <div className="a-simples-photo-wrapper">
                <img 
                  src="https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-36.jpg" 
                  alt="Comunhão Igreja Cristã Simples" 
                  className="a-simples-photo"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="a-simples-divider" />

            {/* 2. QUEREMOS SER SIMPLES */}
            <div className="a-simples-topic">
              <div className="a-simples-topic-heading">
                <span className="a-simples-topic-indicator" />
                <h4>QUEREMOS SER SIMPLES</h4>
              </div>

              <p className="a-simples-paragraph lead">
                Embora só Deus seja simples, nos esforçamos para viver o evangelho em seu formato mínimo, ou seja: <strong>o mínimo composto possível</strong>.
              </p>

              <div className="a-simples-pillars-row">
                {/* Pilar 1 */}
                <div className="a-simples-pillar-box">
                  <div className="a-simples-pillar-badge">Fundamento</div>
                  <h5>COMO JESUS</h5>
                  <p>
                    O fundamento da Espiritualidade de uma Igreja Simples é <strong>JESUS</strong>. Ele é nosso modelo. Embora tenhamos uma confissão local que a cada dia se desenha, Ele é nosso fundamento.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className="a-simples-pillar-box">
                  <div className="a-simples-pillar-badge">Vida Prática</div>
                  <h5>DIAS COMUNS</h5>
                  <p>
                    Dias comuns fazem parte de uma vida extraordinária. O crescimento e desenvolvimento acontece sob o desejo de Deus e os efeitos naturais da aplicação e prática do Evangelho. É Ele quem acrescenta.
                  </p>
                </div>
              </div>
            </div>

            <div className="a-simples-divider" />

            {/* 3. BACIA E TOALHA */}
            <div className="a-simples-bacia-card">
              <img 
                src="https://igrejacristasimples.com.br/wp-content/uploads/2024/08/IMG_4260-1.jpg" 
                alt="Bacia e Toalha - Liderança Servil" 
                className="a-simples-bacia-bg"
                loading="lazy"
              />
              <div className="a-simples-bacia-overlay">
                <h4>BACIA E TOALHA</h4>
                <p>
                  Este é o Modelo de Liderança de nossa comunidade. Onde o líder é aquele que ama primeiro. Aquele que serve, que se dobra diante de seu irmão.
                </p>
              </div>
            </div>

            {/* BOTÃO PARA MINIMIZAR NO FINAL */}
            <button
              className="a-simples-bottom-collapse-btn"
              onClick={() => setIsSimplesExpanded(false)}
              aria-label="Minimizar card A Simples"
            >
              <span>Minimizar</span>
              <ChevronUp size={16} />
            </button>
          </div>
        )}
      </div>

      {/* MODAL DETALHES DO MINISTÉRIO */}
      {selectedMinistry && (
        <div className="modal-backdrop" onClick={() => setSelectedMinistry(null)}>
          <div 
            className="ministry-modal-content animate-slide-up" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ministry-modal-hero">
              <img 
                src={selectedMinistry.image} 
                alt={selectedMinistry.name} 
                className="ministry-modal-img" 
              />
              <button 
                className="ministry-modal-close" 
                onClick={() => setSelectedMinistry(null)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
              <div className="ministry-modal-hero-badge">
                {getMinistryIcon(selectedMinistry.id)}
                <span>{selectedMinistry.subtitle || selectedMinistry.age}</span>
              </div>
            </div>

            <div className="ministry-modal-body">
              <h2 className="ministry-modal-title">{selectedMinistry.name}</h2>
              <p className="ministry-modal-desc">{selectedMinistry.description}</p>

              <div className="ministry-modal-info-box">
                <div className="ministry-modal-info-row">
                  <span className="info-label">Público:</span>
                  <span className="info-value">{selectedMinistry.age}</span>
                </div>
                <div className="ministry-modal-info-row">
                  <span className="info-label">Encontros:</span>
                  <span className="info-value">Aos Domingos e encontros mensais</span>
                </div>
                <div className="ministry-modal-info-row">
                  <span className="info-label">Local:</span>
                  <span className="info-value">Igreja Cristã Simples • Industrial</span>
                </div>
              </div>

              <div className="ministry-modal-actions">
                <button
                  className="ministry-whatsapp-btn"
                  onClick={() => {
                    const text = encodeURIComponent(
                      selectedMinistry.whatsappMessage || 
                      `Olá! Gostaria de saber mais sobre o ministério ${selectedMinistry.name} da Igreja Cristã Simples.`
                    );
                    window.open(`https://wa.me/5531989844775?text=${text}`, '_blank');
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Conectar no WhatsApp</span>
                </button>
                <button
                  className="ministry-close-btn"
                  onClick={() => setSelectedMinistry(null)}
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
