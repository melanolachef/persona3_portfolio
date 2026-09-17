# 🌙 Persona 3 Portfolio | Lucas Melaré

Bem-vindo à *Dark Hour*. Este é o meu portfólio web pessoal, construído com **React** e
**Framer Motion**, fortemente inspirado na interface do jogo *Persona 3*.

A ideia é transformar um currículo tradicional em uma experiência navegável como um menu de
RPG — **STATUS**, **SKILLS**, **QUESTS** e **SYSTEM** — mantendo o conteúdo em dia com o
currículo em PDF.

🔗 **Online:** [p3-portifolio.vercel.app](https://p3-portifolio.vercel.app)

## 🎮 Funcionalidades

- **Title screen interativa** — clique ou qualquer tecla entram na Dark Hour.
- **Menu HUD inclinado** com navegação por mouse **e** por teclado (`↑` `↓`, `Enter`, `Esc`).
- **Bilíngue (PT/EN)** — o idioma segue o do navegador, pode ser trocado no HUD e fica salvo.
  Cada idioma oferece o currículo correspondente para download.
- **SFX sintetizados na Web Audio API** — hover, confirmar, cancelar e abertura são gerados
  em tempo real por osciladores, sem nenhum arquivo de áudio no repositório.
- **Ambiente da Dark Hour** — drone opcional de fundo, ligado/desligado pelo HUD.
- **Relógio do HUD** com data e hora reais; entre 00h e 01h ele vira *Dark Hour*.
- **Animações em cascata** (*staggerChildren*), *glassmorphism* e transições de painel, com
  respeito a `prefers-reduced-motion`.
- **Responsivo** de 320px a desktop, com layout controlado por CSS (media queries), não por
  medição de janela em JavaScript.

## 🛠️ Tecnologias

- [React 19](https://react.dev/) via [Vite 7](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/) — animações de interface
- [React Icons](https://react-icons.github.io/react-icons/)
- CSS puro com *custom properties* e Web Audio API
- ESLint (flat config) com os plugins de React e React Hooks

## 📁 Estrutura

```
src/
├─ App.jsx                 # orquestra estado, idioma, áudio e transições
├─ index.css               # tokens de design, layout responsivo e temas
├─ data/content.js         # TODO o conteúdo (PT/EN) — atualize aqui ao mudar o currículo
├─ lib/audio.js            # motor de SFX e ambiente (Web Audio API)
├─ hooks/useMediaQuery.js  # breakpoint e prefers-reduced-motion
└─ components/
   ├─ TitleScreen.jsx
   ├─ Menu.jsx
   ├─ Hud.jsx              # relógio + idioma + som + ambiente
   ├─ ContentPanel.jsx
   └─ sections/            # STATUS · SKILLS · QUESTS · SYSTEM
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
