import React, { useState, useMemo } from 'react';
import { Newspaper, Share2, Calendar, ArrowRight, Tag } from 'lucide-react';

export default function BulletinsView({ bulletins, onSelectBulletin }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(bulletins.map(b => b.category));
    return ['all', ...Array.from(cats)];
  }, [bulletins]);

  const filteredBulletins = useMemo(() => {
    if (selectedCategory === 'all') return bulletins;
    return bulletins.filter(b => b.category === selectedCategory);
  }, [bulletins, selectedCategory]);

  const handleShare = (e, bulletin) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `📢 *Informativo — Igreja Cristã Simples*\n\n` +
      `*${bulletin.title}*\n` +
      `🗓️ ${bulletin.date}\n\n` +
      `${bulletin.summary}\n\n` +
      `Confira completo no App da Simples: https://igrejacristasimples.com.br/`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="bulletins-view animate-fade-in">
      <div className="section-title-wrap">
        <div>
          <h2 className="section-title">Informativos & Avisos</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Mural oficial com liturgia, encontros, avisos ministeriais e eventos.
          </p>
        </div>
      </div>

      {/* Category Chips */}
      <div className="chips-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            <Tag size={13} />
            {cat === 'all' ? 'Todos os Avisos' : cat}
          </button>
        ))}
      </div>

      {/* Bulletins Feed */}
      <div className="bulletins-list">
        {filteredBulletins.map((bulletin) => (
          <article
            key={bulletin.id}
            className="bulletin-card"
            onClick={() => onSelectBulletin(bulletin)}
          >
            <img
              src={bulletin.image}
              alt={bulletin.title}
              className="bulletin-img"
              loading="lazy"
            />
            <div className="bulletin-body">
              <div className="bulletin-badge-row">
                <span className="bulletin-badge">{bulletin.category}</span>
                <span className="bulletin-date">{bulletin.date}</span>
              </div>

              <h3 className="bulletin-title">{bulletin.title}</h3>
              <p className="bulletin-summary">{bulletin.summary}</p>

              <div className="bulletin-actions">
                <button
                  className="btn-primary"
                  style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                >
                  Ler Informativo <ArrowRight size={14} />
                </button>

                <button
                  className="header-icon-btn"
                  onClick={(e) => handleShare(e, bulletin)}
                  title="Compartilhar no WhatsApp"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
