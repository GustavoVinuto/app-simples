export const CHURCH_INFO = {
  name: "Igreja Cristã Simples",
  shortName: "Simples",
  tagline: "Missional e Relevante",
  verse: "Disse Deus a Moisés: Eu Sou o Que Sou. — Êxodo 3:14",
  address: "Rua Miradouro, 319 – Industrial São Luiz, Contagem – MG",
  cep: "32073-380",
  googleMapsUrl: "https://maps.google.com/?q=Rua+Miradouro+319+Industrial+Sao+Luiz+Contagem+MG",
  sundayService: "Domingos às 09h00 (Culto Público da Família)",
  relationalService: "Terças, Quartas e Quintas às 19h30 / 20h00 (Mesas nos Lares)",
  pixKey: "contato@igrejacristasimples.com.br",
  pixBank: "Banco Inter / Igreja Cristã Simples",
  whatsappNumber: "5531989844775",
  whatsappDisplay: "(31) 98984-4775",
  instagram: "@igrejacristasimples",
  instagramUrl: "https://www.instagram.com/igrejacristasimples/",
  website: "https://igrejacristasimples.com.br/",
  logoUrl: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/logo_nova.png",
  faviconUrl: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/cropped-FAVICON-3-192x192.png",
  heroImage: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-3.jpg",
  prayerHandsImage: "https://igrejacristasimples.com.br/wp-content/uploads/2024/09/bhc55444hCda0y6yVeH1.jpeg",
  kidsImage: "/banner_criancas.jpg",
  currentSeriesCover: "/serie-inside-outside.jpg",
  currentSeriesTitle: "Descobrindo a Simples: Inside Outside",
  currentSeriesBadge: "Microsérie",
};

export const INITIAL_SERIES = [
  {
    id: "serie-inside-outside",
    title: "Descobrindo a Simples: Inside Outside",
    shortTitle: "Inside Outside",
    description: "Microsérie especial sobre a essência, missão e chamado da Igreja Cristã Simples de dentro para fora.",
    cover: "/serie-inside-outside.jpg",
    totalMessages: 2,
    badge: "Série Atual",
    isCurrent: true,
    schedule: "11.10 • 9HR"
  },
  {
    id: "serie-1",
    title: "À Volta da Mesa",
    description: "A mesa como princípio fundamental do Evangelho, elemento de construção e intimidade espiritual.",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg",
    totalMessages: 4,
    badge: "Comunidade"
  },
  {
    id: "serie-2",
    title: "A Liturgia dos Dias Comuns",
    description: "Reconhecendo a glória de Deus na rotina, no trabalho, nas fraldas e na louça por lavar.",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/09/17c5F43JCdf91Vd0sdgO.jpeg",
    totalMessages: 5,
    badge: "Destaque"
  },
  {
    id: "serie-3",
    title: "Igreja Missional: Pontes e Estradas",
    description: "A igreja não foi chamada para erguer muros ou ser fazedora de portas fechadas, mas para ser pontes no mundo.",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-160.jpg",
    totalMessages: 3,
    badge: "Missões"
  },
  {
    id: "serie-4",
    title: "Atos 2 no Século XXI",
    description: "Perseverando no partir do pão, na comunhão e no serviço aos necessitados.",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-122.jpg",
    totalMessages: 4,
    badge: "Comunidade"
  }
];

