import React, { useState } from 'react';
import '../styles/VideoPlayer.css';

interface VideoPlayerProps {
  title?: string;
  description?: string;
}

export default function VideoPlayer({ 
  title = "Protocol Uitleg", 
  description = "Bekijk de video voor uitgebreide instructies over het testprotocol"
}: VideoPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="video-player-container">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="video-toggle"
        aria-expanded={isExpanded}
      >
        <span className="video-toggle-icon">{isExpanded ? '▼' : '▶'}</span>
        <div className="video-toggle-content">
          <h3 className="video-title">🎥 {title}</h3>
          <p className="video-description">{description}</p>
        </div>
        {!isExpanded && (
          <span className="video-badge">Klik om video te bekijken</span>
        )}
      </button>

      {isExpanded && (
        <div className="video-content">
          {hasError ? (
            <div className="video-error">
              <span className="error-icon">⚠️</span>
              <p>Video kon niet worden geladen</p>
              <small>De video is mogelijk niet beschikbaar of er is een netwerkprobleem.</small>
            </div>
          ) : (
            <div className="video-wrapper">
              <video
                controls
                preload="metadata"
                className="video-element"
                onError={handleError}
                playsInline
                controlsList="nodownload"
              >
                <source 
                  src="/videos/Movement_Conditions_Test.mp4" 
                  type="video/mp4" 
                />
                <p className="video-fallback">
                  Je browser ondersteunt geen HTML5 video. 
                  <a href="/videos/Movement_Conditions_Test.mp4" download>
                    Download de video
                  </a> om deze offline te bekijken.
                </p>
              </video>
            </div>
          )}

          <div className="video-info">
            <div className="info-card">
              <h4>📋 Belangrijke punten uit de video:</h4>
              <ul>
                <li>Zorg voor de juiste opstelling van materialen</li>
                <li>Volg de exacte instructies voor elke test</li>
                <li>Noteer scores direct na uitvoering</li>
                <li>Herhaal testen indien nodig voor betrouwbare resultaten</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}