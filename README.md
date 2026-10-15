# Aplicativo Igreja Cristã Simples 🌿

Aplicativo web mobile-first desenvolvido para a **Igreja Cristã Simples** (Contagem/MG), centralizando todas as necessidades da comunidade em um único lugar moderno, acolhedor e intuitivo.

Site oficial de referência: [https://igrejacristasimples.com.br/](https://igrejacristasimples.com.br/)

---

## 🎯 Soluções para os Problemas do WhatsApp & Spotify

| Problema Anterior | Solução no Aplicativo |
| :--- | :--- |
| **Pregações perdidas no volume de mensagens do WhatsApp** | Módulo de **Pregações com visual inspirado no Spotify Podcast** organizado por **Séries**, Pregador, Data e Passagem Bíblica, com busca instantânea e favoritos. |
| **Membros sem conta no Spotify não conseguiam ouvir os cultos** | **Reprodutor de Áudio Nativo** integrado diretamente no app com visual e fluidez do Spotify. Toca instantaneamente sem cadastro, sem anúncios e sem necessidade do Spotify (com link opcional para quem já tem conta). |
| **Informativos e avisos desorganizados** | **Mural de Informativos & Liturgia** categorizado (*Liturgia*, *Geral*, *Mesas*, *Kids*, *Generosidade*), com botão de compartilhamento no WhatsApp em 1 clique. |
| **Mesas nos lares dispersas** | Seção dedicada às **Mesas da Simples** com detalhes dos bairros de Contagem (Industrial São Luiz, Eldorado, Riacho, Barreiro), horários, anfitriões, livro em estudo e botão de inscrição. |
| **Falta de canal para intercessão e apoio** | **Mural de Orações Comunitário** com botão interativo *"Estou orando por você"* e formulário com opção de anonimato. |
| **Dificuldade na contribuição ministerial** | Modal e card de **PIX com 1 clique** para copiar a chave oficial (`contato@igrejacristasimples.com.br`). |

---

## ✨ Principais Funcionalidades

### 1. 🎙️ Central de Pregações & Áudio Player
- **Mini-Player Persistente:** O áudio continua tocando na barra inferior enquanto o membro navega pelo aplicativo (lê informativos, orações, etc.).
- **Player Expandido:**
  - Controle de velocidade (0.75x, 1x, 1.25x, 1.5x, 2x)
  - Avanço de 30s e retrocesso de 15s
  - Barra de progresso interativa com tempo decorrido e restante
  - **Esboço & Resumo Teológico** da mensagem
  - **Perguntas para a Mesa** (discussão em pequenos grupos)
  - **Minhas Anotações:** Bloco de notas pessoal integrado, salvo automaticamente no aparelho do membro.

### 2. 📰 Informativos & Liturgia Semanal
- Leituras bíblicas, cânticos e roteiro da adoração do culto de domingo (09h00).
- Avisos do Simples Kids e Cantata.
- Compartilhamento no WhatsApp com texto formatado.

### 3. 🍞 As Mesas da Simples (Relacionais)
- Identidade da igreja fundamentada na mesa e na comunhão.
- Informações sobre os encontros semanais nos lares.
- Conexão direta com os anfitriões via WhatsApp.

### 4. 📸 Feed da Comunidade (Estilo Instagram)
- **Mural Interativo:** Compartilhamento de fotos, vídeos do culto e reflexões devocionais.
- **Stories do Culto:** Carrossel horizontal no topo com visualizador em tela cheia e barra de progresso.
- **Interações:** Curtidas com double-tap animado, comentários em tempo real e compartilhamento.
- **Criação de Posts:** Upload de fotos da galeria, seleção rápida de fotos da igreja ou postagem de textos com fundos degradê.

### 5. 🛡️ Painel da Liderança (Modo Admin)
- Permite que pastores e líderes publiquem novas pregações e novos avisos diretamente pelo aplicativo, sem precisar mexer em código.
- Dados sincronizados no armazenamento local com opção de restauração rápida.

### 6. 🎨 Identidade Visual & Design
- Paleta oficial fiel ao site: Verde Oliva canônico (`#61674f`), Verde Sálvia (`#9bad82`), Off-white e tons terrosos minimalistas.
- Tipografia oficial com **Dosis** para títulos e **Plus Jakarta Sans** para leitura fluida.
- Suporte a **Modo Escuro** e **Modo Claro** com transição suave.
- Design responsivo perfeito para smartphones (iPhone / Android) e desktop.

---

## 🚀 Como Executar o Projeto

### Requisitos
- Node.js (versão 18 ou superior)
- NPM

### Passos:
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Compilar versão de produção
npm run build
```

O aplicativo estará disponível em `http://localhost:5173/` e na sua rede local para testar diretamente pelo celular!