export const INITIAL_SERMONS = [
  {
    id: "sermon-inside-outside-1",
    title: "Inside Outside: A Igreja de Dentro Para Fora",
    seriesId: "serie-inside-outside",
    seriesTitle: "Descobrindo a Simples: Inside Outside",
    speaker: "Pr. Marcos Vinícius",
    date: "11 de Outubro • 09h",
    duration: "45 min",
    bibleText: "Mateus 5:13-16 & Efésios 3:10",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    spotifyUrl: "https://open.spotify.com/search/igreja%20crista%20simples",
    cover: "/serie-inside-outside.jpg",
    isFeatured: true,
    summary: "Uma investigação profunda sobre o DNA da Simples. Mais do que quatro paredes ou estruturas, somos uma comunidade viva chamada a viver o Evangelho de dentro para fora na cidade.",
    outline: [
      "1. O chamado para ser luz e sal fora das quatro paredes.",
      "2. Inside: O cuidado com o coração, a mesa e o discipulado no secreto.",
      "3. Outside: A relevância missional e o impacto na cidade.",
      "4. Descobrindo a Simples: O que Deus confiou à nossa comunidade."
    ],
    tableQuestions: [
      "O que você tem descoberto sobre a essência da Igreja Simples nesta série?",
      "Como viver o 'Outside' no seu trabalho, estudos e vizinhança esta semana?",
      "De que forma podemos cuidar melhor da vida 'Inside' (espiritualidade e comunhão)?"
    ]
  },
  {
    id: "sermon-1",
    title: "A Mesa: O Lugar Onde a Identidade é Forjada",
    seriesId: "serie-1",
    seriesTitle: "À Volta da Mesa",
    speaker: "Pr. Marcos Vinícius",
    date: "12 de Outubro de 2026",
    duration: "42 min",
    bibleText: "Lucas 24:13-35 & 1 Coríntios 11:23-26",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    spotifyUrl: "https://open.spotify.com/search/igreja%20crista%20simples",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg",
    isFeatured: true,
    summary: "Quase todos os momentos decisivos de Jesus foram à mesa. É lá que os discípulos de Emaús abriram os olhos; é lá que pecadores encontraram refúgio. A mesa da Simples não é para matar a fome do estômago, mas para saciar a sede de comunidade.",
    outline: [
      "1. A mesa na Bíblia não é mobília, é altar comunitário.",
      "2. Como Jesus usou o comer e o beber para quebrar barreiras sociais e religiosas.",
      "3. De Emaús para a sua casa: por que sentar à mesa cura feridas do coração.",
      "4. O desafio semanal para cada família da Simples."
    ],
    tableQuestions: [
      "Quantas vezes na última semana você se sentou à mesa sem telas com alguém que você ama?",
      "Quem é a pessoa improvável que você poderia convidar para um café ou refeição nesta semana?",
      "O que o partir do pão nos ensina sobre a vulnerabilidade cristã?"
    ]
  },
  {
    id: "sermon-2",
    title: "Todo Mundo Quer Revolução, Mas Quem Lava a Louça?",
    seriesId: "serie-2",
    seriesTitle: "A Liturgia dos Dias Comuns",
    speaker: "Pr. Gabriel Santos",
    date: "05 de Outubro de 2026",
    duration: "38 min",
    bibleText: "Filipenses 2:1-11 & Colossenses 3:23-24",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    spotifyUrl: "https://open.spotify.com/search/igreja%20crista%20simples",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/09/17c5F43JCdf91Vd0sdgO.jpeg",
    isFeatured: true,
    summary: "Inspirado na frase célebre da comunidade do novo monasticismo: enquanto o mundo busca grandes holofotes e revoluções midiáticas, o Reino de Deus se desdobra na fidelidade quieta, nos cuidados com as crianças, na limpeza do lar e na gentileza no trânsito.",
    outline: [
      "1. A armadilha do cristianismo performático e barulhento.",
      "2. O Deus que trabalha e que santificou a matéria e os ofícios simples.",
      "3. Encontrando comunhão com Cristo na pia cheia e na rotina do trabalho.",
      "4. Paciência geracional: construindo legado dia após dia."
    ],
    tableQuestions: [
      "Qual tarefa da sua rotina você mais tem dificuldade de ver como serviço a Deus?",
      "Como você pode transformar seu local de trabalho ou tarefas domésticas em um ambiente de oração?",
      "De que forma a busca por aprovação social pode afastar você da simplicidade de Jesus?"
    ]
  },
  {
    id: "sermon-3",
    title: "A Igreja Como Ponte, Jamais Como Muro",
    seriesId: "serie-3",
    seriesTitle: "Igreja Missional: Pontes e Estradas",
    speaker: "Pr. Marcos Vinícius",
    date: "28 de Setembro de 2026",
    duration: "45 min",
    bibleText: "2 Coríntios 5:17-21 & Mateus 5:13-16",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    spotifyUrl: "https://open.spotify.com/search/igreja%20crista%20simples",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-160.jpg",
    isFeatured: false,
    summary: "O Espírito Santo ao descer sobre nós nos deu poder, não para nos fazer homens poderosos, mas para fazer o Reino acessível. A igreja não é fazedora de portas trancadas, mas fazedora de estradas e pontes em nossa cidade.",
    outline: [
      "1. O ministério da reconciliação: embaixadores da paz.",
      "2. Por que igrejas que se fecham em guetos morrem espiritualmente.",
      "3. Como Contagem e a região metropolitana sentem o perfume de Cristo através de nós?",
      "4. Ser sal da terra onde ninguém mais quer colocar sabor."
    ],
    tableQuestions: [
      "Em quais áreas do seu bairro ou trabalho você sente que faltam pontes de diálogo?",
      "Como podemos testemunhar do Evangelho com atitudes práticas antes mesmo das palavras?"
    ]
  },
  {
    id: "sermon-4",
    title: "Perseverando no Partir do Pão e nas Orações",
    seriesId: "serie-4",
    seriesTitle: "Atos 2 no Século XXI",
    speaker: "Diác. Lucas Ferreira",
    date: "21 de Setembro de 2026",
    duration: "36 min",
    bibleText: "Atos 2:42-47",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    spotifyUrl: "https://open.spotify.com/search/igreja%20crista%20simples",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-122.jpg",
    isFeatured: false,
    summary: "A igreja do primeiro século não viveu Atos 2 todos os dias da sua vida, mas só conseguiu viver os dias mais difíceis porque experimentou Atos 2 em profundidade. A verdadeira vida congregacional exige compromisso e afeto mútuo.",
    outline: [
      "1. Os quatro pilares: doutrina dos apóstolos, comunhão, partir do pão e oração.",
      "2. O milagre de ter 'tudo em comum': solidariedade espontânea e generosa.",
      "3. Por que a solidão moderna não resiste à mesa dos santos."
    ],
    tableQuestions: [
      "Você tem compartilhado suas reais necessidades com os irmãos ou mantido uma máscara de 'tudo bem'?",
      "Qual foi a última oração respondida que sua família testemunhou em comunidade?"
    ]
  },
  {
    id: "sermon-5",
    title: "Deus é Simples: A Pureza do Ser de Deus",
    seriesId: "serie-1",
    seriesTitle: "À Volta da Mesa",
    speaker: "Pr. Marcos Vinícius",
    date: "14 de Setembro de 2026",
    duration: "49 min",
    bibleText: "Êxodo 3:13-14 & João 4:24",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    spotifyUrl: "https://open.spotify.com/search/igreja%20crista%20simples",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-3.jpg",
    isFeatured: false,
    summary: "O que queremos dizer quando afirmamos que Deus é simples? Deus não é um ser composto, dividido em partes. Ele é puro, completo e fiel. Viver o evangelho em seu formato mínimo significa viver a pureza sem complicações mundanas.",
    outline: [
      "1. A definição teológica clássica da Simplicidade Divina.",
      "2. Descomplicando a vida de fé: o jugo suave de Cristo.",
      "3. Desapegando do supérfluo para abraçar o eterno."
    ],
    tableQuestions: [
      "Quais pesos ou tradições desnecessárias temos carregado na nossa jornada de fé?",
      "Como a simplicidade de Deus traz descanso para a sua mente ansiosa?"
    ]
  }
];

