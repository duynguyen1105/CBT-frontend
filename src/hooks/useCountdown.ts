import { useEffect, useState, useMemo } from 'react';

let timer: ReturnType<typeof setInterval>;

export const useCountdown = (duration: number, expired: boolean) => {
  const [countdown, setCountdown] = useState(duration * 60); // 1 hour in seconds

  useEffect(() => {
    if (expired || countdown <= 0) {
      clearInterval(timer);
      setCountdown(0);
      return;
    }
    timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const formatTime = useMemo(
    () => (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    []
  );

  return {
    time: formatTime(countdown),
    countdown,
  };
};
