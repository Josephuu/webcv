import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useStaggeredReveal<T extends HTMLElement = HTMLDivElement>(
  _itemCount: number,
  baseDelay: number = 100,
  options: UseScrollRevealOptions = {}
) {
  const { ref, isVisible } = useScrollReveal<T>(options);

  const getDelay = (index: number) => {
    return isVisible ? index * baseDelay : 0;
  };

  const getStyle = (index: number) => ({
    animationDelay: `${getDelay(index)}ms`,
    opacity: isVisible ? 1 : 0,
  });

  return { ref, isVisible, getDelay, getStyle };
}
