import React from "react";

export default function AuthIllustration() {
  return (
    <div style={{ width: "100%", maxWidth: "420px", margin: "0 auto" }}>
      <svg
        viewBox="0 0 500 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#F0F4FF" />
          </linearGradient>
          <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DCE8FF" />
            <stop offset="100%" stopColor="#C4DAFE" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="penGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF4B72" />
            <stop offset="100%" stopColor="#D92850" />
          </linearGradient>
        </defs>

        {/* Background decorative organic leaf & water droplet shapes */}
        <path
          d="M60 220C40 180 50 120 90 90C130 60 170 90 190 130C210 170 180 230 140 250C100 270 80 260 60 220Z"
          fill="url(#blobGrad)"
          opacity="0.6"
        />
        <path
          d="M380 180C420 150 460 190 470 240C480 290 440 330 390 340C340 350 320 300 330 250C340 200 340 210 380 180Z"
          fill="url(#blobGrad)"
          opacity="0.5"
        />

        {/* Small floating decorative stars / pluses */}
        <circle cx="140" cy="70" r="5" fill="#3B82F6" opacity="0.8" />
        <rect x="135" y="245" width="8" height="8" rx="2" fill="#2563EB" transform="rotate(45 135 245)" />
        <rect x="360" y="80" width="10" height="10" rx="3" fill="#2563EB" transform="rotate(45 360 80)" />

        {/* Monitor Screen Frame */}
        <rect
          x="70"
          y="110"
          width="360"
          height="240"
          rx="12"
          fill="#ffffff"
          stroke="#D1D5DB"
          strokeWidth="3.5"
        />
        {/* Monitor Inner Screen */}
        <rect x="80" y="120" width="340" height="205" rx="8" fill="url(#screenGrad)" />

        {/* Monitor Stand */}
        <path d="M220 350 L280 350 L275 390 L225 390 Z" fill="#93C5FD" />
        <rect x="170" y="388" width="160" height="10" rx="5" fill="#2563EB" />

        {/* Clipboard / Tablet / Document */}
        <g transform="translate(190, 140) rotate(-10)">
          <rect
            x="0"
            y="0"
            width="170"
            height="180"
            rx="12"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="2"
          />
          {/* Badge / Graphic inside tablet */}
          <circle cx="115" cy="120" r="28" fill="#FF5252" />
          <path d="M95 110 L135 110 M95 120 L135 120 M95 130 L135 130" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Hand 1 holding tablet / paper from left */}
        <path
          d="M70 230 C100 220 150 205 175 220 C185 226 195 245 185 255 C170 265 140 260 115 270 C95 278 70 290 70 290 Z"
          fill="#FDE0D7"
          stroke="#F87171"
          strokeWidth="2"
        />
        {/* Sleeve of Hand 1 */}
        <path
          d="M40 235 L90 225 L85 295 L35 285 Z"
          fill="url(#accentGrad)"
          rx="6"
        />

        {/* Hand 2 writing with pen from top right */}
        <path
          d="M335 120 C325 150 310 185 285 205 C275 212 255 205 250 195 C245 180 260 160 275 145 C290 130 320 100 320 100 Z"
          fill="#FDE0D7"
          stroke="#F87171"
          strokeWidth="2"
        />
        {/* Pen in hand */}
        <g transform="translate(230, 75) rotate(42)">
          <rect x="0" y="0" width="16" height="150" rx="4" fill="url(#penGrad)" />
          <circle cx="8" cy="20" r="3" fill="#ffffff" />
          <circle cx="8" cy="45" r="3" fill="#ffffff" />
          <circle cx="8" cy="70" r="3" fill="#ffffff" />
          <polygon points="0,150 16,150 8,175" fill="#333333" />
          <polygon points="6,170 10,170 8,178" fill="#111111" />
        </g>
      </svg>
    </div>
  );
}
