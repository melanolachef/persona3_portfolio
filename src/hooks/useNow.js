import { useEffect, useState } from 'react';

/** Data/hora atual, atualizada na virada de cada minuto. */
export function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Alinha o primeiro tick com a virada do minuto para o relógio não atrasar.
    let interval;
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return now;
}
