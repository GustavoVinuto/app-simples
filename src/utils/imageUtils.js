/**
 * Utilitários para compressão e processamento de imagens no cliente.
 * Reduz imagens de celulares (que costumam ter 5MB-15MB) para tamanhos ideais (< 100KB),
 * garantindo compatibilidade total com o localStorage do navegador e evitando QuotaExceededError.
 */

export function compressImage(fileOrDataUrl, maxWidth = 800, maxHeight = 800, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();

    const process = () => {
      let width = img.width || 400;
      let height = img.height || 400;

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
        return;
      }

      // Preenche fundo branco para evitar transparência preta em PNGs convertidos para JPEG
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      try {
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      } catch (err) {
        console.warn('Falha na conversão canvas para dataURL:', err);
        resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
      }
    };

    img.onload = process;
    img.onerror = (err) => {
      console.warn('Erro ao carregar elemento de imagem:', err);
      if (typeof fileOrDataUrl === 'string') {
        resolve(fileOrDataUrl);
      } else {
        reject(err);
      }
    };

    if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrDataUrl);
    } else if (typeof fileOrDataUrl === 'string') {
      img.src = fileOrDataUrl;
    } else {
      reject(new Error('Formato de imagem não suportado'));
    }
  });
}
