import { useCallback, useSyncExternalStore } from 'react';

/**
 * Observa uma media query via `matchMedia`.
 *
 * Substitui o listener de `resize` que guardava `window.innerWidth` em estado:
 * aquele re-renderizava a árvore inteira a cada pixel arrastado, enquanto aqui o
 * render só acontece quando a query muda de resultado. `useSyncExternalStore` é a
 * API do React para fontes externas — evita o estado intermediário (e o render
 * extra) de um par useState + useEffect.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot);
}

/** Breakpoint único do layout, espelhado nas media queries do CSS. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');

/** Respeita "reduzir movimento" do sistema operacional. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
