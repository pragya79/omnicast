import { useState, useEffect } from "react";
import "./circle.css";

const Circle = ({ initialProgress = 4 }) => {
  const [progress, setProgress] = useState(initialProgress); // Dynamic initial progress

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 0)); // Increment progress
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const strokeDasharray = 472; // Full circle
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progress) / 100; // Dynamic offset

  return (
    <div className="progress">
      <div className="outer">
        <div className="inner">
          <div id="number">{progress}</div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="160px" height="160px">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#D8F9CC" />
            <stop offset="100%" stopColor="lightgreen" />
          </linearGradient>
        </defs>
        <circle
          cx="80"
          cy="80"
          r="70"
          strokeLinecap="round"
          stroke="url(#GradientColor)"
          strokeWidth="20"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset} // Dynamic progress
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
    </div>
  );
};

export default Circle;
