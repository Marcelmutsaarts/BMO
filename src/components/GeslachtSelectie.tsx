import React from 'react';
import { useTestContext } from '../context/TestContext';
import '../styles/TestComponents.css';

export default function GeslachtSelectie() {
  const { userData, setGeslacht } = useTestContext();

  if (userData.geslacht) {
    return (
      <div className="geslacht-selectie-container">
        <div className="geslacht-info">
          <p className="geslacht-info-text">
            Geslacht: <span>{userData.geslacht === 'man' ? 'Man' : 'Vrouw'}</span>
          </p>
          <button
            onClick={() => setGeslacht(userData.geslacht === 'man' ? 'vrouw' : 'man')}
            className="wijzig-button"
          >
            Wijzig geslacht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="geslacht-selectie-container">
      <div className="geslacht-keuze">
        <h3>Selecteer je geslacht voor de juiste benchmarks:</h3>
        <div className="geslacht-buttons">
          <button
            onClick={() => setGeslacht('man')}
            className="geslacht-button man"
          >
            Man
          </button>
          <button
            onClick={() => setGeslacht('vrouw')}
            className="geslacht-button vrouw"
          >
            Vrouw
          </button>
        </div>
      </div>
    </div>
  );
}