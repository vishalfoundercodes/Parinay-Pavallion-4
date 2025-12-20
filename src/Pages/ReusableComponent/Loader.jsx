import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 mt-24 flex flex-col items-center justify-center bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900">
      {/* Decorative corner patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold-400">
          <path d="M0,0 Q50,0 50,50 Q0,50 0,0" fill="currentColor" />
          <circle
            cx="25"
            cy="25"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="25"
            cy="25"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold-400">
          <path d="M0,0 Q50,0 50,50 Q0,50 0,0" fill="currentColor" />
          <circle
            cx="25"
            cy="25"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="25"
            cy="25"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 -rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold-400">
          <path d="M0,0 Q50,0 50,50 Q0,50 0,0" fill="currentColor" />
          <circle
            cx="25"
            cy="25"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="25"
            cy="25"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold-400">
          <path d="M0,0 Q50,0 50,50 Q0,50 0,0" fill="currentColor" />
          <circle
            cx="25"
            cy="25"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="25"
            cy="25"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Main loader container */}
      <div className="relative flex flex-col items-center">
        {/* Mandala spinner */}
        <div className="relative w-40 h-40 mb-8">
          {/* Outer rotating ring */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "8s" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              {[...Array(12)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 30} 50 50)`}>
                  <path d="M50,5 L52,15 L48,15 Z" fill="hsl(43, 74%, 49%)" />
                </g>
              ))}
              <defs>
                <linearGradient
                  id="goldGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(43, 74%, 49%)" />
                  <stop offset="50%" stopColor="hsl(43, 74%, 65%)" />
                  <stop offset="100%" stopColor="hsl(43, 74%, 49%)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Middle counter-rotating ring */}
          <div
            className="absolute inset-4 animate-spin"
            style={{ animationDuration: "6s", animationDirection: "reverse" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(43, 74%, 49%)"
                strokeWidth="0.5"
              />
              {[...Array(8)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 45} 50 50)`}>
                  <ellipse
                    cx="50"
                    cy="10"
                    rx="3"
                    ry="6"
                    fill="none"
                    stroke="hsl(43, 74%, 49%)"
                    strokeWidth="0.5"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Inner rotating mandala */}
          <div
            className="absolute inset-8 animate-spin"
            style={{ animationDuration: "4s" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {[...Array(6)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 60} 50 50)`}>
                  <path
                    d="M50,20 Q60,35 50,50 Q40,35 50,20"
                    fill="none"
                    stroke="hsl(43, 74%, 49%)"
                    strokeWidth="1"
                  />
                </g>
              ))}
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="hsl(43, 74%, 49%)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Center pulsing circle with wedding rings icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-16 h-16 animate-pulse"
              style={{ animationDuration: "2s" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Two interlocking wedding rings */}
                <circle
                  cx="38"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="hsl(43, 74%, 49%)"
                  strokeWidth="3"
                />
                <circle
                  cx="62"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="hsl(43, 74%, 65%)"
                  strokeWidth="3"
                />
                {/* Small diamond on top */}
                <path
                  d="M50,25 L55,32 L50,40 L45,32 Z"
                  fill="hsl(43, 74%, 49%)"
                />
              </svg>
            </div>
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gold-400/60"
              style={{
                top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 30}%`,
                left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 40}%`,
                animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Brand text */}
        <div className="text-center">
          <h1
            className="font-display text-3xl md:text-4xl text-gold-400 mb-2 animate-pulse"
            style={{ animationDuration: "3s" }}
          >
            Parinay Pavilion
          </h1>
          <p className="text-cream-100/70 font-body text-sm tracking-[0.3em] uppercase">
            Where Dreams Unite
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gold-400"
              style={{
                animation: "bounce 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated bottom decorative line */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64">
        <div
          className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-pulse"
          style={{ animationDuration: "2s" }}
        />
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-1 h-1 rounded-full bg-gold-400/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          <div className="w-1 h-1 rounded-full bg-gold-400/50" />
        </div>
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
