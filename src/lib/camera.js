/**
 * "Câmera" da cena de fundo. Na capa ela está aproximada e virada para a direita;
 * ao começar, recua (zoom out) e gira para a esquerda até o enquadramento do menu.
 *
 * A lua acompanha com uma transição CSS de mesma duração e curva (ver `.moon` no
 * index.css) — mantenha os dois em sincronia.
 */
export const CAMERA_EASE = [0.6, 0, 0.15, 1];
export const CAMERA_DURATION = 1.6;

export const CAMERA = {
  title: { scale: 1.3, x: '-7%', rotateY: -12 },
  menu: { scale: 1, x: '0%', rotateY: 0 },
};
