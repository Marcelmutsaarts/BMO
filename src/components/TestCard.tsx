import React, { useState, useEffect } from 'react';
import { useTestContext } from '../context/TestContext';
import { TestDefinition, evalueerScore } from '../data/testBenchmarks';
import '../styles/TestComponents.css';

interface TestCardProps {
  test: TestDefinition;
}

export default function TestCard({ test }: TestCardProps) {
  const { userData, addTestResult, getTestResult } = useTestContext();
  const [score, setScore] = useState<string>('');
  const [evaluatie, setEvaluatie] = useState<{ label: string; color: string; feedback: string } | null>(null);
  const existingResult = getTestResult(test.id);

  useEffect(() => {
    if (existingResult) {
      setScore(existingResult.score.toString());
      if (userData.geslacht) {
        const evaluatieResult = evalueerScore(test.id, existingResult.score, userData.geslacht);
        setEvaluatie(evaluatieResult);
      }
    }
  }, [existingResult, test.id, userData.geslacht]);

  const handleScoreSubmit = () => {
    if (!userData.geslacht || !score) return;
    
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return;

    const evaluatieResult = evalueerScore(test.id, numScore, userData.geslacht);
    setEvaluatie(evaluatieResult);
    
    addTestResult({
      testId: test.id,
      score: numScore,
      datum: new Date(),
      evaluatie: evaluatieResult.label
    });
  };

  const getBenchmarkBar = () => {
    if (!userData.geslacht || !evaluatie) return null;
    
    const benchmarks = test.benchmarks[userData.geslacht];
    const relevantBenchmarks = benchmarks.filter(b => 
      b.min > -100 && b.max < 100
    );

    return (
      <div className="benchmark-visual">
        <div className="benchmark-labels">
          <span>Slecht</span>
          <span>Gemiddeld</span>
          <span>Uitstekend</span>
        </div>
        <div className="benchmark-bar">
          <div className="benchmark-segments">
            {relevantBenchmarks.reverse().map((benchmark, index) => (
              <div
                key={index}
                className="benchmark-segment"
                style={{ backgroundColor: benchmark.color }}
              />
            ))}
          </div>
          {score && (
            <div 
              className="score-marker"
              style={{
                left: (() => {
                  const numScore = parseFloat(score);
                  switch(test.id) {
                    case 'lenigheid':
                      return `${Math.max(0, Math.min(100, ((numScore + 30) / 60) * 100))}%`;
                    case 'behendigheid':
                      return `${Math.max(0, Math.min(100, 100 - ((numScore - 8) / 8) * 100))}%`;
                    case 'snelheid':
                      return `${Math.max(0, Math.min(100, 100 - ((numScore - 8) / 6) * 100))}%`;
                    case 'kracht':
                      return `${Math.max(0, Math.min(100, (numScore / 50) * 100))}%`;
                    default: // uithoudingsvermogen
                      return `${Math.max(0, Math.min(100, (numScore / 15) * 100))}%`;
                  }
                })()
              }}
            >
              <div className="score-value">
                {score} {test.eenheid}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="test-card">
      <div className="test-header">
        <div className="test-info">
          <h3 className="test-title">{test.naam}</h3>
          <span className="test-category">
            {test.categorie}
          </span>
        </div>
        {test.afbeelding && (
          <img 
            src={test.afbeelding} 
            alt={test.naam}
            className="test-image"
          />
        )}
      </div>

      <div className="test-instructie">
        <h4 className="instructie-titel">Instructie</h4>
        <p className="instructie-tekst">{test.instructie}</p>
      </div>

      <div className="score-input-container">
        <label className="score-label">
          Score ({test.eenheid})
        </label>
        <div className="score-input-group">
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="score-input"
            placeholder="Voer je score in"
            disabled={!userData.geslacht}
          />
          <button
            onClick={handleScoreSubmit}
            disabled={!userData.geslacht || !score}
            className="evalueer-button"
          >
            Evalueer
          </button>
        </div>
        {!userData.geslacht && (
          <p className="warning-text">
            Selecteer eerst je geslacht bovenaan de pagina
          </p>
        )}
      </div>

      {evaluatie && (
        <>
          <div 
            className="evaluatie-result" 
            style={{ 
              backgroundColor: `${evaluatie.color}15`,
              borderColor: evaluatie.color,
              color: evaluatie.color
            }}
          >
            <div className="evaluatie-header">
              <span className="evaluatie-label">
                {evaluatie.label}
              </span>
              {existingResult && (
                <span className="evaluatie-datum">
                  Laatste update: {new Date(existingResult.datum).toLocaleDateString('nl-NL')}
                </span>
              )}
            </div>
            <p className="evaluatie-feedback">{evaluatie.feedback}</p>
          </div>
          {getBenchmarkBar()}
        </>
      )}
    </div>
  );
}