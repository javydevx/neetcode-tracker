import { useEffect, useState } from 'react';

const CircularProgress = ({ value = 0, size = 120, strokeWidth = 8 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress on mount
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="circular-progress"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="circular-progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle - Orange accent */}
        <circle
          className="circular-progress-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 161, 22, 0.4))',
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-lc-text-primary font-mono">
          {Math.round(progress)}%
        </span>
        <span className="text-xs text-lc-text-tertiary">Complete</span>
      </div>
    </div>
  );
};

export default CircularProgress;
