# 🌙 Persona 3 Portfolio | Lucas Melaré

Bem-vindo à *Dark Hour*. Este é o meu portfólio web pessoal, construído com **React** e
**Framer Motion**, fortemente inspirado na interface do jogo *Persona 3*.

A ideia é transformar um currículo tradicional em uma experiência navegável como o menu de
pausa do jogo — **STATS**, **PERSONA**, **QUEST**, **SOCIAL LINK** e **SYSTEM** — mantendo o
conteúdo em dia com o currículo em PDF.

🔗 **Online:** [p3-portifolio.vercel.app](https://p3-portifolio.vercel.app)

## 🎮 Funcionalidades

- **Linguagem visual do Persona 3** — fundo azul "submerso" com reflexos de água, feixes de
  luz e bolhas; itens de menu grandes, inclinados e em escada; cursor em faixa branca com
  sombra ciano; painéis com canto cortado e o nome da tela gigante ao fundo.
- **Tipografia** — [Anton](https://fonts.google.com/specimen/Anton) para menus e títulos
  (condensada e pesada, como a do jogo) e
  [Barlow Semi Condensed](https://fonts.google.com/specimen/Barlow+Semi+Condensed) para o texto.
- **Calendário do HUD** — data, dia da semana, período do dia com os nomes do jogo
  (*After School*, *Evening*…) e a **fase real da lua**. Entre 00h e 01h vira *Dark Hour*
  e a tela inteira fica verde.
- **Conteúdo com vocabulário do jogo** — habilidades como entradas do compêndio (Arcano, Lv
  e barra de NEXT), projetos como pedidos numerados, contatos como Social Links, currículos
  como *save data*.
- **BGM original** — uma faixa de acid jazz / hip-hop lo-fi (o gênero da trilha do jogo)
  sintetizada em tempo real na Web Audio API: bateria com swing, piano elétrico em FM,
  baixo e vibrafone. Nenhum trecho da trilha oficial é reproduzido.
- **SE em timbre de sino/vidro** para cursor, confirmar, cancelar e abertura.
- **Barra de ajuda e legendas de botão** — o rodapé descreve o item sob o cursor e mostra os
  atalhos, mais os toggles de BGM, SE e idioma (também em SYSTEM → CONFIG).
- **Navegação por mouse e teclado** (`↑` `↓`, `Enter`, `Esc`).
- **Bilíngue (PT/EN)** — segue o idioma do navegador, pode ser trocado e fica salvo.
- **Responsivo** de 320px a desktop, com respeito a `prefers-reduced-motion`.

## 🛠️ Tecnologias

- [React 19](https://react.dev/) via [Vite 7](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/) — animações de interface
- [React Icons](https://react-icons.github.io/react-icons/)
- CSS puro com *custom properties*, SVG `feTurbulence` para a água e Web Audio API
- ESLint (flat config) com os plugins de React e React Hooks

## 📁 Estrutura

```
src/
├─ App.jsx                 # orquestra estado, idioma, áudio e transições
├─ index.css               # tokens de design, layout responsivo e temas
├─ data/content.js         # TODO o conteúdo (PT/EN) — atualize aqui ao mudar o currículo
├─ lib/audio.js            # SE e BGM sintetizados (Web Audio API)
├─ lib/calendar.js         # fase da lua e período do dia do HUD
├─ hooks/useMediaQuery.js  # breakpoint e prefers-reduced-motion
├─ hooks/useNow.js         # relógio atualizado a cada minuto
└─ components/
   ├─ TitleScreen.jsx
   ├─ Backdrop.jsx         # mar, cáusticas, bolhas e lua
   ├─ Menu.jsx             # menu em escada + barra de ajuda
   ├─ Hud.jsx              # calendário + legendas de botão + toggles
   ├─ ArcanaCard.jsx
   ├─ ContentPanel.jsx
   └─ sections/            # STATS · PERSONA · QUEST · SOCIAL LINK · SYSTEM
```

## 🚀 Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run lint     # ESLint
npm run build    # build de produção em dist/
npm run preview  # serve o build de produção
```

## ✍️ Atualizando o conteúdo

1. Troque os PDFs em [`public/`](public/) (`curriculo-lucas-melare-pt.pdf` e
   `resume-lucas-melare-en.pdf`).
2. Ajuste os textos em [`src/data/content.js`](src/data/content.js), nos dois idiomas.

Nenhum componente precisa ser tocado: todo o conteúdo vem desse arquivo.