export const INITIAL_BULLETINS = [
  {
    id: "bulletin-1",
    title: "Liturgia do Culto Dominical — 09h00",
    category: "Liturgia",
    date: "15 de Outubro de 2026",
    badge: "Próximo Culto",
    image: "/serie-inside-outside.jpg",
    summary: "Confira a ordem do nosso culto deste domingo às 09h00 no prédio da Simples. Traga sua Bíblia e coração aberto para a Mesa da Comunhão.",
    content: `
### Culto Público da Igreja Cristã Simples
**Data:** Domingo, às 09h00  
**Local:** Rua Miradouro, 319 – Industrial São Luiz, Contagem  

#### Ordem da Adoração:
1. **Prelúdio & Chamada à Adoração:** Leitura comunitária do Salmo 145.
2. **Cânticos de Exaltação:** Louvor congregacional com foco na glória de Cristo.
3. **Oração de Confissão & Graça:** Reconhecendo nossa fraqueza e a suficiência de Jesus.
4. **Mensagem Pastoral:** Microsérie *Descobrindo a Simples: Inside Outside* — 09h.
5. **A Mesa do Senhor (A Ceia):** Distribuição do pão e do cálice a todos os batizados em comunhão.
6. **Bênção e Envio Missional:** "Ide em paz para amar e servir a cidade de Contagem!"
    `,
    actionText: "Ver no Google Maps",
    actionLink: "https://maps.google.com/?q=Rua+Miradouro+319+Industrial+Sao+Luiz+Contagem+MG"
  },
  {
    id: "bulletin-2",
    title: "Simples Kids: Instruindo as Novas Gerações",
    category: "Kids",
    date: "13 de Outubro de 2026",
    badge: "Ministério",
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/banner_criancas.jpg",
    summary: "As crianças não são apenas o futuro da Simples, elas são o PRESENTE da nossa igreja! Confira os temas e cuidados desta semana.",
    content: `
"Uma geração contará à outra a grandiosidade dos teus feitos; eles anunciarão os teus atos poderosos." (Salmos 145:4)

Temos uma aliança com Deus e com os pequenos da Simples. Todas as salas contam com professores preparados, lanche saudável e atividades didáticas alinhadas ao ensino bíblico ministrado no púlpito.

- **Check-in das Crianças:** das 08h45 às 09h10
- **Faixas etárias:** Berçário (0 a 2 anos), Pequeninos (3 a 6 anos) e Juniores (7 a 11 anos)
- **Tema do mês:** "As Histórias que Jesus Contava em Volta da Mesa"
    `,
    actionText: "Falar com Liderança Kids",
    actionLink: "https://wa.me/5531989844775?text=Ola%2C+gostaria+de+saber+mais+sobre+o+Simples+Kids"
  },
  {
    id: "bulletin-3",
    title: "Encontros das Mesas: Início do Novo Livro Comunitário",
    category: "Mesas",
    date: "10 de Outubro de 2026",
    badge: "Relacional",
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_1.png",
    summary: "Neste mês, todas as nossas Mesas nos lares estarão lendo e debatendo o livro 'Liturgia do Ordinário' de Tish Harrison Warren.",
    content: `
A mesa não é lugar de satisfação de necessidades passageiras, mas o lugar onde nossa IDENTIDADE cristã é forjada.

Nossos encontros acontecem durante a semana nas casas em diferentes regiões de Contagem. Não deixe de se integrar à Mesa mais próxima da sua residência!

- **Livro do Ciclo:** *Liturgia do Ordinário*
- **Disponibilidade:** Exemplares disponíveis para empréstimo em nossa Biblioteca Simples no domingo.
- **Estrutura:** Café compartilhado, leitura do capítulo, perguntas práticas e oração intercessória.
    `,
    actionText: "Encontrar Minha Mesa",
    actionTab: "mesas"
  },
  {
    id: "bulletin-4",
    title: "Avisos Importantes: Chave PIX e Contribuição Ministerial",
    category: "Geral",
    date: "08 de Outubro de 2026",
    badge: "Generosidade",
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/09/bhc55444hCda0y6yVeH1.jpeg",
    summary: "Seja fiel na sustentação da obra, na manutenção do nosso espaço e nas ações de amparo a famílias vulneráveis.",
    content: `
A generosidade da comunidade cristã não é uma obrigação legalista, mas uma resposta alegre ao Evangelho de Cristo, que sendo rico, por amor de nós se fez pobre.

**Nossa Chave PIX Oficial:**
\`contato@igrejacristasimples.com.br\`

Todos os recursos são destinados com transparência para a pregação do evangelho, o custeio de nossas reuniões e o socorro misericordioso às famílias da nossa região.
    `,
    actionText: "Copiar Chave PIX",
    actionTab: "contribuir"
  }
];

