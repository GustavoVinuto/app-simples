import React, { useState } from 'react';
import { 
  X, User, Lock, Phone, Upload, Check, AlertCircle, 
  LogIn, UserPlus, Eye, EyeOff, Sparkles, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_AVATARS } from '../data/avatars';
import { compressImage } from '../utils/imageUtils';

export default function AuthModal() {
  const { 
    isAuthModalOpen, closeAuthModal, authPrompt, 
    signup, login, registeredUsers, quickLoginAs 
  } = useAuth();

  const [activeTab, setActiveTab] = useState('signup'); // 'signup' | 'login'
  
  // Signup state
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0].url);
  const [role, setRole] = useState('Membro da Simples');
  const [isCompressingAvatar, setIsCompressingAvatar] = useState(false);

  // Login state
  const [loginContact, setLoginContact] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleCustomAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsCompressingAvatar(true);
        const compressed = await compressImage(file, 240, 240, 0.82);
        setSelectedAvatar(compressed);
      } catch (err) {
        console.error('Erro ao comprimir avatar:', err);
        setErrorMsg('Não foi possível carregar a imagem. Tente outra foto.');
      } finally {
        setIsCompressingAvatar(false);
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }
    if (!emailOrPhone.trim()) {
      setErrorMsg('Informe seu WhatsApp ou E-mail.');
      return;
    }
    if (!password || password.length < 3) {
      setErrorMsg('Crie uma senha de no mínimo 3 dígitos.');
      return;
    }

    const res = signup({
      name,
      emailOrPhone,
      password,
      avatar: selectedAvatar,
      role
    });

    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginContact.trim() || !loginPassword) {
      setErrorMsg('Preencha seu contato e senha.');
      return;
    }

    const res = login(loginContact, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div 
        className="auth-modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="auth-modal-header">
          <div className="auth-modal-title-row">
            <div className="auth-modal-icon-badge">
              <Shield size={18} color="var(--color-terracotta)" />
            </div>
            <div>
              <h3 className="auth-modal-title">Acesso à Comunidade</h3>
              <p className="auth-modal-subtitle">
                {authPrompt || 'Faça login ou crie sua conta para participar do feed'}
              </p>
            </div>
          </div>
          <button 
            className="auth-modal-close-btn"
            onClick={closeAuthModal}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="auth-tabs-row">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
          >
            <UserPlus size={16} />
            <span>Criar Conta</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
          >
            <LogIn size={16} />
            <span>Já tenho conta</span>
          </button>
        </div>

        {errorMsg && (
          <div className="auth-error-banner animate-fade-in">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: CRIAR CONTA */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="auth-form animate-fade-in">
            {/* Escolha do Avatar */}
            <div className="auth-avatar-selection-box">
              <label className="auth-field-label">Escolha sua foto de perfil:</label>
              
              <div className="auth-avatar-row">
                <div className="auth-avatar-preview-wrap">
                  <img 
                    src={selectedAvatar} 
                    alt="Preview do Avatar" 
                    className="auth-avatar-current" 
                  />
                  <div className="auth-avatar-badge-active">
                    <Check size={12} color="#fff" />
                  </div>
                </div>

                <div className="auth-preset-avatars-grid">
                  {DEFAULT_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      className={`auth-preset-avatar-btn ${selectedAvatar === av.url ? 'active' : ''}`}
                      onClick={() => setSelectedAvatar(av.url)}
                      title={av.label}
                    >
                      <img src={av.url} alt={av.label} />
                    </button>
                  ))}

                  {/* Upload botão personalizado */}
                  <label className="auth-upload-avatar-btn" title="Enviar minha foto" style={{ opacity: isCompressingAvatar ? 0.7 : 1 }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleCustomAvatar} 
                      disabled={isCompressingAvatar}
                      style={{ display: 'none' }} 
                    />
                    <Upload size={14} />
                    <span>{isCompressingAvatar ? 'Processando...' : 'Upload'}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Nome */}
            <div className="form-group">
              <label className="auth-field-label">Seu Nome Completo:</label>
              <div className="auth-input-wrap">
                <User size={16} className="auth-input-icon" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Clara Santos"
                  className="form-input auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* WhatsApp ou E-mail */}
            <div className="form-group">
              <label className="auth-field-label">WhatsApp ou E-mail:</label>
              <div className="auth-input-wrap">
                <Phone size={16} className="auth-input-icon" />
                <input
                  type="text"
                  required
                  placeholder="(31) 99999-9999 ou email@exemplo.com"
                  className="form-input auth-input"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Senha */}
            <div className="form-group">
              <label className="auth-field-label">Crie uma Senha:</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Mínimo 3 dígitos"
                  className="form-input auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Papel na comunidade */}
            <div className="form-group">
              <label className="auth-field-label">Você é:</label>
              <select
                className="form-select auth-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Membro da Simples">Membro da Simples</option>
                <option value="Frequentador">Frequentador</option>
                <option value="Visitante">Visitante</option>
                <option value="Liderança de Mesa">Liderança de Mesa</option>
              </select>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              <Sparkles size={16} />
              Criar Conta e Publicar
            </button>
          </form>
        )}

        {/* TAB 2: JÁ TENHO CONTA (LOGIN) */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form animate-fade-in">
            {/* Contas salvas no aparelho para login com 1 toque */}
            {registeredUsers.length > 0 && (
              <div className="auth-quick-login-section">
                <label className="auth-field-label">Entrar com conta deste aparelho:</label>
                <div className="auth-quick-accounts-list">
                  {registeredUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      className="auth-quick-account-card"
                      onClick={() => quickLoginAs(user)}
                    >
                      <img src={user.avatar} alt={user.name} className="auth-quick-account-avatar" />
                      <div className="auth-quick-account-info">
                        <strong>{user.name}</strong>
                        <span>{user.role}</span>
                      </div>
                      <LogIn size={15} color="var(--color-terracotta)" />
                    </button>
                  ))}
                </div>
                <div className="auth-divider">
                  <span>ou entre com seus dados</span>
                </div>
              </div>
            )}

            {/* Contato de Login */}
            <div className="form-group">
              <label className="auth-field-label">WhatsApp ou E-mail cadastrado:</label>
              <div className="auth-input-wrap">
                <Phone size={16} className="auth-input-icon" />
                <input
                  type="text"
                  required
                  placeholder="(31) 99999-9999 ou seu e-mail"
                  className="form-input auth-input"
                  value={loginContact}
                  onChange={(e) => setLoginContact(e.target.value)}
                />
              </div>
            </div>

            {/* Senha de Login */}
            <div className="form-group">
              <label className="auth-field-label">Sua Senha:</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Digite sua senha"
                  className="form-input auth-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              <LogIn size={16} />
              Entrar na Minha Conta
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
