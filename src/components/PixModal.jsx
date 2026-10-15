import React, { useState } from 'react';
import { X, Copy, Check, Heart, Shield } from 'lucide-react';
import { CHURCH_INFO } from '../data/mockData';

export default function PixModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(CHURCH_INFO.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Contribuir com PIX"
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-terracotta)' }}>
            <Heart size={20} />
            <h3 className="modal-title">Dízimos & Ofertas</h3>
          </div>
          <button className="header-icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 16 }}>
          Agradecemos de coração pela sua generosidade e parceria no avanço do Reino de Deus através da Igreja Cristã Simples.
        </p>

        <div className="pix-key-pill" style={{ margin: '0 0 16px' }}>
          <span style={{ userSelect: 'all' }}>{CHURCH_INFO.pixKey}</span>
          <button
            className="btn-primary"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            onClick={handleCopy}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar Chave'}
          </button>
        </div>

        <div style={{
          background: 'var(--color-surface-elevated)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          marginBottom: 16
        }}>
          <div><strong>Favorecido:</strong> {CHURCH_INFO.pixBank}</div>
          <div><strong>Chave E-mail:</strong> {CHURCH_INFO.pixKey}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-success)', marginTop: 4 }}>
            <Shield size={14} />
            <span>Chave oficial verificada pela liderança da igreja</span>
          </div>
        </div>

        <button className="btn-secondary" style={{ width: '100%' }} onClick={onClose}>
          Fechar Janela
        </button>
      </div>
    </div>
  );
}