export const INITIAL_TABLE_GROUPS = [
  {
    id: "mesa-1",
    name: "Mesa Industrial São Luiz",
    region: "Contagem — Região Industrial",
    dayTime: "Quartas-feiras às 19h30",
    hosts: "Marcos & Ana Lívia",
    addressSummary: "Próximo à Praça da Cemig",
    currentBook: "Liturgia do Ordinário",
    contactPhone: "5531989844775",
    spotsLeft: 4,
    tags: ["Jovens Casais", "Famílias", "Estudo Prático"],
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg"
  },
  {
    id: "mesa-2",
    name: "Mesa Eldorado",
    region: "Contagem — Bairro Eldorado",
    dayTime: "Quintas-feiras às 20h00",
    hosts: "Lucas & Renata",
    addressSummary: "Próximo à Estação Eldorado do Metrô",
    currentBook: "Cristianismo Puro e Simples",
    contactPhone: "5531989844775",
    spotsLeft: 3,
    tags: ["Teens & Universitários", "Leitura e Café"],
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-160.jpg"
  },
  {
    id: "mesa-3",
    name: "Mesa Riacho das Pedras",
    region: "Contagem — Riacho",
    dayTime: "Terças-feiras às 19h45",
    hosts: "Carlos & Fernanda",
    addressSummary: "Região Central do Riacho",
    currentBook: "Simplesmente Crente (Michael Horton)",
    contactPhone: "5531989844775",
    spotsLeft: 6,
    tags: ["Famílias com Filhos", "Comunhão"],
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-122.jpg"
  },
  {
    id: "mesa-4",
    name: "Mesa Barreiro & Região",
    region: "Belo Horizonte / Limite com Contagem",
    dayTime: "Quartas-feiras às 20h00",
    hosts: "Tiago & Marcela",
    addressSummary: "Barreiro de Cima",
    currentBook: "Igreja Simples (Thom Rainer)",
    contactPhone: "5531989844775",
    spotsLeft: 5,
    tags: ["Profissionais", "Discipulado"],
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/09/bhc55444hCda0y6yVeH1.jpeg"
  }
];

