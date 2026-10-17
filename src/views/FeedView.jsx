import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageCircle, Send, Share2, Bookmark, 
  Plus, Image, Video, Type, X, Check, Sparkles, Camera, 
  Upload, LogIn, LogOut, Trash2, Lock, Users, Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_FEED_POSTS, FEED_STORIES } from '../data/mockData';
import { compressImage } from '../utils/imageUtils';
import { safeSetLocalStorage, safeGetLocalStorage } from '../utils/storageUtils';
import { isYouTubeUrl, formatVideoEmbedUrl, getYouTubeThumbnailUrl } from '../utils/videoUtils';
import { splitTextIntoSlides } from '../utils/textUtils';
import { FeedImageCarousel, FeedTextCarousel } from '../components/FeedCarousels';

export default function FeedView() {
  const { currentUser, openAuthModal, logout, updateCurrentUserAvatar } = useAuth();
  const [posts, setPosts] = useState(() => {
    const CLEAN_KEY = 'simples_feed_cleaned_zero_v1';
    if (!localStorage.getItem(CLEAN_KEY)) {
      localStorage.removeItem('simples_feed_posts');
      localStorage.removeItem('simples_feed_stories');
      localStorage.setItem(CLEAN_KEY, 'true');
      return [];
    }
    return safeGetLocalStorage('simples_feed_posts', []);
  });

  const [stories, setStories] = useState(() => {
    return safeGetLocalStorage('simples_feed_stories', []);
  });

  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeStory, setActiveStory] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // Comments drawer state
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  // Quick inline comments state for cards
  const [quickComments, setQuickComments] = useState({});

  // New Post modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [postType, setPostType] = useState('image'); // 'image' | 'video' | 'text'
  const [postAuthor, setPostAuthor] = useState('');
  const [postCategory, setPostCategory] = useState('Culto de Domingo');
  const [postCaption, setPostCaption] = useState('');
  const [postMediaUrl, setPostMediaUrl] = useState('');
  const [postImages, setPostImages] = useState([]); // Array de fotos para o carrossel
  const [activePreviewSlide, setActivePreviewSlide] = useState(0);
  const [postTextBg, setPostTextBg] = useState('linear-gradient(135deg, #1d2219 0%, #31392b 100%)');
  const [postSuccessToast, setPostSuccessToast] = useState(false);
  const [avatarToast, setAvatarToast] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [postAsStory, setPostAsStory] = useState(true);

  // Heart double-tap animation state per post
  const [heartAnimPostId, setHeartAnimPostId] = useState(null);
  const lastTapRef = useRef({});

  // Sync post author when current user is logged in
  useEffect(() => {
    if (currentUser) {
      setPostAuthor(currentUser.name);
    }
  }, [currentUser]);

  // Open Create Post dialog - verifies login first
  const handleOpenCreatePost = () => {
    if (!currentUser) {
      openAuthModal('Crie sua conta ou faça login para compartilhar momentos no mural!', () => {
        setIsCreateOpen(true);
      });
      return;
    }
    setIsCreateOpen(true);
  };

  // Delete own post
  const handleDeletePost = (postId) => {
    if (window.confirm('Tem certeza que deseja apagar sua publicação do feed?')) {
      const updated = posts.filter((p) => p.id !== postId);
      setPosts(updated);
      safeSetLocalStorage('simples_feed_posts', updated);
    }
  };

  // Save posts to localStorage safely
  useEffect(() => {
    safeSetLocalStorage('simples_feed_posts', posts);
  }, [posts]);

  // Save stories to localStorage safely
  useEffect(() => {
    safeSetLocalStorage('simples_feed_stories', stories);
  }, [stories]);

  // Story progress timer
  useEffect(() => {
    if (!activeStory) return;
    setStoryProgress(0);
    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveStory(null);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [activeStory]);

  // Toggle Like on a post
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const wasLiked = p.isLiked;
          return {
            ...p,
            isLiked: !wasLiked,
            likesCount: wasLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1
          };
        }
        return p;
      })
    );
  };

  // Double tap to like (Instagram style)
  const handleDoubleTap = (postId) => {
    const now = Date.now();
    const lastTap = lastTapRef.current[postId] || 0;
    if (now - lastTap < 300) {
      // Trigger double tap
      setHeartAnimPostId(postId);
      setTimeout(() => setHeartAnimPostId(null), 900);

      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId && !p.isLiked) {
            return {
              ...p,
              isLiked: true,
              likesCount: p.likesCount + 1
            };
          }
          return p;
        })
      );
    }
    lastTapRef.current[postId] = now;
  };

  // Add comment to a post
  const handleAddComment = (postId, text, author) => {
    if (!text || !text.trim()) return;
    const authorName = author && author.trim() ? author.trim() : 'Membro da Simples';
    const newComment = {
      id: `c-${Date.now()}`,
      author: authorName,
      text: text.trim(),
      time: 'Agora mesmo'
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );
  };

  // Update user profile photo directly from feed
  const handleUserAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 240, 240, 0.82);
        updateCurrentUserAvatar(compressed);
        setAvatarToast(true);
        setTimeout(() => setAvatarToast(false), 3000);
      } catch (err) {
        console.error('Erro ao atualizar foto de perfil:', err);
        alert('Não foi possível atualizar a foto. Tente outra imagem.');
      }
    }
  };

  // Upload múltiplo de fotos com compressão para carrossel
  const handleMultipleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (postImages.length + files.length > 10) {
      alert('Você pode adicionar no máximo 10 fotos no carrossel.');
      return;
    }

    try {
      setIsUploadingMedia(true);
      const compressedList = [];
      for (const file of files) {
        const compressed = await compressImage(file, 800, 800, 0.75);
        if (compressed) {
          compressedList.push(compressed);
        }
      }
      setPostImages((prev) => [...prev, ...compressedList]);
    } catch (err) {
      console.error('Erro ao processar fotos do carrossel:', err);
      alert('Não foi possível processar algumas imagens. Tente novamente.');
    } finally {
      setIsUploadingMedia(false);
      e.target.value = '';
    }
  };

  // Remover foto específica da lista do carrossel
  const handleRemoveImage = (indexToRemove) => {
    setPostImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit new post with validation and safe storage
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (postType === 'image' && postImages.length === 0) {
      alert('Por favor, adicione pelo menos uma foto para publicar no feed.');
      return;
    }
    if (postType === 'video' && !postMediaUrl) {
      alert('Por favor, informe o link do vídeo.');
      return;
    }
    if (postType === 'text' && (!postCaption || !postCaption.trim())) {
      alert('Por favor, escreva uma mensagem ou reflexão para publicar.');
      return;
    }

    const authorName = currentUser?.name || postAuthor.trim() || 'Membro da Simples';
    const authorAvatar = currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
    const authorRole = currentUser?.role || 'Comunidade Simples';

    const isVideoYT = postType === 'video' && isYouTubeUrl(postMediaUrl);
    const formattedMediaUrl = isVideoYT ? formatVideoEmbedUrl(postMediaUrl) : postMediaUrl;
    const videoThumb = isVideoYT ? getYouTubeThumbnailUrl(postMediaUrl) : undefined;

    // Se for texto longo, gera os slides do carrossel de texto
    const textSlides = postType === 'text' ? splitTextIntoSlides(postCaption) : [];

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: authorName,
        avatar: authorAvatar,
        role: authorRole,
        contact: currentUser?.emailOrPhone
      },
      location: 'Igreja Cristã Simples • Contagem',
      category: postCategory,
      timestamp: 'Agora mesmo',
      type: postType,
      mediaUrl: postType === 'image' ? (postImages[0] || '') : formattedMediaUrl,
      mediaUrls: postType === 'image' ? postImages : undefined,
      videoThumbnail: videoThumb,
      backgroundColor: postType === 'text' ? postTextBg : undefined,
      textContent: postType === 'text' ? postCaption : undefined,
      textSlides: textSlides,
      caption: postType === 'text' ? '' : postCaption,
      likesCount: 1,
      isLiked: true,
      comments: []
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    safeSetLocalStorage('simples_feed_posts', updated);

    // Se for post com foto e a opção de story estiver marcada, adiciona aos stories também
    if (postType === 'image' && postAsStory && postImages.length > 0) {
      const newStory = {
        id: `story-${Date.now()}`,
        author: authorName,
        avatar: authorAvatar,
        media: postImages[0],
        title: postCaption ? (postCaption.length > 20 ? postCaption.slice(0, 18) + '...' : postCaption) : 'Novo Momento',
        time: 'Agora',
        hasUnseen: true
      };
      const updatedStories = [newStory, ...stories];
      setStories(updatedStories);
      safeSetLocalStorage('simples_feed_stories', updatedStories);
    }

    setIsCreateOpen(false);
    setPostCaption('');
    setPostMediaUrl('');
    setPostImages([]);
    setActivePreviewSlide(0);
    setPostSuccessToast(true);
    setTimeout(() => setPostSuccessToast(false), 3500);
  };

  // Share post via Web Share or WhatsApp
  const handleShare = (post) => {
    const shareText = `Momento na Igreja Cristã Simples: "${post.caption || post.textContent || 'Confira no app!'}"`;
    if (navigator.share) {
      navigator.share({
        title: 'Igreja Cristã Simples',
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`;
      window.open(waUrl, '_blank');
    }
  };

  // Filter posts
  const filteredPosts = activeCategory === 'Todos'
    ? posts
    : posts.filter((p) => p.category === activeCategory || (activeCategory === 'Fotos' && p.type === 'image') || (activeCategory === 'Vídeos' && p.type === 'video'));

  const categories = ['Todos', 'Culto de Domingo', 'Mesas nos Bairros', 'Louvor & Adoração', 'Simple Kids', 'Fotos', 'Vídeos'];

  const commentingPost = posts.find((p) => p.id === commentingPostId);

  // Se o usuário não estiver logado, o feed fica bloqueado
  if (!currentUser) {
    return (
      <div className="feed-locked-container animate-fade-in">
        {/* Background Teaser with blur */}
        <div className="feed-locked-preview-backdrop" aria-hidden="true">
          <div className="feed-locked-preview-card">
            <div className="feed-locked-skeleton-header">
              <div className="feed-locked-skeleton-avatar" />
              <div className="feed-locked-skeleton-lines">
                <div className="feed-locked-skeleton-line short" />
                <div className="feed-locked-skeleton-line tiny" />
              </div>
            </div>
            <div className="feed-locked-skeleton-img" />
          </div>
          <div className="feed-locked-preview-card">
            <div className="feed-locked-skeleton-header">
              <div className="feed-locked-skeleton-avatar" />
              <div className="feed-locked-skeleton-lines">
                <div className="feed-locked-skeleton-line short" />
                <div className="feed-locked-skeleton-line tiny" />
              </div>
            </div>
          </div>
        </div>

        {/* Foreground Locked Card */}
        <div className="feed-locked-card animate-slide-up">
          <div className="feed-locked-badge">
            <Lock size={30} color="var(--color-terracotta)" />
          </div>

          <span className="feed-locked-tag">Área Restrita da Comunidade</span>
          <h2 className="feed-locked-title">Mural & Stories da Família Simples</h2>
          <p className="feed-locked-desc">
            O Mural e as publicações são um espaço de comunhão seguro e exclusivo para os membros e participantes da <strong>Igreja Cristã Simples</strong>.
          </p>

          <div className="feed-locked-benefits">
            <div className="feed-locked-benefit-item">
              <Camera size={17} className="feed-locked-benefit-icon" />
              <span>Fotos e stories dos cultos e eventos</span>
            </div>
            <div className="feed-locked-benefit-item">
              <Users size={17} className="feed-locked-benefit-icon" />
              <span>Momentos e fotos das Mesas nos Bairros</span>
            </div>
            <div className="feed-locked-benefit-item">
              <Heart size={17} className="feed-locked-benefit-icon" />
              <span>Testemunhos, orações e comunhão mútua</span>
            </div>
          </div>

          <div className="feed-locked-actions">
            <button 
              className="feed-locked-primary-btn"
              onClick={() => openAuthModal('Faça login ou crie sua conta para liberar o Mural da Simples!')}
            >
              <LogIn size={18} />
              <span>Fazer Login ou Criar Conta</span>
            </button>
            <p className="feed-locked-note">
              Acesso exclusivo e gratuito para toda a igreja.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-view-container animate-fade-in">
      {/* 1. TOP STORIES BAR (INSTAGRAM STORIES STYLE) */}
      <div className="feed-stories-wrapper">
        <div className="feed-stories-scroll">
          {/* Add Story Button */}
          <div className="feed-story-item add-story" onClick={handleOpenCreatePost} role="button" tabIndex={0}>
            <div className="feed-story-avatar-wrap add">
              <div className="feed-story-add-badge">
                <Plus size={14} color="#ffffff" />
              </div>
              <Camera size={20} color="var(--color-olive-300)" />
            </div>
            <span className="feed-story-name">Novo Post</span>
          </div>

          {/* Stories from Community */}
          {stories.map((story) => (
            <div
              key={story.id}
              className={`feed-story-item ${story.hasUnseen ? 'unseen' : ''}`}
              onClick={() => setActiveStory(story)}
              role="button"
              tabIndex={0}
            >
              <div className="feed-story-ring">
                <img src={story.avatar} alt={story.author} className="feed-story-avatar" />
              </div>
              <span className="feed-story-name">{story.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* USER STATUS / LOGIN BAR */}
      <div className="feed-user-bar">
        <div className="feed-user-bar-logged">
          <div className="feed-user-profile-info">
            <div className="feed-user-avatar-wrap" title="Clique para trocar sua foto de perfil">
              <img src={currentUser.avatar} alt={currentUser.name} className="feed-user-avatar-img" />
              <label 
                className="feed-user-avatar-edit-overlay" 
                title="Trocar minha foto de perfil"
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleUserAvatarChange} 
                  style={{ display: 'none' }} 
                />
                <Camera size={12} color="#ffffff" />
              </label>
            </div>
            <div className="feed-user-details">
              <span className="feed-user-greeting">Conectado como</span>
              <span className="feed-user-name">{currentUser.name}</span>
              <span className="feed-user-badge-role">{currentUser.role}</span>
            </div>
          </div>
          <div className="feed-user-actions">
            <label className="feed-user-change-photo-btn" title="Alterar foto de perfil">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUserAvatarChange} 
                style={{ display: 'none' }} 
              />
              <Camera size={13} />
              <span>Trocar foto</span>
            </label>
            <button 
              className="feed-user-logout-btn" 
              onClick={logout}
              title="Sair desta conta"
            >
              <LogOut size={13} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Photo Updated Toast */}
      {avatarToast && (
        <div className="feed-success-toast animate-slide-up" style={{ borderColor: 'var(--color-terracotta)' }}>
          <Check size={16} color="var(--color-terracotta)" />
          <span>Sua foto de perfil foi atualizada e salva com sucesso!</span>
        </div>
      )}

      {/* 2. FEED HEADER & NEW MOMENT CTA */}
      <div className="feed-header-bar">
        <div>
          <h2 className="feed-title">Mural da Comunidade</h2>
          <p className="feed-subtitle">Momentos do culto e da semana em família</p>
        </div>

        <button 
          className="feed-create-post-btn"
          onClick={handleOpenCreatePost}
          title="Compartilhar imagem, vídeo ou texto"
        >
          <Plus size={16} />
          <span>Publicar</span>
        </button>
      </div>

      {/* Success Toast */}
      {postSuccessToast && (
        <div className="feed-success-toast animate-slide-up">
          <Check size={16} color="var(--color-success)" />
          <span>Seu momento foi publicado no feed com sucesso!</span>
        </div>
      )}

      {/* 3. CATEGORY PILLS BAR */}
      <div className="feed-categories-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`feed-category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. POSTS FEED LIST */}
      <div className="feed-posts-list">
        {filteredPosts.length === 0 ? (
          <div className="feed-empty-state">
            <Camera size={38} color="var(--color-olive-400)" />
            <h4>{posts.length === 0 ? 'Mural limpo e pronto para suas fotos!' : 'Nenhum post nesta categoria'}</h4>
            <p>{posts.length === 0 ? 'Você já pode começar a publicar os momentos da família e da igreja.' : 'Seja o primeiro a compartilhar nesta categoria!'}</p>
            <button className="feed-empty-btn" onClick={handleOpenCreatePost}>
              Criar Primeira Publicação
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const hasHeartAnim = heartAnimPostId === post.id;
            return (
              <article key={post.id} className="feed-post-card">
                {/* POST HEADER */}
                <div className="feed-post-header">
                  <div className="feed-post-author-info">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="feed-post-author-avatar"
                    />
                    <div className="feed-post-author-meta">
                      <div className="feed-post-author-name-row">
                        <span className="feed-post-author-name">{post.author.name}</span>
                        {post.category && (
                          <span className="feed-post-category-tag">{post.category}</span>
                        )}
                      </div>
                      <div className="feed-post-location-row">
                        <span className="feed-post-timestamp">{post.timestamp}</span>
                        {post.location && (
                          <>
                            <span className="feed-post-dot">•</span>
                            <span className="feed-post-location">{post.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {currentUser && (post.author?.name === currentUser.name || post.author?.contact === currentUser.emailOrPhone) && (
                      <button 
                        className="feed-post-more-btn"
                        onClick={() => handleDeletePost(post.id)}
                        title="Excluir minha publicação"
                        aria-label="Excluir post"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    <button 
                      className="feed-post-more-btn"
                      onClick={() => handleShare(post)}
                      title="Compartilhar"
                      aria-label="Opções"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>

                {/* POST MEDIA / CONTENT */}
                <div 
                  className="feed-post-media-container"
                  onDoubleClick={() => handleDoubleTap(post.id)}
                >
                  {/* Floating heart on double tap */}
                  {hasHeartAnim && (
                    <div className="feed-double-tap-heart animate-heart-burst">
                      <Heart size={80} fill="#ffffff" color="#ffffff" />
                    </div>
                  )}

                  {post.type === 'image' && (
                    <FeedImageCarousel
                      images={post.mediaUrls && post.mediaUrls.length > 0 ? post.mediaUrls : [post.mediaUrl]}
                      alt={post.caption || 'Foto da Comunidade'}
                      onDoubleTap={() => handleDoubleTap(post.id)}
                    />
                  )}

                  {post.type === 'video' && (
                    <div className="feed-post-video-wrapper">
                      {isYouTubeUrl(post.mediaUrl) || post.mediaUrl.includes('youtube.com') || post.mediaUrl.includes('youtu.be') ? (
                        <iframe
                          src={formatVideoEmbedUrl(post.mediaUrl)}
                          title={post.caption || "Vídeo da Comunidade"}
                          className="feed-post-iframe"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <video 
                          src={post.mediaUrl} 
                          controls 
                          className="feed-post-video-player"
                          poster={post.videoThumbnail}
                        />
                      )}
                    </div>
                  )}

                  {post.type === 'text' && (
                    <FeedTextCarousel
                      textContent={post.textContent}
                      textSlides={post.textSlides}
                      authorName={post.author.name}
                      backgroundColor={post.backgroundColor}
                      onDoubleTap={() => handleDoubleTap(post.id)}
                    />
                  )}
                </div>

                {/* POST ACTIONS BAR */}
                <div className="feed-post-actions-bar">
                  <div className="feed-post-actions-left">
                    {/* Like Button */}
                    <button
                      className={`feed-action-btn like ${post.isLiked ? 'liked' : ''}`}
                      onClick={() => handleToggleLike(post.id)}
                      title={post.isLiked ? 'Descurtir' : 'Curtir'}
                      aria-label="Curtir post"
                    >
                      <Heart
                        size={22}
                        fill={post.isLiked ? 'var(--color-terracotta)' : 'none'}
                        color={post.isLiked ? 'var(--color-terracotta)' : 'var(--color-text-main)'}
                      />
                    </button>

                    {/* Comment Button */}
                    <button
                      className="feed-action-btn comment"
                      onClick={() => setCommentingPostId(post.id)}
                      title="Ver comentários"
                      aria-label="Comentários"
                    >
                      <MessageCircle size={22} />
                    </button>

                    {/* Share Button */}
                    <button
                      className="feed-action-btn share"
                      onClick={() => handleShare(post)}
                      title="Compartilhar no WhatsApp"
                      aria-label="Compartilhar"
                    >
                      <Send size={20} />
                    </button>
                  </div>

                  <button
                    className="feed-action-btn bookmark"
                    onClick={() => {
                      alert('Momento salvo na sua biblioteca espiritual!');
                    }}
                    title="Salvar publicação"
                    aria-label="Salvar"
                  >
                    <Bookmark size={20} />
                  </button>
                </div>

                {/* POST DETAILS & LIKES COUNT */}
                <div className="feed-post-details">
                  <div className="feed-post-likes-row">
                    <strong>{post.likesCount} {post.likesCount === 1 ? 'curtida' : 'curtidas'}</strong>
                    {post.isLiked && (
                      <span className="feed-post-liked-note"> • Você curtiu este momento</span>
                    )}
                  </div>

                  {/* Caption */}
                  {post.caption && (
                    <div className="feed-post-caption-box">
                      <span className="feed-post-caption-author">{post.author.name}</span>{' '}
                      <span className="feed-post-caption-text">{post.caption}</span>
                    </div>
                  )}

                  {/* Comments count link */}
                  {post.comments && post.comments.length > 0 ? (
                    <button
                      className="feed-view-comments-btn"
                      onClick={() => setCommentingPostId(post.id)}
                    >
                      Ver todos os {post.comments.length} comentários
                    </button>
                  ) : (
                    <button
                      className="feed-view-comments-btn"
                      onClick={() => setCommentingPostId(post.id)}
                    >
                      Seja o primeiro a comentar...
                    </button>
                  )}

                  {/* Latest Comment Preview */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="feed-latest-comment">
                      <span className="feed-comment-author">
                        {post.comments[post.comments.length - 1].author}
                      </span>{' '}
                      <span className="feed-comment-text">
                        {post.comments[post.comments.length - 1].text}
                      </span>
                    </div>
                  )}

                  {/* Quick Inline Comment Input */}
                  <form
                    className="feed-quick-comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const val = quickComments[post.id];
                      if (val && val.trim()) {
                        if (!currentUser) {
                          openAuthModal('Crie uma conta ou faça login para publicar comentários!', (user) => {
                            handleAddComment(post.id, val, user.name);
                            setQuickComments((prev) => ({ ...prev, [post.id]: '' }));
                          });
                          return;
                        }
                        handleAddComment(post.id, val, currentUser.name);
                        setQuickComments((prev) => ({ ...prev, [post.id]: '' }));
                      }
                    }}
                  >
                    <input
                      type="text"
                      placeholder={currentUser ? "Adicione um comentário..." : "Faça login para comentar..."}
                      className="feed-quick-comment-input"
                      value={quickComments[post.id] || ''}
                      onChange={(e) =>
                        setQuickComments({ ...quickComments, [post.id]: e.target.value })
                      }
                    />
                    {quickComments[post.id] && (
                      <button type="submit" className="feed-quick-comment-submit">
                        Publicar
                      </button>
                    )}
                  </form>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* 5. MODAL: CRIAR NOVO POST / COMPARTILHAR MOMENTO */}
      {isCreateOpen && (
        <div className="modal-backdrop" onClick={() => setIsCreateOpen(false)}>
          <div
            className="feed-create-modal animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="feed-modal-header">
              <h3>Compartilhar com a Comunidade</h3>
              <button
                className="feed-modal-close-btn"
                onClick={() => setIsCreateOpen(false)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Post Type Selector Tabs */}
            <div className="feed-type-selector">
              <button
                className={`feed-type-tab ${postType === 'image' ? 'active' : ''}`}
                onClick={() => setPostType('image')}
              >
                <Image size={16} />
                <span>Foto</span>
              </button>
              <button
                className={`feed-type-tab ${postType === 'video' ? 'active' : ''}`}
                onClick={() => setPostType('video')}
              >
                <Video size={16} />
                <span>Vídeo</span>
              </button>
              <button
                className={`feed-type-tab ${postType === 'text' ? 'active' : ''}`}
                onClick={() => setPostType('text')}
              >
                <Type size={16} />
                <span>Reflexão</span>
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="feed-create-form">
              {/* CURRENT USER BANNER */}
              {currentUser && (
                <div className="feed-posting-as-banner">
                  <div className="feed-posting-as-user">
                    <img src={currentUser.avatar} alt={currentUser.name} className="feed-posting-as-avatar" />
                    <div>
                      <div className="feed-posting-as-name">{currentUser.name}</div>
                      <div className="feed-posting-as-role">{currentUser.role}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-olive-300)', fontWeight: 600 }}>
                    Autor verificado
                  </span>
                </div>
              )}

              {/* AUTHOR & CATEGORY ROW */}
              <div className="feed-form-row">
                {!currentUser && (
                  <div className="feed-form-group">
                    <label>Seu Nome ou Família</label>
                    <input
                      type="text"
                      placeholder="Ex: Família Silveira, Lucas..."
                      value={postAuthor}
                      onChange={(e) => setPostAuthor(e.target.value)}
                      className="feed-input"
                    />
                  </div>
                )}
                <div className="feed-form-group" style={{ flex: currentUser ? '1' : undefined }}>
                  <label>Ministério / Categoria</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="feed-input select"
                  >
                    <option value="Culto de Domingo">Culto de Domingo</option>
                    <option value="Mesas nos Bairros">Mesas nos Bairros</option>
                    <option value="Louvor & Adoração">Louvor & Adoração</option>
                    <option value="Simple Kids">Simple Kids</option>
                    <option value="Mulher Simples">Mulher Simples</option>
                    <option value="Hermanos">Hermanos</option>
                    <option value="Dias Comuns">Dias Comuns</option>
                  </select>
                </div>
              </div>

              {/* FOTO: CARROSSEL DE FOTOS COM UPLOAD MÚLTIPLO */}
              {postType === 'image' && (
                <div className="feed-media-section">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <label className="feed-label" style={{ margin: 0 }}>Fotos do Carrossel</label>
                    <span style={{ fontSize: '0.72rem', color: postImages.length > 0 ? 'var(--color-olive-300)' : 'var(--color-text-dim)', fontWeight: 600 }}>
                      {postImages.length} de 10 fotos
                    </span>
                  </div>
                  
                  {/* File Upload Dropzone com suporte a múltiplas fotos */}
                  <label className="feed-upload-dropzone" style={{ opacity: isUploadingMedia ? 0.7 : 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleFileUpload}
                      disabled={isUploadingMedia}
                      style={{ display: 'none' }}
                    />
                    <Upload size={22} color="var(--color-olive-300)" />
                    <span className="feed-upload-text">
                      {isUploadingMedia 
                        ? 'Comprimindo e preparando fotos...' 
                        : (postImages.length > 0 ? '+ Adicionar mais fotos da galeria' : 'Selecionar fotos da galeria (1 ou mais)')}
                    </span>
                    <span className="feed-upload-hint">Formatos JPG, PNG ou câmera. Você pode escolher várias fotos de uma vez para o carrossel.</span>
                  </label>

                  {/* Faixa de Fotos Selecionadas para o Carrossel */}
                  {postImages.length > 0 && (
                    <div>
                      <div className="feed-multi-upload-header">
                        <span>Fotos no Carrossel ({postImages.length}):</span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--color-text-dim)' }}>Arraste para o lado</span>
                      </div>
                      <div className="feed-multi-upload-strip">
                        {postImages.map((imgUrl, idx) => (
                          <div key={idx} className="feed-multi-upload-thumb">
                            <img src={imgUrl} alt={`Foto ${idx + 1}`} />
                            <button
                              type="button"
                              className="feed-multi-upload-remove"
                              onClick={() => handleRemoveImage(idx)}
                              title="Remover foto"
                              aria-label={`Remover foto ${idx + 1}`}
                            >
                              <X size={12} />
                            </button>
                            <span className="feed-multi-upload-order">{idx + 1}</span>
                          </div>
                        ))}

                        {/* Botão de adicionar mais fotos ao carrossel */}
                        {postImages.length < 10 && (
                          <label className="feed-multi-upload-add-btn">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleMultipleFileUpload}
                              disabled={isUploadingMedia}
                              style={{ display: 'none' }}
                            />
                            <Plus size={18} />
                            <span>Adicionar</span>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* VÍDEO: URL OU LINKS DO CULTO */}
              {postType === 'video' && (
                <div className="feed-media-section">
                  <label className="feed-label">Link do Vídeo (YouTube)</label>
                  <input
                    type="url"
                    placeholder="Cole o link do YouTube (ex: https://youtu.be/... ou https://www.youtube.com/watch?v=...)"
                    value={postMediaUrl}
                    onChange={(e) => setPostMediaUrl(e.target.value)}
                    className="feed-input"
                    autoFocus
                  />
                  <div className="feed-video-hint">
                    Suporta links normais do YouTube, links curtos (youtu.be), Shorts e transmissões ao vivo.
                  </div>

                  {/* Pré-visualização instantânea do YouTube */}
                  {isYouTubeUrl(postMediaUrl) && (
                    <div className="feed-video-preview-box">
                      <div className="feed-video-preview-status">
                        <Check size={14} />
                        <span>Vídeo do YouTube identificado com sucesso!</span>
                      </div>
                      <div className="feed-post-video-wrapper">
                        <iframe
                          src={formatVideoEmbedUrl(postMediaUrl)}
                          title="Prévia do Vídeo"
                          className="feed-post-iframe"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TEXTO: COR DE FUNDO & MENSAGEM */}
              {postType === 'text' && (
                <div className="feed-media-section">
                  <label className="feed-label">Escolha o estilo visual da reflexão</label>
                  <div className="feed-bg-options">
                    {[
                      { label: 'Oliva Escuro', bg: 'linear-gradient(135deg, #1d2219 0%, #31392b 100%)' },
                      { label: 'Sálvia Místico', bg: 'linear-gradient(135deg, #2b3624 0%, #49543e 100%)' },
                      { label: 'Mesa da Comunhão', bg: 'linear-gradient(135deg, #252b20 0%, #161a13 100%)' }
                    ].map((item, idx) => (
                      <button
                        type="button"
                        key={idx}
                        className={`feed-bg-btn ${postTextBg === item.bg ? 'active' : ''}`}
                        style={{ background: item.bg }}
                        onClick={() => setPostTextBg(item.bg)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CAPTION / TEXT MESSAGE */}
              <div className="feed-form-group">
                <label>
                  {postType === 'text' ? 'Sua Mensagem ou Testemunho' : 'Legenda do Momento'}
                </label>
                <textarea
                  rows={postType === 'text' ? 4 : 3}
                  placeholder={
                    postType === 'text'
                      ? 'Escreva um versículo, oração ou gratidão vivida durante a semana... (textos longos viram carrossel de slides)'
                      : 'O que tornou este momento especial? Descreva para a comunidade...'
                  }
                  value={postCaption}
                  onChange={(e) => {
                    setPostCaption(e.target.value);
                    setActivePreviewSlide(0);
                  }}
                  className="feed-textarea"
                  required={postType === 'text'}
                />

                {/* Prévia interativa do carrossel quando o texto for longo */}
                {postType === 'text' && postCaption.trim().length > 0 && (() => {
                  const previewSlides = splitTextIntoSlides(postCaption);
                  if (previewSlides.length > 1) {
                    return (
                      <div className="feed-slide-preview-box">
                        <div className="feed-slide-preview-header">
                          <span>📖 Carrossel de Leitura ({previewSlides.length} slides)</span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--color-text-dim)' }}>
                            Slide {activePreviewSlide + 1} de {previewSlides.length}
                          </span>
                        </div>
                        <div className="feed-slide-preview-pills">
                          {previewSlides.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              className={`feed-slide-pill ${activePreviewSlide === idx ? 'active' : ''}`}
                              onClick={() => setActivePreviewSlide(idx)}
                            >
                              Slide {idx + 1}
                            </button>
                          ))}
                        </div>
                        <div style={{
                          fontSize: '0.78rem',
                          color: 'var(--color-text-main)',
                          marginTop: '8px',
                          padding: '8px 10px',
                          background: 'rgba(0,0,0,0.2)',
                          borderRadius: '6px',
                          fontStyle: 'italic',
                          lineHeight: '1.4'
                        }}>
                          "{previewSlides[activePreviewSlide]}"
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--color-olive-300)', marginTop: '6px' }}>
                          ✨ O texto foi dividido em carrossel deslizante. Pule linhas ou use '---' para escolher onde quebra cada slide.
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      💡 Textos mais longos viram um carrossel de leitura automaticamente no feed.
                    </div>
                  );
                })()}
              </div>

              {/* Opção de destacar também nos stories */}
              {postType === 'image' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--color-text-main)', margin: '12px 0 16px 0', userSelect: 'none' }}>
                  <input 
                    type="checkbox" 
                    checked={postAsStory} 
                    onChange={(e) => setPostAsStory(e.target.checked)} 
                    style={{ accentColor: 'var(--color-terracotta)', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>Destacar também nos Stories do topo</span>
                </label>
              )}

              {/* SUBMIT BUTTON */}
              <button type="submit" className="feed-submit-btn">
                <Check size={18} />
                <span>Publicar Momento no Feed</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. GAVETA DE COMENTÁRIOS INTERATIVA */}
      {commentingPost && (
        <div className="modal-backdrop" onClick={() => setCommentingPostId(null)}>
          <div
            className="feed-comments-drawer animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="feed-comments-header">
              <div className="feed-comments-title">
                <MessageCircle size={18} color="var(--color-olive-300)" />
                <h4>Comentários da Comunidade ({commentingPost.comments?.length || 0})</h4>
              </div>
              <button
                className="feed-modal-close-btn"
                onClick={() => setCommentingPostId(null)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Comments List */}
            <div className="feed-comments-body">
              {(!commentingPost.comments || commentingPost.comments.length === 0) ? (
                <div className="feed-no-comments">
                  <p>Ainda não há comentários aqui.</p>
                  <span>Compartilhe uma palavra de edificação ou amém!</span>
                </div>
              ) : (
                commentingPost.comments.map((comment) => (
                  <div key={comment.id} className="feed-comment-bubble">
                    <div className="feed-comment-bubble-header">
                      <span className="feed-comment-bubble-author">{comment.author}</span>
                      <span className="feed-comment-bubble-time">{comment.time}</span>
                    </div>
                    <p className="feed-comment-bubble-text">{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            {currentUser ? (
              <form
                className="feed-comment-drawer-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (commentInput.trim()) {
                    handleAddComment(commentingPost.id, commentInput, currentUser.name);
                    setCommentInput('');
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    Comentando como <strong>{currentUser.name}</strong>
                  </span>
                </div>
                <div className="feed-comment-input-row">
                  <input
                    type="text"
                    placeholder="Escreva seu comentário..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="feed-comment-drawer-input"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className="feed-comment-drawer-submit"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ padding: '16px', background: 'rgba(184, 91, 53, 0.08)', borderRadius: '12px', textAlign: 'center', margin: '12px 16px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.84rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                  Faça login para deixar sua mensagem
                </p>
                <button 
                  type="button"
                  className="feed-guest-login-btn"
                  style={{ margin: '0 auto' }}
                  onClick={() => openAuthModal('Faça login para comentar nesta publicação!')}
                >
                  <LogIn size={15} />
                  <span>Entrar ou Criar Conta</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. VISUALIZADOR DE STORY (INSTAGRAM STYLE FULLSCREEN) */}
      {activeStory && (
        <div className="feed-story-modal" onClick={() => setActiveStory(null)}>
          <div className="feed-story-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Story Progress Bar */}
            <div className="feed-story-progress-bar-bg">
              <div
                className="feed-story-progress-bar-fill"
                style={{ width: `${storyProgress}%` }}
              />
            </div>

            {/* Story Header */}
            <div className="feed-story-header">
              <div className="feed-story-header-author">
                <img src={activeStory.avatar} alt={activeStory.author} />
                <div>
                  <strong>{activeStory.author}</strong>
                  <span>{activeStory.time}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {currentUser && (activeStory.author === currentUser.name || activeStory.author === 'Você') && (
                  <button
                    className="feed-story-close-btn"
                    onClick={() => {
                      if (window.confirm('Deseja excluir este story?')) {
                        const updated = stories.filter(s => s.id !== activeStory.id);
                        setStories(updated);
                        safeSetLocalStorage('simples_feed_stories', updated);
                        setActiveStory(null);
                      }
                    }}
                    title="Excluir meu story"
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button
                  className="feed-story-close-btn"
                  onClick={() => setActiveStory(null)}
                  aria-label="Fechar story"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Story Media */}
            <img src={activeStory.media} alt={activeStory.title} className="feed-story-media" />

            {/* Story Footer */}
            <div className="feed-story-footer">
              <h3>{activeStory.title}</h3>
              <p>Momento compartilhado com a família Igreja Cristã Simples.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
