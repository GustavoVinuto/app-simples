import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageCircle, Send, Share2, Bookmark, MoreHorizontal, 
  Plus, Image, Video, Type, X, Check, Sparkles, Play, Camera, 
  MapPin, Clock, Upload, Smile, ChevronRight, Users, Eye
} from 'lucide-react';
import { INITIAL_FEED_POSTS, FEED_STORIES, CHURCH_INFO } from '../data/mockData';

export default function FeedView() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('simples_feed_posts');
    return saved ? JSON.parse(saved) : INITIAL_FEED_POSTS;
  });

  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem('simples_feed_stories');
    return saved ? JSON.parse(saved) : FEED_STORIES;
  });

  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeStory, setActiveStory] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // Comments drawer state
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  // Quick inline comments state for cards
  const [quickComments, setQuickComments] = useState({});

  // New Post modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [postType, setPostType] = useState('image'); // 'image' | 'video' | 'text'
  const [postAuthor, setPostAuthor] = useState('');
  const [postCategory, setPostCategory] = useState('Culto de Domingo');
  const [postCaption, setPostCaption] = useState('');
  const [postMediaUrl, setPostMediaUrl] = useState('');
  const [postTextBg, setPostTextBg] = useState('linear-gradient(135deg, #1d2219 0%, #31392b 100%)');
  const [imagePreview, setImagePreview] = useState(null);
  const [postSuccessToast, setPostSuccessToast] = useState(false);

  // Heart double-tap animation state per post
  const [heartAnimPostId, setHeartAnimPostId] = useState(null);
  const lastTapRef = useRef({});

  // Preset images from church gallery for quick sharing
  const PRESET_CHURCH_PHOTOS = [
    { label: "Culto & Louvor", url: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg" },
    { label: "Mesa da Ceia", url: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-36.jpg" },
    { label: "Comunhão", url: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Foto-Site-1.jpg" },
    { label: "Bacia & Toalha", url: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/IMG_4260-1.jpg" },
    { label: "Simple Kids", url: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/banner_criancas.jpg" },
    { label: "Mulher Simples", url: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-3.jpg" }
  ];

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem('simples_feed_posts', JSON.stringify(posts));
  }, [posts]);

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

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setImagePreview(result);
        setPostMediaUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit new post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (postType === 'image' && !postMediaUrl) return;
    if (postType === 'video' && !postMediaUrl) return;
    if (postType === 'text' && !postCaption) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: postAuthor.trim() || 'Membro da Simples',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'Comunidade Simples'
      },
      location: 'Igreja Cristã Simples • Contagem',
      category: postCategory,
      timestamp: 'Agora mesmo',
      type: postType,
      mediaUrl: postMediaUrl,
      backgroundColor: postType === 'text' ? postTextBg : undefined,
      textContent: postType === 'text' ? postCaption : undefined,
      caption: postType === 'text' ? '' : postCaption,
      likesCount: 1,
      isLiked: true,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setIsCreateOpen(false);
    setPostCaption('');
    setPostMediaUrl('');
    setImagePreview(null);
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

  return (
    <div className="feed-view-container animate-fade-in">
      {/* 1. TOP STORIES BAR (INSTAGRAM STORIES STYLE) */}
      <div className="feed-stories-wrapper">
        <div className="feed-stories-scroll">
          {/* Add Story Button */}
          <div className="feed-story-item add-story" onClick={() => setIsCreateOpen(true)} role="button" tabIndex={0}>
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

      {/* 2. FEED HEADER & NEW MOMENT CTA */}
      <div className="feed-header-bar">
        <div>
          <h2 className="feed-title">Mural da Comunidade</h2>
          <p className="feed-subtitle">Momentos do culto e da semana em família</p>
        </div>

        <button 
          className="feed-create-post-btn"
          onClick={() => setIsCreateOpen(true)}
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
            <Camera size={36} color="var(--color-olive-400)" />
            <h4>Nenhum post nesta categoria ainda</h4>
            <p>Seja o primeiro a compartilhar uma foto ou mensagem!</p>
            <button className="feed-empty-btn" onClick={() => setIsCreateOpen(true)}>
              Compartilhar Agora
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

                  <button 
                    className="feed-post-more-btn"
                    onClick={() => handleShare(post)}
                    title="Compartilhar"
                    aria-label="Opções"
                  >
                    <Share2 size={16} />
                  </button>
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
                    <img
                      src={post.mediaUrl}
                      alt={post.caption || 'Foto da Comunidade'}
                      className="feed-post-image"
                      loading="lazy"
                    />
                  )}

                  {post.type === 'video' && (
                    <div className="feed-post-video-wrapper">
                      {post.mediaUrl.includes('youtube.com') || post.mediaUrl.includes('youtu.be') ? (
                        <iframe
                          src={post.mediaUrl}
                          title="Vídeo do Culto"
                          className="feed-post-iframe"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                    <div 
                      className="feed-post-text-card"
                      style={{ background: post.backgroundColor || 'var(--color-surface-elevated)' }}
                    >
                      <Sparkles size={24} className="feed-post-text-sparkle" />
                      <p className="feed-post-text-content">
                        {post.textContent}
                      </p>
                      <span className="feed-post-text-signature">— {post.author.name}</span>
                    </div>
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
                      if (val) {
                        handleAddComment(post.id, val, 'Membro da Simples');
                        setQuickComments({ ...quickComments, [post.id]: '' });
                      }
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Adicione um comentário..."
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
            className="feed-create-modal animate-slide-up"
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
              {/* AUTHOR & CATEGORY ROW */}
              <div className="feed-form-row">
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
                <div className="feed-form-group">
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

              {/* FOTO: UPLOAD REAL OU FOTOS DA IGREJA */}
              {postType === 'image' && (
                <div className="feed-media-section">
                  <label className="feed-label">Escolha ou envie sua foto</label>
                  
                  {/* File Upload from Mobile / PC */}
                  <label className="feed-upload-dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <Upload size={22} color="var(--color-olive-300)" />
                    <span className="feed-upload-text">
                      {imagePreview ? 'Foto selecionada! Clique para trocar' : 'Tirar foto ou escolher da galeria'}
                    </span>
                    <span className="feed-upload-hint">Formatos JPG, PNG ou câmera</span>
                  </label>

                  {/* Photo Preview if loaded */}
                  {imagePreview && (
                    <div className="feed-upload-preview-wrap">
                      <img src={imagePreview} alt="Preview" className="feed-upload-preview" />
                    </div>
                  )}

                  {/* Preset Church Photos Options */}
                  <div className="feed-presets-title">Ou escolha fotos recentes da igreja:</div>
                  <div className="feed-presets-grid">
                    {PRESET_CHURCH_PHOTOS.map((preset, idx) => (
                      <div
                        key={idx}
                        className={`feed-preset-item ${postMediaUrl === preset.url ? 'selected' : ''}`}
                        onClick={() => {
                          setPostMediaUrl(preset.url);
                          setImagePreview(preset.url);
                        }}
                      >
                        <img src={preset.url} alt={preset.label} />
                        <span>{preset.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VÍDEO: URL OU LINKS DO CULTO */}
              {postType === 'video' && (
                <div className="feed-media-section">
                  <label className="feed-label">Link do Vídeo (YouTube ou MP4)</label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={postMediaUrl}
                    onChange={(e) => setPostMediaUrl(e.target.value)}
                    className="feed-input"
                  />
                  <div className="feed-video-hint">
                    Sugestão: Cole o link de um louvor, trecho do culto ou pregação.
                  </div>
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
                      ? 'Escreva um versículo, oração ou gratidão vivida durante a semana...'
                      : 'O que tornou este momento especial? Descreva para a comunidade...'
                  }
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  className="feed-textarea"
                  required={postType === 'text'}
                />
              </div>

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
            <form
              className="feed-comment-drawer-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (commentInput.trim()) {
                  handleAddComment(commentingPost.id, commentInput, commentAuthor);
                  setCommentInput('');
                }
              }}
            >
              <input
                type="text"
                placeholder="Seu nome (opcional)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="feed-comment-author-input"
              />
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
              <button
                className="feed-story-close-btn"
                onClick={() => setActiveStory(null)}
                aria-label="Fechar story"
              >
                <X size={20} />
              </button>
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
