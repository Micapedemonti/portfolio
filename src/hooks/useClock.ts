import { useEffect, useState } from 'react';

/** Hora actual (HH:mm) en una zona horaria, actualizada cada 30 s. */
export function useClock(timeZone: string): string {
  const [formatter] = useState(
    () => new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone }),
  );
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 30_000);
    return () => window.clearInterval(id);
  }, [formatter]);

  return time;
}
