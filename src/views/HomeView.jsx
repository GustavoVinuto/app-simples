import React, { useState, useEffect } from 'react';
import {
  MapPin, Clock, Heart, Users, Baby, Utensils,
  Sparkles, Shield, MessageCircle, X, Quote, BookOpen,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Home
} from 'lucide-react';
import { CHURCH_INFO, CHURCH_MINISTRIES } from '../data/mockData';
import { useAudio } from '../context/AudioContext';
import MinistryDetailView from './MinistryDetailView';

export default function HomeView({ setActiveTab, onOpenPix }) {
  const { sermons, playSermon } = useAudio();
  const latestSermon = sermons[0];

  const [heroSlide, setHeroSlide] = useState(0);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [isSimplesExpanded, setIsSimplesExpanded] = useState(false);

  // Escuta clique na aba Início para resetar o ministério se estiver aberto
  useEffect(() => {
    const handleReset = () => {
      setSelectedMinistry(null);
    };
    window.addEventListener('resetHomeMinistry', handleReset);
    return () => window.removeEventListener('resetHomeMinistry', handleReset);
  }, []);

  const getMinistryIcon = (id) => {
    switch (id) {
      case 'de-casa-em-casa':
        return <Home size={16} color="#60a5fa" />;
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
      badge: "Série Atual • Microsérie",
      title: "Série atual",
      //tagRight: "11.10 • 9h",
      loc: "Rua Miradouro, 319 • Industrial São Luiz",
      time: "Domingos às 09h00",
      feature2: "Microsérie",
      feature2Icon: "sparkles",
      feature3: "Culto & Comunidade",
      feature3Icon: "users",
      image: "/serie-inside-outside.jpg",
      imagePosition: "center 60%",
      targetTab: "sermons"
    },
    {
      badge: "Relacional Simples²⁶",
      title: "De Casa em Casa",
      //tagRight: "Ter, Qua & Qui",
      loc: "Europa, Tropical, Estâncias & Masterville",
      time: "Semanalmente às 20h00",
      feature2: "Catecismo Nova Cidade",
      feature2Icon: "book",
      feature3: "4 Lares em Comunhão",
      feature3Icon: "home",
      image: "/relacional/cartaz-de-casa-em-casa.png",
      imagePosition: "center 30%",
      ministryId: "de-casa-em-casa"
    },
    {
      badge: "Mulher Simples",
      title: "Sala de Oração",
      //tagRight: "Todo Domingo • 8h30",
      loc: "Rua Miradouro, 319 • Industrial São Luiz",
      time: "Todo domingo às 08h30",
      feature2: "Oração & Clamor",
      feature2Icon: "sparkles",
      feature3: "Somente Mulheres",
      feature3Icon: "heart",
      image: "/sala-de-oracao.jpg",
      imagePosition: "center 38%",
      ministryId: "mulher-simples"
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto-advance cartazes every 5.5s com reset adequado ao mudar de slide
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlide, heroSlides.length, isPaused]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      // swipe para a esquerda -> próximo
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    } else if (diff < -45) {
      // swipe para a direita -> anterior
      setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
    setTouchStartX(null);
  };

  const handleHeroSlideClick = (slide) => {
    if (slide.ministryId) {
      const min = CHURCH_MINISTRIES.find(m => m.id === slide.ministryId);
      if (min) {
        setSelectedMinistry(min);
        return;
      }
    }
    if (slide.targetTab) {
      setActiveTab(slide.targetTab);
    } else if (slide.isSermon && latestSermon) {
      playSermon(latestSermon);
    } else if (slide.link) {
      window.open(slide.link, '_blank');
    } else {
      setActiveTab('bulletins');
    }
  };

  // Se um ministério estiver selecionado, exibe os detalhes dentro do app
  if (selectedMinistry) {
    return (
      <MinistryDetailView
        ministry={selectedMinistry}
        onBack={() => {
          setSelectedMinistry(null);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  return (
    <div className="home-ref-container animate-fade-in">
      {/* 4. FEATURED HERO SHOWCASE SLIDER (Trilha Contínua com Transição Deslizante Suave) */}
      <div 
        className="ref-hero-fullbleed-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="ref-hero-slider-container">
          <div 
            className="ref-hero-track"
            style={{ transform: `translateX(-${heroSlide * 100}%)` }}
          >
            {heroSlides.map((slide, idx) => (
              <div 
                key={idx}
                className="ref-hero-slide-item"
                onClick={() => handleHeroSlideClick(slide)}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="ref-featured-img full-bleed"
                  style={slide.imagePosition ? { objectPosition: slide.imagePosition } : undefined}
                  loading={idx === 0 ? "eager" : "lazy"}
                />

                {/* Bottom Overlay Details */}
                <div className="ref-featured-overlay">
                  <div className="ref-featured-title-row">
                    <h2 className="ref-featured-title">{slide.title}</h2>
                    <span className="ref-featured-tag-right">{slide.tagRight}</span>
                  </div>

                  <div className="ref-featured-loc">
                    <MapPin size={13} style={{ flexShrink: 0 }} />
                    <span>{slide.loc}</span>
                  </div>

                  {/* Meta Row with 3 badges */}
                  <div className="ref-featured-meta-row">
                    <div className="ref-featured-meta-item">
                      <Clock size={14} color="var(--color-terracotta)" />
                      <span>{slide.time}</span>
                    </div>
                    <div className="ref-featured-meta-item">
                      {slide.feature2Icon === 'sparkles' ? (
                        <Sparkles size={14} color="#e5b25d" />
                      ) : slide.feature2Icon === 'book' ? (
                        <BookOpen size={14} color="#60a5fa" />
                      ) : (
                        <Utensils size={14} color="var(--color-olive-300)" />
                      )}
                      <span>{slide.feature2}</span>
                    </div>
                    <div className="ref-featured-meta-item">
                      {slide.feature3Icon === 'heart' ? (
                        <Heart size={14} color="var(--color-terracotta)" fill="var(--color-terracotta)" />
                      ) : slide.feature3Icon === 'baby' ? (
                        <Baby size={14} color="#7cb342" />
                      ) : slide.feature3Icon === 'home' ? (
                        <Home size={14} color="#60a5fa" />
                      ) : (
                        <Users size={14} color="#e5b25d" />
                      )}
                      <span>{slide.feature3}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
            <ChevronLeft size={30} strokeWidth={2.25} />
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
            <ChevronRight size={30} strokeWidth={2.25} />
          </button>
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
          <h3 className="ref-section-title">Ministérios</h3>
        </div>

        <div className="ref-ministries-grid">
          {CHURCH_MINISTRIES.map((ministry) => (
            <div
              key={ministry.id}
              className={`ref-ministry-grid-card ${ministry.featured ? 'featured' : ''}`}
              onClick={() => setSelectedMinistry(ministry)}
              role="button"
              tabIndex={0}
            >
              <img
                src={ministry.image}
                alt={ministry.name}
                className="ref-ministry-grid-img"
                style={ministry.id === 'de-casa-em-casa' ? { objectPosition: 'center center' } : undefined}
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
              {isSimplesExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
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
                <ChevronDown size={20} />
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
              <ChevronUp size={22} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