export const CHURCH_MINISTRIES = [
  {
    id: "de-casa-em-casa",
    name: "De Casa em Casa",
    subtitle: "Relacional Simples²⁶",
    featured: true,
    description: "Nossos encontros relacionais nos lares de terça a quinta-feira. Estudando juntos o Catecismo Nova Cidade, fortalecendo a comunhão e caminhando de casa em casa.",
    image: "/relacional/card-inicial.jpg",
    age: "Toda a família",
    location: "Nos Lares • Contagem e Sarzedo",
    badge: "Relacional nos Lares",
    themeVerse: "E todos os dias, no templo e de casa em casa, não cessavam de ensinar e de pregar Jesus, o Cristo. — Atos 5:42",
    whatsappMessage: "Olá! Gostaria de saber mais e participar de um dos encontros De Casa em Casa (Relacional) da Igreja Cristã Simples.",
    events: [
      {
        id: "relacional-evt-1",
        title: "Mesas nos Lares",
        tagRight: "Ter, Qua & Qui • 20h",
        badge: "Semanal",
        date: "Terças, Quartas e Quintas às 20h00",
        time: "Ter, Qua & Qui às 20h00",
        loc: "Europa, Tropical, Estâncias & Masterville",
        feature2: "Catecismo Nova Cidade",
        feature2Icon: "book",
        feature3: "4 Mesas nos Lares",
        feature3Icon: "home",
        image: "/relacional/logo.jpg",
        description: "A mesa como princípio fundamental do Evangelho. Comunhão viva nos lares com estudo bíblico, partilha do pão e oração."
      },
      {
        id: "relacional-evt-2",
        title: "Mesas em Contagem",
        tagRight: "Europa, Tropical & Estâncias",
        badge: "3 Lares",
        date: "Terças e Quintas às 20h00",
        time: "Terças & Quintas às 20h00",
        loc: "Bairros de Contagem • MG",
        feature2: "Estudo Catecismo",
        feature2Icon: "book",
        feature3: "3 Mesas nos Lares",
        feature3Icon: "home",
        image: "/relacional/casas-1.jpg",
        description: "Encontros acolhedores nos lares de Contagem. Partilha da Palavra, café compartilhado e edificação espiritual mútua."
      },
      {
        id: "relacional-evt-3",
        title: "Mesa em Sarzedo",
        tagRight: "Masterville",
        badge: "1 Lar",
        date: "Quintas-feiras às 20h00",
        time: "Quintas às 20h00",
        loc: "Bairro Masterville • Sarzedo",
        feature2: "Comunhão & Mesa",
        feature2Icon: "sparkles",
        feature3: "Lar Léo & Edilene",
        feature3Icon: "home",
        image: "/relacional/casas-2.jpg",
        description: "Comunhão viva no lar de Léo & Edilene em Sarzedo. Hospitalidade cristã e fortalecimento dos laços fraternos."
      },
      {
        id: "relacional-evt-4",
        title: "Estudo Catecismo",
        tagRight: "2º Semestre 2026",
        badge: "Semestral",
        date: "Agosto a Novembro de 2026",
        time: "Semanal às 20h00",
        loc: "Perguntas 21 a 35",
        feature2: "Catecismo Nova Cidade",
        feature2Icon: "book",
        feature3: "Cristo, Redenção & Graça",
        feature3Icon: "book",
        image: "/relacional/carta.jpg",
        description: "Catecismo Nova Cidade – Segunda Parte: Cristo, Redenção e Graça. Estudo sistemático para a maturidade de todo o Corpo de Cristo."
      }
    ],
    studyMaterial: {
      title: "Catecismo Nova Cidade – Segunda Parte: Cristo, Redenção e Graça",
      questions: "Perguntas 21 a 35",
      period: "Agosto a Novembro",
      highlight: "Estudo sistemático para o crescimento espiritual e maturidade de todo o Corpo de Cristo."
    },
    letter: {
      salutation: "Oi, Simples!",
      paragraphs: [
        "Estamos extremamente felizes com o retorno do nosso Relacional²⁶.",
        "Assim como temos feito nos últimos anos, continuaremos estudando juntos. Neste semestre, seguiremos com o Catecismo Nova Cidade – Segunda Parte: Cristo, Redenção e Graça, abrangendo as perguntas 21 a 35.",
        "Aqui você encontrará a lista das casas, dias e horários em que acontecerão os encontros. Sua participação é fundamental para o seu crescimento espiritual e, consequentemente, para o amadurecimento de todo o Corpo de Cristo.",
        "Nosso propósito é caminhar juntos nesse estudo de agosto a novembro, fortalecendo nossa comunhão, aprofundando nosso conhecimento das Escrituras e sendo edificados pela graça de Deus.",
        "é simples."
      ]
    },
    houses: [
      {
        id: "casa-lurdinha-camila",
        hosts: "Lurdinha & Camila",
        day: "Terça-feira",
        time: "20h00",
        address: "Av. Padre Joaquim Martins, 752",
        neighborhood: "Bairro Europa",
        city: "Contagem",
        fullAddress: "Av. Padre Joaquim Martins, 752 – Bairro Europa, Contagem",
        mapsUrl: "https://maps.google.com/?q=Av.+Padre+Joaquim+Martins+752+Bairro+Europa+Contagem",
        whatsapp: "5531989844775",
        image: "/casas/casa-europa.jpg"
      },
      {
        id: "casa-fred-cris",
        hosts: "Fred & Cris",
        day: "Quarta-feira",
        time: "20h00",
        address: "Rua Antônia Alves de Vieira Duarte, 124",
        neighborhood: "Bairro Tropical",
        city: "Contagem",
        fullAddress: "Rua Antônia Alves de Vieira Duarte, 124 – Bairro Tropical, Contagem",
        mapsUrl: "https://maps.google.com/?q=Rua+Antonia+Alves+de+Vieira+Duarte+124+Bairro+Tropical+Contagem",
        whatsapp: "5531989844775",
        image: "/casas/casa-tropical.jpg"
      },
      {
        id: "casa-andre-kamilla",
        hosts: "André & Kamilla",
        day: "Quinta-feira",
        time: "20h00",
        address: "Rua das Harpas, 216",
        neighborhood: "Bairro Estâncias Imperiais",
        city: "Contagem",
        fullAddress: "Rua das Harpas, 216 – Bairro Estâncias Imperiais, Contagem",
        mapsUrl: "https://maps.google.com/?q=Rua+das+Harpas+216+Bairro+Estancias+Imperiais+Contagem",
        whatsapp: "5531989844775",
        image: "/casas/casa-estancias.jpg"
      },
      {
        id: "casa-leo-edilene",
        hosts: "Léo & Edilene",
        day: "Quinta-feira",
        time: "20h00",
        address: "Rua Alameda Ipê Branco, 121",
        neighborhood: "Bairro Masterville",
        city: "Sarzedo",
        fullAddress: "Rua Alameda Ipê Branco, 121 – Bairro Masterville, Sarzedo",
        mapsUrl: "https://maps.google.com/?q=Rua+Alameda+Ipe+Branco+121+Bairro+Masterville+Sarzedo",
        whatsapp: "5531989844775",
        image: "/casas/casa-masterville.jpg"
      }
    ],
    gallery: [
      {
        title: "Carta de Abertura do Relacional",
        src: "/relacional/carta.jpg",
        caption: "Estudo Catecismo Nova Cidade"
      },
      {
        title: "Casas em Contagem",
        src: "/relacional/casas-1.jpg",
        caption: "Bairros Europa, Tropical e Estâncias Imperiais"
      },
      {
        title: "Casa em Sarzedo",
        src: "/relacional/casas-2.jpg",
        caption: "Bairro Masterville"
      }
    ]
  },
  {
    id: "simple-teens",
    name: "Simple Teens",
    subtitle: "Teens & Conexão",
    description: "Espaço de comunhão, discipulado bíblico e amizade para os adolescentes da Simples.",
    image: "/teens/teens-group.jpg",
    age: "12 a 17 anos",
    location: "Rua Miradouro, 319 • Industrial",
    whatsappMessage: "Olá! Gostaria de saber mais sobre o ministério Simple Teens da Igreja Cristã Simples.",
    events: [
      {
        id: "teens-evt-1",
        title: "Conexão Teens",
        tagRight: "Sextas • 19h30",
        badge: "Semanal",
        date: "Sextas-feiras às 19h30",
        time: "Sextas às 19h30",
        loc: "Rua Miradouro, 319 • Prédio Simples",
        feature2: "Semanal",
        feature2Icon: "sparkles",
        feature3: "12 a 17 anos",
        feature3Icon: "users",
        image: "/teens/teens-group.jpg",
        description: "Encontro semanal de adolescentes com comunhão, dinâmica bíblica e lanche compartilhado."
      },
      {
        id: "teens-evt-2",
        title: "Retiro & Acampamento Teens",
        tagRight: "Novembro • 2026",
        badge: "Especial",
        date: "Novembro de 2026",
        time: "Fim de semana integral",
        loc: "Sítio Vale Verde • Contagem",
        feature2: "Imersão Espiritual",
        feature2Icon: "sparkles",
        feature3: "Simple Teens",
        feature3Icon: "users",
        image: "/teens/teens-camp.jpg",
        description: "Três dias de imersão espiritual, amizade, luau e propósito com a juventude da Simples."
      },
      {
        id: "teens-evt-3",
        title: "Unidade & Propósito",
        tagRight: "Encontro Especial",
        badge: "Comunhão",
        date: "Sábados às 17h00",
        time: "Sábados às 17h00",
        loc: "Rua Miradouro, 319 • Industrial",
        feature2: "Crescimento & Fé",
        feature2Icon: "sparkles",
        feature3: "Teens da Simples",
        feature3Icon: "users",
        image: "/teens/teens-circle.jpg",
        description: "Um só coração e uma só voz. Vivendo o amor de Cristo juntos desde a juventude."
      }
    ]
  },
  {
    id: "mulher-simples",
    name: "Mulher Simples",
    subtitle: "Mulheres da Simples",
    description: "Mulheres que buscam a presença de Deus, acolhimento, oração mútua e edificação na fé.",
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg",
    age: "Mulheres de todas as idades",
    location: "Rua Miradouro, 319 • Industrial",
    whatsappMessage: "Olá! Gostaria de saber mais sobre o ministério Mulher Simples da Igreja Cristã Simples.",
    events: [
      {
        id: "mulher-evt-sala-oracao",
        title: "Sala de Oração",
        //tagRight: "Todo Domingo • 8h30",
        badge: "Semanal",
        date: "Todos os Domingos às 08h30",
        time: "Domingos às 08h30",
        loc: "Rua Miradouro, 319 • Prédio Simples",
        feature2: "Oração & Clamor",
        feature2Icon: "sparkles",
        feature3: "Somente Mulheres",
        feature3Icon: "heart",
        image: "/sala-de-oracao.jpg",
        description: "Momento especial de oração, clamor e intercessão somente para mulheres antes do culto público. Todo domingo às 8h30."
      },
      {
        id: "mulher-evt-1",
        title: "Chá de Mulheres & Comunhão",
        tagRight: "Mensal • Sábado",
        badge: "Mensal",
        date: "Último Sábado do Mês às 16h00",
        time: "Último Sábado às 16h00",
        loc: "Rua Miradouro, 319 • Industrial",
        feature2: "Comunhão & Chá",
        feature2Icon: "sparkles",
        feature3: "Mulheres Simples",
        feature3Icon: "heart",
        image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg",
        description: "Tarde especial de acolhimento, edificação mútua, testemunhos e chá da tarde."
      },
      {
        id: "mulher-evt-2",
        title: "Círculo de Leitura & Oração",
        tagRight: "Quintas • 19h30",
        badge: "Quinzenal",
        date: "Quintas-feiras às 19h30",
        time: "Quintas às 19h30",
        loc: "Mesas nos Lares",
        feature2: "Livros & Oração",
        feature2Icon: "book",
        feature3: "Quinzenal",
        feature3Icon: "users",
        image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-36.jpg",
        description: "Leitura de livros comunitários e fortalecimento dos laços fraternos."
      }
    ]
  },
  {
    id: "simple-kids",
    name: "Simple Kids",
    subtitle: "Crianças & Família",
    description: "Instruindo a nova geração nos caminhos do Senhor com atividades lúdicas e bíblicas aos domingos.",
    image: "/banner_criancas.jpg",
    age: "Berçário a 11 anos",
    location: "Rua Miradouro, 319 • Industrial",
    whatsappMessage: "Olá! Gostaria de saber mais sobre o ministério Simple Kids da Igreja Cristã Simples.",
    events: [
      {
        id: "kids-evt-1",
        title: "Salas Kids & Berçário",
        //tagRight: "Todo Domingo • 9h",
        //badge: "Todo Domingo",
        date: "Todos os Domingos às 09h00",
        time: "Domingos às 09h00",
        loc: "Salas Kids • Rua Miradouro, 319",
        feature2: "Ensino & Cuidado",
        feature2Icon: "sparkles",
        feature3: "Berçário a 11 anos",
        feature3Icon: "baby",
        image: "/banner_criancas.jpg",
        description: "Acolhimento para crianças de berçário até 11 anos durante o culto público da família aos domingos."
      }
    ]
  },
  {
    id: "hermanos",
    name: "Hermanos",
    subtitle: "Homens da Simples",
    description: "Homens caminhando juntos em fraternidade, integridade de fé, vida familiar e testemunho no trabalho.",
    image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/09/17c5F43JCdf91Vd0sdgO.jpeg",
    age: "Homens de todas as idades",
    location: "Rua Miradouro, 319 • Industrial",
    whatsappMessage: "Olá! Gostaria de saber mais sobre o ministério Hermanos da Igreja Cristã Simples.",
    events: [
      {
        id: "hermanos-evt-1",
        title: "Café dos Hermanos",
        tagRight: "1º Sábado • 8h",
        badge: "Mensal",
        date: "1º Sábado do Mês às 08h00",
        time: "1º Sábado às 08h00",
        loc: "Rua Miradouro, 319 • Industrial",
        feature2: "Café Comunitário",
        feature2Icon: "sparkles",
        feature3: "Homens da Simples",
        feature3Icon: "users",
        image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/09/17c5F43JCdf91Vd0sdgO.jpeg",
        description: "Café comunitário, palavra e fraternidade entre os homens da Simples."
      },
      {
        id: "hermanos-evt-2",
        title: "Discipulado no Trabalho",
        tagRight: "Terças • 19h30",
        badge: "Quinzenal",
        date: "Terças-feiras às 19h30",
        time: "Terças às 19h30",
        loc: "Online & Lares",
        feature2: "Fé no Cotidiano",
        feature2Icon: "book",
        feature3: "Quinzenal",
        feature3Icon: "users",
        image: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-160.jpg",
        description: "Homens caminhando juntos em integridade e testemunho no cotidiano."
      }
    ]
  }
];

