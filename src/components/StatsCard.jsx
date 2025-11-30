import { useEffect, useState, useRef } from 'react';

// Animated counter hook
const useAnimatedCounter = (end, duration = 800) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    // Parse end value - handle "X/Y" format
    let targetValue = typeof end === 'string' && end.includes('/')
      ? parseInt(end.split('/')[0])
      : parseInt(end) || 0;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.round(easeOutQuart * targetValue);
      setCount(countRef.current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    // Reset and start animation
    startTimeRef.current = null;
    countRef.current = 0;
    setCount(0);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration]);

  return count;
};

const StatsCard = ({ color, value, label }) => {
  const animatedValue = useAnimatedCounter(value, 800);

  // Format display value
  const displayValue = typeof value === 'string' && value.includes('/')
    ? `${animatedValue}/${value.split('/')[1]}`
    : animatedValue;

  return (
    <div className={`stat-card ${color} group fade-in-up`}>
      <div className="stat-number">
        {displayValue}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  );
};

export default StatsCard;
