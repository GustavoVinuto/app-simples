import React from 'react';
import { X, Share2, Calendar, Tag, ArrowRight } from 'lucide-react';

export default function BulletinDetailModal({ bulletin, onClose, setActiveTab }) {
  if (!bulletin) return null;

  const handleShare = () => {
    const text = encodeURIComponent(
      `📢 *${bulletin.title}*\n\n` +
      `🗓️ ${bulletin.date} — Igreja Cristã Simples\n\n` +
      `${bulletin.summary}\n\n` +
      `Veja no app: https://igrejacristasimples.com.br/`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Detalhes do Informativo"
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="bulletin-badge">{bulletin.category}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{bulletin.date}</span>
          </div>
          <button className="header-icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <img
          src={bulletin.image}
          alt={bulletin.title}
          style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 14 }}
        />

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.25, marginBottom: 12 }}>
          {bulletin.title}
        </h3>

        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 20 }}>
          {bulletin.content || bulletin.summary}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {bulletin.actionTab && (
            <button
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                onClose();
                setActiveTab(bulletin.actionTab);
              }}
            >
              {bulletin.actionText || 'Ver Detalhes'} <ArrowRight size={14} />
            </button>
          )}

          {bulletin.actionLink && (
            <a
              href={bulletin.actionLink}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ flex: 1 }}
            >
              {bulletin.actionText || 'Acessar Link'} <ArrowRight size={14} />
            </a>
          )}

          <button
            className="btn-whatsapp"
            onClick={handleShare}
            title="Compartilhar no WhatsApp"
          >
            <Share2 size={16} />
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
}
