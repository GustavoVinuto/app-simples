import React, { useState } from 'react';
import { X, Plus, ShieldCheck, Check, RotateCcw, Mic, Newspaper } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { INITIAL_SERMONS, INITIAL_BULLETINS } from '../data/mockData';

export default function AdminModal({ isOpen, onClose, bulletins, setBulletins }) {
  const { addNewSermon, setSermons } = useAudio();
  const [activeTab, setActiveTab] = useState('newSermon'); // newSermon | newBulletin | settings
  const [successMsg, setSuccessMsg] = useState('');

  // New Sermon Form
  const [sermonTitle, setSermonTitle] = useState('');
  const [sermonSeries, setSermonSeries] = useState('À Volta da Mesa');
  const [sermonSpeaker, setSermonSpeaker] = useState('Pr. Marcos Vinícius');
  const [sermonPassage, setSermonPassage] = useState('');
  const [sermonAudioUrl, setSermonAudioUrl] = useState('');
  const [sermonSummary, setSermonSummary] = useState('');
  const [sermonOutline, setSermonOutline] = useState('');
  const [sermonQuestions, setSermonQuestions] = useState('');

  // New Bulletin Form
  const [bulletinTitle, setBulletinTitle] = useState('');
  const [bulletinCategory, setBulletinCategory] = useState('Geral');
  const [bulletinSummary, setBulletinSummary] = useState('');
  const [bulletinContent, setBulletinContent] = useState('');
  const [bulletinImage, setBulletinImage] = useState('https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-3.jpg');

  if (!isOpen) return null;

  const handleCreateSermon = (e) => {
    e.preventDefault();
    if (!sermonTitle.trim()) return;

    const newSermon = {
      id: `sermon-${Date.now()}`,
      title: sermonTitle.trim(),
      seriesId: `serie-${Date.now()}`,
      seriesTitle: sermonSeries,
      speaker: sermonSpeaker.trim(),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      duration: '40 min',
      bibleText: sermonPassage.trim() || 'Escrituras Sagradas',
      audioUrl: sermonAudioUrl.trim() || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      spotifyUrl: 'https://open.spotify.com/search/igreja%20crista%20simples',
      cover: 'https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg',
      isFeatured: true,
      summary: sermonSummary.trim() || 'Mensagem bíblica ministrada no culto da Igreja Cristã Simples.',
      outline: sermonOutline ? sermonOutline.split('\n').filter(Boolean) : [
        '1. Introdução bíblica e contexto.',
        '2. O Evangelho aplicado à vida ordinária.',
        '3. Conclusão e desafio prático.'
      ],
      tableQuestions: sermonQuestions ? sermonQuestions.split('\n').filter(Boolean) : [
        'O que mais chamou sua atenção no texto bíblico lido?',
        'Como podemos aplicar esta mensagem em nossa Mesa nesta semana?'
      ]
    };

    addNewSermon(newSermon);
    setSuccessMsg('Pregação publicada com sucesso no aplicativo!');
    setTimeout(() => setSuccessMsg(''), 3000);

    setSermonTitle('');
    setSermonPassage('');
    setSermonAudioUrl('');
    setSermonSummary('');
    setSermonOutline('');
    setSermonQuestions('');
  };

  const handleCreateBulletin = (e) => {
    e.preventDefault();
    if (!bulletinTitle.trim()) return;

    const newBulletin = {
      id: `bulletin-${Date.now()}`,
      title: bulletinTitle.trim(),
      category: bulletinCategory,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      badge: 'Novo Aviso',
      image: bulletinImage,
      summary: bulletinSummary.trim(),
      content: bulletinContent.trim() || bulletinSummary.trim()
    };

    const updated = [newBulletin, ...bulletins];
    setBulletins(updated);
    localStorage.setItem('simples_bulletins', JSON.stringify(updated));

    setSuccessMsg('Informativo adicionado ao mural da comunidade!');
    setTimeout(() => setSuccessMsg(''), 3000);

    setBulletinTitle('');
    setBulletinSummary('');
    setBulletinContent('');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar todos os dados originais do aplicativo?')) {
      localStorage.removeItem('simples_sermons');
      localStorage.removeItem('simples_bulletins');
      localStorage.removeItem('simples_prayers');
      setSermons(INITIAL_SERMONS);
      setBulletins(INITIAL_BULLETINS);
      setSuccessMsg('Dados originais restaurados!');
      setTimeout(() => setSuccessMsg(''), 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Painel da Liderança"
        style={{ maxWidth: 520 }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={20} color="var(--color-terracotta)" />
            <h3 className="modal-title">Painel da Liderança</h3>
          </div>
          <button className="header-icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        {/* Subtabs */}
        <div className="player-subtabs" style={{ marginBottom: 14 }}>
          <button
            className={`player-subtab ${activeTab === 'newSermon' ? 'active' : ''}`}
            onClick={() => setActiveTab('newSermon')}
          >
            <Mic size={15} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Nova Pregação
          </button>
          <button
            className={`player-subtab ${activeTab === 'newBulletin' ? 'active' : ''}`}
            onClick={() => setActiveTab('newBulletin')}
          >
            <Newspaper size={15} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Novo Aviso
          </button>
          <button
            className={`player-subtab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <RotateCcw size={15} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Configurações
          </button>
        </div>

        {successMsg && (
          <div style={{
            background: 'rgba(103, 185, 130, 0.15)',
            border: '1px solid var(--color-success)',
            color: 'var(--color-success)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Check size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: NEW SERMON */}
        {activeTab === 'newSermon' && (
          <form onSubmit={handleCreateSermon}>
            <div className="form-group">
              <label className="form-label">Título da Mensagem *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="Ex: Sentados à Mesa do Mestre"
                value={sermonTitle}
                onChange={(e) => setSermonTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="form-group">
                <label className="form-label">Série</label>
                <select
                  className="form-select"
                  value={sermonSeries}
                  onChange={(e) => setSermonSeries(e.target.value)}
                >
                  <option value="À Volta da Mesa">À Volta da Mesa</option>
                  <option value="A Liturgia dos Dias Comuns">A Liturgia dos Dias Comuns</option>
                  <option value="Igreja Missional: Pontes e Estradas">Igreja Missional</option>
                  <option value="Atos 2 no Século XXI">Atos 2 no Século XXI</option>
                  <option value="Mensagem Avulsa">Mensagem Avulsa</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Pregador</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Pr. Marcos Vinícius"
                  value={sermonSpeaker}
                  onChange={(e) => setSermonSpeaker(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Texto Bíblico Base</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: João 13:1-17 & Filipenses 2"
                value={sermonPassage}
                onChange={(e) => setSermonPassage(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Link do Áudio (MP3 / Podcast)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://.../audio.mp3 (ou deixe vazio para teste)"
                value={sermonAudioUrl}
                onChange={(e) => setSermonAudioUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Resumo da Pregação</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Breve resumo da mensagem para os membros..."
                value={sermonSummary}
                onChange={(e) => setSermonSummary(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pontos do Esboço (1 por linha):</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="1. Primeiro ponto&#10;2. Segundo ponto&#10;3. Terceiro ponto"
                value={sermonOutline}
                onChange={(e) => setSermonOutline(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Perguntas para a Mesa (1 por linha):</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Pergunta para reflexão nos pequenos grupos..."
                value={sermonQuestions}
                onChange={(e) => setSermonQuestions(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              <Plus size={16} />
              Publicar Pregação no App
            </button>
          </form>
        )}

        {/* TAB 2: NEW BULLETIN */}
        {activeTab === 'newBulletin' && (
          <form onSubmit={handleCreateBulletin}>
            <div className="form-group">
              <label className="form-label">Título do Informativo *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="Ex: Liturgia do Domingo / Encontro de Casais"
                value={bulletinTitle}
                onChange={(e) => setBulletinTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="form-group">
                <label className="form-label">Categoria</label>
                <select
                  className="form-select"
                  value={bulletinCategory}
                  onChange={(e) => setBulletinCategory(e.target.value)}
                >
                  <option value="Liturgia">Liturgia</option>
                  <option value="Geral">Geral</option>
                  <option value="Mesas">Mesas</option>
                  <option value="Kids">Kids</option>
                  <option value="Eventos">Eventos</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Foto de Capa</label>
                <select
                  className="form-select"
                  value={bulletinImage}
                  onChange={(e) => setBulletinImage(e.target.value)}
                >
                  <option value="https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-3.jpg">Foto Culto / Cantata</option>
                  <option value="https://igrejacristasimples.com.br/wp-content/uploads/2024/08/banner_criancas.jpg">Foto Crianças / Kids</option>
                  <option value="https://igrejacristasimples.com.br/wp-content/uploads/2024/09/bhc55444hCda0y6yVeH1.jpeg">Foto Oração / Mãos</option>
                  <option value="https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_1.png">Foto Livro / Mesas</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Resumo Chamativo (aparece no feed):</label>
              <textarea
                className="form-textarea"
                rows={2}
                required
                placeholder="Breve resumo em poucas linhas..."
                value={bulletinSummary}
                onChange={(e) => setBulletinSummary(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Conteúdo Completo:</label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Texto integral, horários, instruções, orientações..."
                value={bulletinContent}
                onChange={(e) => setBulletinContent(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              <Plus size={16} />
              Publicar Informativo no Mural
            </button>
          </form>
        )}

        {/* TAB 3: SETTINGS & RESET */}
        {activeTab === 'settings' && (
          <div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>
              As pregações, informativos e anotações são armazenados localmente e sincronizados de forma instantânea.
            </p>

            <div style={{ background: 'var(--color-surface-elevated)', padding: 14, borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
              <h5 style={{ fontWeight: 700, marginBottom: 4 }}>Restaurar Conteúdo de Demonstração</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginBottom: 10 }}>
                Voltar todas as pregações e informativos para a configuração padrão com séries pré-cadastradas.
              </p>
              <button className="btn-secondary" onClick={handleResetDefaults}>
                <RotateCcw size={14} /> Restaurar Padrões
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