export const CHURCH_BOOKS = [
  {
    id: "book-1",
    title: "Liturgia do Ordinário",
    author: "Tish Harrison Warren",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_1.png",
    description: "Práticas sagradas na vida cotidiana. Como escovar os dentes, tomar café e arrumar a cama podem ser momentos de adoração a Deus."
  },
  {
    id: "book-2",
    title: "Cristianismo Puro e Simples",
    author: "C.S. Lewis",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_2.png",
    description: "A essência da fé cristã despida de divisões confessionais secundárias. Leitura essencial para todo cristão que busca profundidade com clareza."
  },
  {
    id: "book-3",
    title: "Simplesmente Crente",
    author: "Michael Horton",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_3.png",
    description: "Resgatando a beleza de viver a fé comum sem a pressão da busca obsessiva por status e relevância artificial."
  },
  {
    id: "book-4",
    title: "Igreja Simples",
    author: "Thom S. Rainer & Eric Geiger",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_4.png",
    description: "Como descomplicar o ministério para focar naquilo que realmente gera discípulos semelhantes a Cristo."
  },
  {
    id: "book-5",
    title: "O Banquete Secreto",
    author: "Autores da Comunidade",
    cover: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/LIVRO_5.png",
    description: "A teologia da hospitalidade cristã e a centralidade da Mesa nas Escrituras."
  }
];

