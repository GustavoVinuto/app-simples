import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Layers, Quote } from 'lucide-react';
import { splitTextIntoSlides } from '../utils/textUtils';

/**
 * Carrossel de Imagens no Feed (Instagram-style)
 * Suporta toque/swipe no mobile, setas laterais, indicador de página (1/3) e bolinhas.
 */
export function FeedImageCarousel({ images = [], alt = 'Foto', onDoubleTap }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (!images || images.length === 0) return null;

  // Se tiver apenas 1 imagem, renderiza normal sem controles de carrossel
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className="feed-post-image"
        loading="lazy"
        onDoubleClick={onDoubleTap}
      />
    );
  }

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && currentIndex < images.length - 1) {
        // Swipe para a esquerda -> próximo
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe para a direita -> anterior
        setCurrentIndex((prev) => prev - 1);
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className="feed-carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={onDoubleTap}
    >
      {/* Contador no topo direito (ex: 1/4) */}
      <div className="feed-carousel-badge">
        <Layers size={12} />
        <span>
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Track de Imagens Deslizante */}
      <div
        className="feed-carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgUrl, idx) => (
          <div key={idx} className="feed-carousel-slide">
            <img
              src={imgUrl}
              alt={`${alt} - Foto ${idx + 1}`}
              className="feed-post-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Seta Esquerda */}
      {currentIndex > 0 && (
        <button
          className="feed-carousel-arrow left"
          onClick={handlePrev}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Seta Direita */}
      {currentIndex < images.length - 1 && (
        <button
          className="feed-carousel-arrow right"
          onClick={handleNext}
          aria-label="Próxima foto"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Indicadores / Pontos no Rodapé */}
      <div className="feed-carousel-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`feed-carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Ir para foto ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Carrossel de Texto / Reflexões Longas no Feed
 * Quando a mensagem/reflexão for longa, é dividida em slides/cartões de leitura.
 */
export function FeedTextCarousel({
  textContent = '',
  textSlides = [],
  authorName = 'Comunidade Simples',
  backgroundColor,
  onDoubleTap
}) {
  const slides =
    textSlides && textSlides.length > 0
      ? textSlides
      : splitTextIntoSlides(textContent);

  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Se for texto curto (1 slide), renderiza o card tradicional
  if (slides.length <= 1) {
    return (
      <div
        className="feed-post-text-card"
        style={{ background: backgroundColor || 'var(--color-surface-elevated)' }}
        onDoubleClick={onDoubleTap}
      >
        <Sparkles size={24} className="feed-post-text-sparkle" />
        <p className="feed-post-text-content">{slides[0] || textContent}</p>
        <span className="feed-post-text-signature">— {authorName}</span>
      </div>
    );
  }

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeSlide < slides.length - 1) {
        setActiveSlide((prev) => prev + 1);
      } else if (diff < 0 && activeSlide > 0) {
        setActiveSlide((prev) => prev - 1);
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className="feed-text-carousel-card"
      style={{ background: backgroundColor || 'var(--color-surface-elevated)' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={onDoubleTap}
    >
      {/* Top Header do Carrossel de Texto */}
      <div className="feed-text-carousel-header">
        <div className="feed-text-carousel-tag">
          <Sparkles size={14} className="feed-post-text-sparkle" style={{ margin: 0 }} />
          <span>Reflexão em Carrossel</span>
        </div>
        <div className="feed-text-carousel-count">
          Pág. {activeSlide + 1} de {slides.length}
        </div>
      </div>

      {/* Conteúdo do Slide de Texto */}
      <div className="feed-text-carousel-body">
        <Quote size={24} className="feed-text-quote-icon" />
        <p className="feed-post-text-content feed-text-carousel-content">
          {slides[activeSlide]}
        </p>
      </div>

      {/* Setas Laterais de Navegação */}
      {activeSlide > 0 && (
        <button
          className="feed-carousel-arrow left text-mode"
          onClick={handlePrev}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {activeSlide < slides.length - 1 && (
        <button
          className="feed-carousel-arrow right text-mode"
          onClick={handleNext}
          aria-label="Próximo slide"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Rodapé com Assinatura e Indicadores de Página */}
      <div className="feed-text-carousel-footer">
        <div className="feed-text-carousel-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`feed-carousel-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(idx);
              }}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
        <span className="feed-post-text-signature">— {authorName}</span>
      </div>
    </div>
  );
}
