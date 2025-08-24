import React from 'react';

const AnimatedIcon = () => (
  <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <style>
      {`
        .path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 5s linear infinite;
        }
        @keyframes dash {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .pulse {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(0.95); }
            70% { transform: scale(1.05); }
            100% { transform: scale(0.95); }
        }
      `}
</style>
    <g transform="translate(50, 50)">
      <path className="path" d="M -20 0 L 20 0 L 10 -15 M 20 0 L 10 15" stroke="#FF6F00" strokeWidth="2" fill="none" />
      <circle className="pulse" cx="-35" cy="0" r="8" fill="#FF6F00" />
      <circle cx="35" cy="0" r="8" fill="#000000" />
    </g>
  </svg>
);

export default AnimatedIcon;
  
