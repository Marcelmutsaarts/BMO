import React from 'react';
import { fysiekeTesten } from '../data/testBenchmarks';
import '../styles/TestComponents.css';

interface TestSelectorProps {
  selectedTestId: string | null;
  onSelectTest: (testId: string) => void;
}

export default function TestSelector({ selectedTestId, onSelectTest }: TestSelectorProps) {
  return (
    <div className="test-selector-container">
      <h3 className="test-selector-title">Kies een test om te starten:</h3>
      <div className="test-selector-grid">
        {fysiekeTesten.map(test => (
          <button
            key={test.id}
            onClick={() => onSelectTest(test.id)}
            className={`test-selector-card ${selectedTestId === test.id ? 'selected' : ''}`}
          >
            <div className="test-selector-icon">
              {test.id === 'lenigheid' && '🤸‍♀️'}
              {test.id === 'uithoudingsvermogen' && '🏃‍♂️'}
              {test.id === 'behendigheid' && '🤹‍♀️'}
              {test.id === 'kracht' && '💪'}
              {test.id === 'snelheid' && '⚡'}
            </div>
            <h4 className="test-selector-name">{test.naam}</h4>
            <span className="test-selector-category">{test.categorie}</span>
            <div className="test-selector-unit">
              Meeteenheid: {test.eenheid}
            </div>
            {selectedTestId === test.id && (
              <div className="test-selector-selected-badge">
                Geselecteerd ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}