/**
 * Utilitários seguros para persistência no localStorage.
 * Trata exceções como QuotaExceededError e faz fallback inteligente.
 */

export function safeSetLocalStorage(key, data) {
  try {
    const stringified = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, stringified);
    return true;
  } catch (error) {
    console.warn(`[safeSetLocalStorage] Quota excedida ou erro ao salvar "${key}":`, error);
    
    // Se for a lista de posts do feed que excedeu a cota, mantém apenas os 12 mais recentes
    if (key === 'simples_feed_posts' && Array.isArray(data)) {
      try {
        const trimmed = data.slice(0, 10);
        localStorage.setItem(key, JSON.stringify(trimmed));
        console.info('[safeSetLocalStorage] Feed aparado para 10 posts recentes com sucesso.');
        return true;
      } catch (e2) {
        console.error('[safeSetLocalStorage] Falha mesmo após trim dos posts:', e2);
      }
    }
    return false;
  }
}

export function safeGetLocalStorage(key, defaultValue = null) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (error) {
    console.warn(`[safeGetLocalStorage] Erro ao carregar "${key}":`, error);
    return defaultValue;
  }
}