export const INITIAL_PRAYERS = [
  {
    id: "prayer-1",
    author: "Família Silva",
    request: "Pela saúde da pequena Clara e pelo tratamento médico que ela inicia nesta quinta-feira.",
    date: "Hoje às 14:20",
    prayerCount: 18,
    isPrivate: false
  },
  {
    id: "prayer-2",
    author: "Irmão Anônimo",
    request: "Por direcionamento vocacional e sabedoria em uma transição de emprego complexa.",
    date: "Ontem às 20:15",
    prayerCount: 24,
    isPrivate: false
  },
  {
    id: "prayer-3",
    author: "Equipe das Mesas",
    request: "Pelas famílias anfitriãs das Mesas desta semana, para que cada lar seja abrigo de paz e consolo.",
    date: "12 de Outubro",
    prayerCount: 31,
    isPrivate: false
  }
];

export const FEED_STORIES = [
  {
    id: "story-1",
    author: "Igreja Simples",
    avatar: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/logo_nova.png",
    media: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Foto-Site-1.jpg",
    title: "Culto ao Vivo",
    time: "Hoje",
    hasUnseen: true
  },
  {
    id: "story-2",
    author: "Louvor & Adoração",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80",
    media: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg",
    title: "Cânticos",
    time: "Há 2h",
    hasUnseen: true
  },
  {
    id: "story-3",
    author: "Simple Kids",
    avatar: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=150&q=80",
    media: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/banner_criancas.jpg",
    title: "Salas Kids",
    time: "Há 4h",
    hasUnseen: false
  },
  {
    id: "story-4",
    author: "Mesa Industrial",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    media: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/IMG_4260-1.jpg",
    title: "Comunhão",
    time: "Ontem",
    hasUnseen: false
  },
  {
    id: "story-5",
    author: "Mulher Simples",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    media: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-36.jpg",
    title: "Encontro",
    time: "Ontem",
    hasUnseen: false
  },
  {
    id: "story-6",
    author: "Simple Teens",
    avatar: "/teens/teens-circle.jpg",
    media: "/teens/teens-camp.jpg",
    title: "Conexão",
    time: "Hoje",
    hasUnseen: true
  }
];

