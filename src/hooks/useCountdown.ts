import { useEffect, useState, useMemo } from 'react';

export const useCountdown = () => {
  const [countdown, setCountdown] = useState(60 * 60); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
  };
};
