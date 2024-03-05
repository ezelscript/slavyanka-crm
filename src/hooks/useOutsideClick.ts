import { useRef, useEffect } from "react";

function useOutsideClick<T extends HTMLElement>(
  closeFn: () => void,
  isImmediate = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isImmediate) return;

    document.onpointerdown = (e) => {
      if (ref.current && !ref.current.contains(e.target as Node)) closeFn();
    };

    return () => {
      document.onpointerdown = null;
    };
  }, [closeFn, isImmediate]);

  return ref;
}

export default useOutsideClick;