export const INITIAL_FEED_POSTS = [
  {
    id: "post-1",
    author: {
      name: "Pr. Marcos Silveira",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      role: "Pastor Local"
    },
    location: "Igreja Cristã Simples • Industrial",
    category: "Culto de Domingo",
    timestamp: "Há 2 horas",
    type: "image",
    mediaUrl: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Foto-Site-1.jpg",
    caption: "Domingo de adoração e celebração da Ceia do Senhor. Recordando a entrega de Jesus e vivendo o formato mínimo do evangelho: comunhão genuína, mesa farta e corações quebrantados. Que alegria servir com vocês!",
    likesCount: 38,
    isLiked: false,
    comments: [
      { id: "c-1", author: "Mariana Costa", text: "Manhã tão preciosa na presença de Deus!", time: "Há 1h" },
      { id: "c-2", author: "Felipe Andrade", text: "Essa palavra em Lucas 24 tocou muito meu coração.", time: "Há 40 min" },
      { id: "c-3", author: "Carla Diniz", text: "Amém! Glória a Deus por nossa família em Cristo.", time: "Há 15 min" }
    ]
  },
  {
    id: "post-2",
    author: {
      name: "Mariana Costa",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      role: "Membro da Simples"
    },
    location: "Mesa no Eldorado",
    category: "Mesas nos Bairros",
    timestamp: "Ontem às 21:15",
    type: "image",
    mediaUrl: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-36.jpg",
    caption: "Nossa Mesa ontem no Eldorado! Café fresquinho, partilha sincera e leitura de 'Liturgia do Ordinário'. A beleza de caminhar juntos nos dias comuns da semana.",
    likesCount: 29,
    isLiked: true,
    comments: [
      { id: "c-4", author: "Lucas Dias", text: "O café e a conversa estavam maravilhosos! Até quinta que vem.", time: "Ontem" },
      { id: "c-5", author: "Letícia Ramos", text: "Que bênção essa mesa! Amo nossa igreja.", time: "Ontem" }
    ]
  },
  {
    id: "post-3",
    author: {
      name: "Equipe de Louvor",
      avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80",
      role: "Ministério de Louvor"
    },
    location: "Santuário • Prédio Simples",
    category: "Louvor & Adoração",
    timestamp: "Há 1 dia",
    type: "video",
    mediaUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
    videoThumbnail: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/Cantata-188.jpg",
    caption: "“Pois dele, por ele e para ele são todas as coisas.” Momentos de consagração e louvor do último culto. O som da igreja cantando unida é emocionante!",
    likesCount: 52,
    isLiked: false,
    comments: [
      { id: "c-6", author: "João Pedro", text: "Esse arranjo acústico ficou lindo demais!", time: "Há 1 dia" }
    ]
  },
  {
    id: "post-4",
    author: {
      name: "Tia Débora & Simple Kids",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      role: "Simple Kids"
    },
    location: "Salas das Crianças",
    category: "Simple Kids",
    timestamp: "Há 2 dias",
    type: "image",
    mediaUrl: "https://igrejacristasimples.com.br/wp-content/uploads/2024/08/banner_criancas.jpg",
    caption: "Oficina bíblica das crianças hoje! Nossos pequeninos aprendendo sobre a bacia e a toalha e o amor de Jesus servindo ao próximo. Olhem a alegria deles!",
    likesCount: 44,
    isLiked: false,
    comments: [
      { id: "c-7", author: "Carla Diniz", text: "Meu filho chegou em casa contando tudo! Deus abençoe a equipe.", time: "Há 2 dias" },
      { id: "c-8", author: "Pr. Marcos Silveira", text: "Trabalho lindo e fundamental! Nossos pequenos são preciosos.", time: "Há 2 dias" }
    ]
  },
  {
    id: "post-5",
    author: {
      name: "Lucas Mendes",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      role: "Membro da Simples"
    },
    location: "Dias Comuns • Contagem",
    category: "Reflexão & Vida",
    timestamp: "Há 3 dias",
    type: "text",
    backgroundColor: "linear-gradient(135deg, #1d2219 0%, #31392b 100%)",
    textContent: "“Dias comuns fazem parte de uma vida extraordinária. O crescimento e desenvolvimento acontece sob o desejo de Deus e os efeitos naturais da aplicação e prática do Evangelho. É Ele quem acrescenta.”\n\nQue nesta semana nosso coração descanse na suficiência de Cristo.",
    caption: "Lembrando da palavra de domingo enquanto começamos a semana de trabalho.",
    likesCount: 26,
    isLiked: true,
    comments: [
      { id: "c-9", author: "Gabriel Santos", text: "Muito bom lembrar disso na correria da segunda-feira!", time: "Há 3 dias" }
    ]
  }
];

