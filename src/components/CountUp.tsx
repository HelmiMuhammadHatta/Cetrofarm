import { useEffect, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ end, suffix = "", duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(end);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (inView && !hasAnimated) {
      setCount(0);
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setHasAnimated(true);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [end, duration, inView, shouldReduceMotion, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
