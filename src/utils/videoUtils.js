/**
 * Utilitários para extração, validação e formatação de URLs de vídeo (YouTube, Shorts, etc.)
 */

export function getYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim();

  // Expressão regular para capturar IDs de 11 caracteres do YouTube em todos os formatos:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  // - https://www.youtube.com/live/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = cleanUrl.match(regExp);
  return match && match[1] ? match[1] : null;
}

export function isYouTubeUrl(url) {
  return Boolean(getYouTubeVideoId(url));
}

export function formatVideoEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const ytId = getYouTubeVideoId(url);
  if (ytId) {
    return `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=0&rel=0&modestbranding=1`;
  }
  return url;
}

export function getYouTubeThumbnailUrl(url) {
  const ytId = getYouTubeVideoId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return null;
}
