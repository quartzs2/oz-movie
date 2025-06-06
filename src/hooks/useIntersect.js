import { useCallback, useEffect, useRef } from "react";

const useIntersect = ({ onIntersect, options }) => {
  const ref = useRef(null);
  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer);
        }
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return ref;
};

export default useIntersect;
