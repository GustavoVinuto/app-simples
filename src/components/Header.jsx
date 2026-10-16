import React, { useState } from 'react';
import { Moon, Sun, Bell, ShieldCheck, MessageCircle, Heart, Check } from 'lucide-react';
import { CHURCH_INFO } from '../data/mockData';

export default function Header({ theme, toggleTheme, onOpenAdmin, onOpenPix }) {
  const [hasNotif, setHasNotif] = useState(true);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  return (
    <header className="app-header">
      <div className="header-brand">
        <img
          src={CHURCH_INFO.faviconUrl}
          alt="Logo Igreja Cristã Simples"
          className="header-logo"
        />
        <div className="header-titles">
          <span className="church-title">{CHURCH_INFO.shortName}</span>
          <span className="church-tagline">{CHURCH_INFO.tagline}</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Generosity PIX */}
        <button
          className="header-icon-btn"
          onClick={onOpenPix}
          title="Contribuir com PIX"
          aria-label="Contribuir com PIX"
        >
          <Heart size={14} color="var(--color-terracotta)" />
        </button>

        {/* Theme Toggle (Dark/Light) */}
        <button
          className="header-icon-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          aria-label="Alternar Tema"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Notification Bell with unread dot matching reference image */}
        <div style={{ position: 'relative' }}>
          <button
            className="header-icon-btn"
            onClick={() => {
              setShowNotifPopover(!showNotifPopover);
              setHasNotif(false);
            }}
            title="Notificações da Comunidade"
            aria-label="Notificações"
          >
            <Bell size={14} />
            {hasNotif && (
              <span style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-terracotta)',
                border: '1.5px solid var(--color-surface)'
              }} />
            )}
          </button>

          {/* Quick Notification Dropdown */}
          {showNotifPopover && (
            <div style={{
              position: 'absolute',
              top: 38,
              right: 0,
              width: 250,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 12,
              boxShadow: 'var(--glass-shadow)',
              zIndex: 99,
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Check size={14} color="var(--color-success)" /> Culto de Domingo às 09h
              </div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                Microsérie <strong>Descobrindo a Simples: Inside Outside</strong> na Rua Miradouro, 319. Traga sua família!
              </p>
            </div>
          )}
        </div>

        {/* Member / Pastor Avatar Circle matching reference image */}
        <button
          onClick={onOpenAdmin}
          title="Perfil / Painel Pastoral (Admin)"
          aria-label="Painel Pastoral"
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid rgba(97, 103, 79, 0.4)',
            cursor: 'pointer',
            padding: 0,
            background: 'var(--color-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Foto do Membro"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </button>
      </div>
    </header>
  );
}
