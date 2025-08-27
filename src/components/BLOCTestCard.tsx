import React, { useState, useEffect } from 'react';
import { BLOCTestDefinition } from '../data/blocTests';
import '../styles/BLOCTestCard.css';

interface BLOCTestCardProps {
  test: BLOCTestDefinition;
  onSaveResult: (testId: string, scores: any) => void;
  savedScores?: any;
}

const BLOCTestCard: React.FC<BLOCTestCardProps> = ({ test, onSaveResult, savedScores }) => {
  const [expanded, setExpanded] = useState(false);
  const [scores, setScores] = useState<any>({});

  useEffect(() => {
    if (savedScores) {
      setScores(savedScores);
    }
  }, [savedScores]);

  const handleScoreChange = (field: string, value: string, index?: number) => {
    const numValue = value === '' ? '' : parseFloat(value);
    
    let newScores = { ...scores };
    
    if (test.id === 'achterwaarts_balanceren') {
      if (!newScores[field]) newScores[field] = [0, 0, 0];
      if (index !== undefined) {
        newScores[field][index] = numValue === '' ? 0 : Math.min(8, Math.max(0, numValue));
      }
    } else {
      newScores[field] = numValue;
    }
    
    setScores(newScores);
  };

  const handleSave = () => {
    onSaveResult(test.id, scores);
    setExpanded(false);
  };

  const renderScoreInputs = () => {
    switch (test.id) {
      case 'achterwaarts_balanceren':
        return (
          <div className="balanceren-grid">
            {['balk3cm', 'balk45cm', 'balk6cm'].map((balk, balkIndex) => (
              <div key={balk} className="balk-section">
                <h4>{balk === 'balk3cm' ? '3 cm balk' : balk === 'balk45cm' ? '4.5 cm balk' : '6 cm balk'}</h4>
                <div className="pogingen-row">
                  {[0, 1, 2].map((pogingIndex) => (
                    <div key={pogingIndex} className="poging-input">
                      <label>Poging {pogingIndex + 1}</label>
                      <input
                        type="number"
                        min="0"
                        max="8"
                        value={scores[balk]?.[pogingIndex] || ''}
                        onChange={(e) => handleScoreChange(balk, e.target.value, pogingIndex)}
                        placeholder="0-8"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'zijwaarts_verplaatsen':
      case 'zijwaarts_springen':
        return (
          <div className="pogingen-container">
            <div className="score-input-group">
              <label>Poging 1:</label>
              <input
                type="number"
                min="0"
                value={scores.poging1 || ''}
                onChange={(e) => handleScoreChange('poging1', e.target.value)}
                placeholder="Aantal"
              />
            </div>
            <div className="score-input-group">
              <label>Poging 2:</label>
              <input
                type="number"
                min="0"
                value={scores.poging2 || ''}
                onChange={(e) => handleScoreChange('poging2', e.target.value)}
                placeholder="Aantal"
              />
            </div>
          </div>
        );

      case 'oog_hand_coordinatie':
        return (
          <div className="pogingen-container">
            <div className="score-input-group">
              <label>Poging 1 (30 sec):</label>
              <input
                type="number"
                min="0"
                value={scores.poging1 || ''}
                onChange={(e) => handleScoreChange('poging1', e.target.value)}
                placeholder="Aantal gevangen"
              />
            </div>
            <div className="score-input-group">
              <label>Poging 2 (30 sec):</label>
              <input
                type="number"
                min="0"
                value={scores.poging2 || ''}
                onChange={(e) => handleScoreChange('poging2', e.target.value)}
                placeholder="Aantal gevangen"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getTotalScore = () => {
    switch (test.id) {
      case 'achterwaarts_balanceren':
        const balken = ['balk3cm', 'balk45cm', 'balk6cm'];
        return balken.reduce((total, balk) => {
          const balkScores = scores[balk] || [0, 0, 0];
          return total + balkScores.reduce((sum: number, s: number) => sum + (s || 0), 0);
        }, 0);
      
      case 'zijwaarts_verplaatsen':
      case 'zijwaarts_springen':
      case 'oog_hand_coordinatie':
        const p1 = scores.poging1 || 0;
        const p2 = scores.poging2 || 0;
        return Math.max(p1, p2);
      
      default:
        return 0;
    }
  };

  const hasScores = () => {
    return Object.keys(scores).length > 0 && 
           Object.values(scores).some(v => v !== null && v !== undefined && v !== '' && v !== 0);
  };

  return (
    <div className={`test-card ${expanded ? 'expanded' : ''}`}>
      <div className="test-header" onClick={() => setExpanded(!expanded)}>
        <h3>{test.naam}</h3>
        <div className="test-meta">
          <span className="categorie-badge">{test.categorie}</span>
          {hasScores() && <span className="score-badge">Score: {getTotalScore()}</span>}
          <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
        </div>
      </div>

      {expanded && (
        <div className="test-content">
          {test.videoUrl && (
            <div className="video-container">
              <iframe
                src={test.videoUrl}
                title={`Instructievideo ${test.naam}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="instructie-section">
            <h4>Instructie</h4>
            <pre>{test.instructie}</pre>
          </div>

          <div className="score-section">
            <h4>Scores invoeren</h4>
            {renderScoreInputs()}
          </div>

          <div className="action-buttons">
            <button onClick={handleSave} className="save-button">
              Scores Opslaan
            </button>
            <button onClick={() => setExpanded(false)} className="cancel-button">
              Annuleren
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BLOCTestCard;