import React, { useState } from 'react';
import { 
  Heart, Copy, Check, Plus, Send, MapPin, Clock
} from 'lucide-react';
import { CHURCH_INFO, CHURCH_BOOKS, INITIAL_PRAYERS } from '../data/mockData';

export default function MoreView({ onOpenAdmin }) {
  const [activeSubSection, setActiveSubSection] = useState('prayers'); // prayers | pix | library | contact
  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('simples_prayers');
    return saved ? JSON.parse(saved) : INITIAL_PRAYERS;
  });
  const [prayedSet, setPrayedSet] = useState(() => {
    const saved = localStorage.getItem('simples_prayed_set');
    return saved ? JSON.parse(saved) : [];
  });
  const [newAuthor, setNewAuthor] = useState('');
  const [newRequest, setNewRequest] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  // Visitor form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorType, setVisitorType] = useState('Visitante');
  const [visitorSubmitted, setVisitorSubmitted] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(CHURCH_INFO.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleTogglePrayed = (id) => {
    if (prayedSet.includes(id)) return;
    const updated = prayers.map(p => p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p);
    const newSet = [...prayedSet, id];
    setPrayers(updated);
    setPrayedSet(newSet);
    localStorage.setItem('simples_prayers', JSON.stringify(updated));
    localStorage.setItem('simples_prayed_set', JSON.stringify(newSet));
  };

  const handleSubmitPrayer = (e) => {
    e.preventDefault();
    if (!newRequest.trim()) return;

    const newEntry = {
      id: `prayer-${Date.now()}`,
      author: isAnonymous ? 'Irmão(ã) Anônimo' : (newAuthor.trim() || 'Membro da Comunidade'),
      request: newRequest.trim(),
      date: 'Agora mesmo',
      prayerCount: 1,
      isPrivate: false
    };

    const updated = [newEntry, ...prayers];
    setPrayers(updated);
    localStorage.setItem('simples_prayers', JSON.stringify(updated));
    setNewAuthor('');
    setNewRequest('');
    setShowPrayerForm(false);
  };

  const handleSubmitVisitor = (e) => {
    e.preventDefault();
    if (!visitorName.trim()) return;
    const message = encodeURIComponent(
      `Olá! Meu nome é *${visitorName}* (${visitorPhone}). Gostaria de me conectar à Igreja Cristã Simples como *${visitorType}*.`
    );
    window.open(`https://wa.me/${CHURCH_INFO.whatsappNumber}?text=${message}`, '_blank');
    setVisitorSubmitted(true);
  };

  const serviceCards = [
    {
      id: 'prayers',
      title: 'Mural de Oração',
      subtitle: `${prayers.length} pedidos`,
      gradient: 'linear-gradient(135deg, #c76f61, #7f2e24)',
      image: '/sala-de-oracao.jpg'
    },
    {
      id: 'pix',
      title: 'Dízimos & PIX',
      subtitle: 'Generosidade',
      gradient: 'linear-gradient(135deg, #37634d, #1a3828)',
      image: 'https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-36.jpg'
    },
    {
      id: 'library',
      title: 'Biblioteca Simples',
      subtitle: `${CHURCH_BOOKS.length} livros`,
      gradient: 'linear-gradient(135deg, #374e76, #1a2944)',
      image: 'https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_1.png'
    },
    {
      id: 'contact',
      title: 'Ficha & Informações',
      subtitle: 'Visitantes & Info',
      gradient: 'linear-gradient(135deg, #b8782e, #693f10)',
      image: 'https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Foto-Site-1.jpg'
    }
  ];

  return (
    <div className="more-view animate-fade-in">
      <div className="section-title-wrap">
        <div>
          <h2 className="section-title">Comunidade & Serviços</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Orações, generosidade com PIX, biblioteca e canais da igreja.
          </p>
        </div>
      </div>

      {/* 4 Cards Retangulares - Estilo Séries do Spotify */}
      <div className="more-services-grid">
        {serviceCards.map((item) => {
          const isActive = activeSubSection === item.id;
          return (
            <div
              key={item.id}
              className={`more-service-card ${isActive ? 'active' : ''}`}
              style={{ background: item.gradient }}
              onClick={() => setActiveSubSection(item.id)}
              role="button"
              tabIndex={0}
              aria-label={item.title}
            >
              {isActive && (
                <div className="more-service-active-badge">
                  <span className="more-service-active-dot" />
                  <span>Ativo</span>
                </div>
              )}
              <div className="more-service-name">{item.title}</div>
              <span className="more-service-subtitle">{item.subtitle}</span>
              <img
                src={item.image}
                alt={item.title}
                className="more-service-img"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* SECTION 1: PRAYER MURAL */}
      {activeSubSection === 'prayers' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              "Orai uns pelos outros..." — Tiago 5:16
            </span>
            <button
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              onClick={() => setShowPrayerForm(!showPrayerForm)}
            >
              <Plus size={14} />
              Pedir Oração
            </button>
          </div>

          {showPrayerForm && (
            <form onSubmit={handleSubmitPrayer} style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              marginBottom: 16
            }}>
              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 10, fontSize: '1rem', textTransform: 'uppercase' }}>
                Novo Pedido de Oração
              </h4>

              <div className="form-group">
                <label className="form-label">Seu Nome (opcional):</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Maria Alice"
                  disabled={isAnonymous}
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <input
                  type="checkbox"
                  id="anonCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonCheck" style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                  Prefiro manter anônimo
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Motivo de Oração:</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Conte-nos como a comunidade pode interceder por você..."
                  required
                  value={newRequest}
                  onChange={(e) => setNewRequest(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  onClick={() => setShowPrayerForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                  <Send size={14} />
                  Enviar Pedido
                </button>
              </div>
            </form>
          )}

          <div className="prayers-list">
            {prayers.map((p, idx) => {
              const hasPrayed = prayedSet.includes(p.id);
              const postitThemes = ['postit-yellow', 'postit-peach', 'postit-rose', 'postit-mint'];
              const colorClass = postitThemes[idx % postitThemes.length];

              return (
                <div
                  key={p.id}
                  className={`prayer-card ${colorClass}`}
                >
                  {/* Pin vermelho no canto */}
                  <div className="postit-pin" aria-hidden="true" title="Fixado com alfinete">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <ellipse cx="12" cy="21" rx="4" ry="1.5" fill="rgba(0,0,0,0.28)" />
                      <line x1="12" y1="13" x2="12" y2="20" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" />
                      <ellipse cx="12" cy="13" rx="4.5" ry="1.8" fill="#991b1b" />
                      <path d="M8.5 13 C8.5 10 10 9 10 6 L14 6 C14 9 15.5 10 15.5 13 Z" fill="#dc2626" />
                      <ellipse cx="12" cy="6" rx="4" ry="1.6" fill="#ef4444" />
                      <circle cx="12" cy="5" r="3.2" fill="#f87171" />
                      <ellipse cx="11.2" cy="4.2" rx="1.2" ry="0.8" fill="#ffffff" opacity="0.85" />
                    </svg>
                  </div>

                  <div className="prayer-header">
                    <span className="prayer-author">{p.author}</span>
                    <span className="prayer-date">{p.date}</span>
                  </div>
                  <p className="prayer-text">{p.request}</p>
                  <button
                    className={`prayer-action-btn ${hasPrayed ? 'prayed' : ''}`}
                    onClick={() => handleTogglePrayed(p.id)}
                  >
                    <Heart size={14} fill={hasPrayed ? '#ffffff' : 'none'} color={hasPrayed ? '#ffffff' : '#b91c1c'} />
                    <span>{hasPrayed ? 'Você está orando' : 'Estou orando'} ({p.prayerCount})</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: PIX & GENEROSITY */}
      {activeSubSection === 'pix' && (
        <div>
          <div className="pix-box">
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--color-terracotta)'
            }}>
              Generosidade Cristã
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, margin: '6px 0 10px' }}>
              Dízimos e Ofertas
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              A generosidade da comunidade mantém o espaço de culto, sustenta a pregação do Evangelho e socorre as famílias necessitadas.
            </p>

            <div className="pix-key-pill">
              <span>{CHURCH_INFO.pixKey}</span>
              <button
                className="btn-primary"
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                onClick={handleCopyPix}
              >
                {copiedPix ? <Check size={14} /> : <Copy size={14} />}
                {copiedPix ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-olive-200)', marginTop: 10 }}>
              <strong>Destinatário:</strong> {CHURCH_INFO.pixBank}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: CHURCH BOOKS / LIBRARY */}
      {activeSubSection === 'library' && (
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>
            "Estes são alguns dos livros que fazem parte da vida de nossa comunidade. Nossa biblioteca física está aberta para empréstimos aos domingos."
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CHURCH_BOOKS.map((b) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 12
                }}
              >
                <img
                  src={b.cover}
                  alt={b.title}
                  style={{ width: 75, height: 105, objectFit: 'contain', background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', padding: 4 }}
                />
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.2 }}>
                    {b.title}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-terracotta)', fontWeight: 600, marginBottom: 4 }}>
                    {b.author}
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: VISITOR FORM & LOCATION INFO */}
      {activeSubSection === 'contact' && (
        <div>
          {/* Visitor Form */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            marginBottom: 20
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              Ficha de Conexão
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>
              Queremos conhecer você melhor e integrá-lo(a) à família da Simples!
            </p>

            {visitorSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-success)' }}>
                <Check size={36} style={{ margin: '0 auto 8px' }} />
                <p>Obrigado! Sua mensagem foi encaminhada à liderança pastoral.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitVisitor}>
                <div className="form-group">
                  <label className="form-label">Seu Nome Completo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome e Sobrenome"
                    className="form-input"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp com DDD:</label>
                  <input
                    type="tel"
                    required
                    placeholder="(31) 99999-9999"
                    className="form-input"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tipo de Conexão:</label>
                  <select
                    className="form-select"
                    value={visitorType}
                    onChange={(e) => setVisitorType(e.target.value)}
                  >
                    <option value="Visitante">Visitante pela 1ª vez</option>
                    <option value="Frequentador">Frequentador assíduo</option>
                    <option value="Desejo ser Membro">Desejo me tornar membro</option>
                    <option value="Interesse em Mesa">Quero entrar em uma Mesa</option>
                  </select>
                </div>

                <button type="submit" className="btn-whatsapp" style={{ width: '100%', marginTop: 8 }}>
                  <Send size={16} />
                  Enviar Conexão para o WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* Location & Times Info */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            marginBottom: 20
          }}>
            <h4 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>
              Endereço & Reuniões
            </h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <MapPin size={18} color="var(--color-terracotta)" style={{ flexShrink: 0 }} />
                <span>{CHURCH_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Clock size={18} color="var(--color-olive-300)" style={{ flexShrink: 0 }} />
                <span>{CHURCH_INFO.sundayService}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <a href={CHURCH_INFO.instagramUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-terracotta)', fontWeight: 600 }}>
                  {CHURCH_INFO.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
