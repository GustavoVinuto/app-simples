import React from 'react';
import { Users, Clock, MapPin, BookOpen, MessageCircle, HeartHandshake } from 'lucide-react';
import { INITIAL_TABLE_GROUPS, CHURCH_INFO } from '../data/mockData';

export default function MesasView() {
  const handleJoinMesa = (mesa) => {
    const text = encodeURIComponent(
      `Olá! Tenho interesse em participar da *${mesa.name}* (${mesa.region}) nos encontros relacionais da Igreja Cristã Simples.`
    );
    window.open(`https://wa.me/${mesa.contactPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="mesas-view animate-fade-in">
      <div className="section-title-wrap">
        <div>
          <h2 className="section-title">As Mesas da Simples</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Nossos encontros relacionais nos lares durante a semana.
          </p>
        </div>
      </div>

      {/* Theological Principle Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(97, 103, 79, 0.25), rgba(37, 43, 32, 0.4))',
        border: '1px solid rgba(220, 125, 110, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--color-terracotta)' }}>
          <HeartHandshake size={20} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: 1 }}>
            Um Princípio Inegociável
          </span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: 10 }}>
          "A mesa não é um lugar de satisfação de necessidades passageiras, mas o lugar onde nossa <strong>IDENTIDADE</strong> é forjada. É em volta do pão, do café e da conversa sincera que aprendemos a viver como família em Cristo."
        </p>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-olive-200)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>📖 Estudo de livros cristãos</span> • <span>☕ Comunhão genuína</span> • <span>🙏 Oração mútua</span>
        </div>
      </div>

      {/* Active Mesas List */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-text-muted)' }}>
          Mesas Ativas em Contagem e Região
        </h3>

        {INITIAL_TABLE_GROUPS.map((mesa) => (
          <div key={mesa.id} className="mesa-card">
            <div className="mesa-title-row">
              <h4 className="mesa-name">{mesa.name}</h4>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--color-success)',
                background: 'rgba(103, 185, 130, 0.15)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)'
              }}>
                {mesa.spotsLeft} vagas abertas
              </span>
            </div>

            <div className="mesa-region">
              <MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />
              {mesa.region} • {mesa.addressSummary}
            </div>

            <div className="mesa-details-grid">
              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>Horário:</strong>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} /> {mesa.dayTime}
                </span>
              </div>

              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>Anfitriões:</strong>
                <span>{mesa.hosts}</span>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>Livro em Estudo:</strong>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-olive-300)' }}>
                  <BookOpen size={13} /> {mesa.currentBook}
                </span>
              </div>
            </div>

            <div className="mesa-tag-row">
              {mesa.tags.map((tag, idx) => (
                <span key={idx} className="mesa-tag">{tag}</span>
              ))}
            </div>

            <button
              className="btn-whatsapp"
              style={{ width: '100%' }}
              onClick={() => handleJoinMesa(mesa)}
            >
              <MessageCircle size={16} />
              Quero Participar Desta Mesa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
