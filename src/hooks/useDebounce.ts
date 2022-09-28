import { useRef } from "react";

const useDebounce = () => {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>();

  const setTimer = (callback: () => void, delay: number) => {
    return setTimeout(callback, delay);
  };

  const resetTimer = (callback: () => void, delay: number) => {
    if (!timer.current) {
      timer.current = setTimer(callback, delay);
    } else {
      clearTimeout(timer.current);

      timer.current = setTimer(callback, delay);
    }
  };
  return { resetTimer };
};

export default useDebounce;
