/**
 * Utilitários para processamento de textos e carrosséis no Feed.
 */

/**
 * Divide textos longos de reflexão/testemunhos em slides legíveis para o carrossel.
 * Suporta quebras manuais com '---' ou divisão inteligente por parágrafos/frases.
 * 
 * @param {string} text Texto completo a ser dividido
 * @param {number} targetLength Quantidade aproximada de caracteres por slide
 * @returns {string[]} Array de slides de texto
 */
export function splitTextIntoSlides(text, targetLength = 175) {
  if (!text) return [];
  const clean = text.trim();
  if (!clean) return [];

  // 1. Quebra manual com '---' (ex: Slide 1 --- Slide 2)
  if (clean.includes('---')) {
    const manualSlides = clean
      .split(/\n?---+[^\n]*\n?/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (manualSlides.length > 1) {
      return manualSlides;
    }
  }

  // 2. Se o texto for curto, mantém em 1 único slide
  if (clean.length <= targetLength) {
    return [clean];
  }

  // 3. Divide por parágrafos (dupla quebra de linha)
  const paragraphs = clean
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const slides = [];
  let currentSlide = '';

  for (const para of paragraphs) {
    // Se o parágrafo sozinho for muito longo, divide por sentenças
    if (para.length > targetLength) {
      if (currentSlide) {
        slides.push(currentSlide.trim());
        currentSlide = '';
      }

      // Separação inteligente por pontuação final (. ! ?)
      const sentences = para.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [para];
      let sentenceSlide = '';

      for (const sent of sentences) {
        const potential = (sentenceSlide ? sentenceSlide + ' ' : '') + sent.trim();
        if (potential.length > targetLength && sentenceSlide) {
          slides.push(sentenceSlide.trim());
          sentenceSlide = sent.trim();
        } else {
          sentenceSlide = potential;
        }
      }

      if (sentenceSlide) {
        slides.push(sentenceSlide.trim());
      }
    } else {
      // Verifica se o parágrafo cabe no slide atual
      const potential = currentSlide ? currentSlide + '\n\n' + para : para;
      if (potential.length > targetLength && currentSlide) {
        slides.push(currentSlide.trim());
        currentSlide = para;
      } else {
        currentSlide = potential;
      }
    }
  }

  if (currentSlide && currentSlide.trim()) {
    slides.push(currentSlide.trim());
  }

  return slides.length > 0 ? slides : [clean];
}
