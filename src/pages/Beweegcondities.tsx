import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTestContext } from '../context/TestContext';
import GeslachtSelectie from '../components/GeslachtSelectie';
import TestCard from '../components/TestCard';
import TestSelector from '../components/TestSelector';
import { fysiekeTesten } from '../data/testBenchmarks';
import '../styles/Pages.css';

const Beweegcondities: React.FC = () => {
  const [showTesten, setShowTesten] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const { userData } = useTestContext();
  
  const condities = [
    {
      naam: 'Kracht',
      beschrijving: 'Het vermogen van spieren om kracht te leveren tegen weerstand'
    },
    {
      naam: 'Lenigheid',
      beschrijving: 'De bewegingsmogelijkheid van gewrichten en spieren'
    },
    {
      naam: 'Stabiliteit',
      beschrijving: 'Het vermogen om het lichaam in balans te houden'
    },
    {
      naam: 'Uithoudingsvermogen',
      beschrijving: 'Het vermogen om langdurig fysieke inspanning te leveren'
    },
    {
      naam: 'Behendigheid',
      beschrijving: 'Het vermogen om snel en accuraat te bewegen'
    }
  ];


  const getOverallFeedback = () => {
    if (!userData.testResultaten.length) return null;
    
    const scores = userData.testResultaten.map(r => {
      const labels = ['Erg slecht', 'Slecht', 'Onder gemiddeld', 'Gemiddeld', 'Boven gemiddeld', 'Erg goed', 'Uitstekend'];
      return labels.indexOf(r.evaluatie);
    });
    
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    if (avg >= 5) return { text: 'Uitstekende algemene conditie!', color: 'green' };
    if (avg >= 3) return { text: 'Goede algemene conditie, met ruimte voor verbetering.', color: 'blue' };
    return { text: 'Je conditie heeft aandacht nodig. Begin met een gestructureerd trainingsprogramma.', color: 'orange' };
  };

  const overallFeedback = getOverallFeedback();

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Terug naar hoofdmenu</Link>
      
      <header className="page-header">
        <h1>Beweegcondities</h1>
        <p>Wat het lichaam moet kunnen om te bewegen zonder belemmering.</p>
      </header>

      <div className="conditions-container">
        {condities.map((conditie, index) => (
          <div key={index} className="condition-card">
            <h2>{conditie.naam}</h2>
            <p>{conditie.beschrijving}</p>
          </div>
        ))}
      </div>

      <div className="test-section">
        <button
          onClick={() => setShowTesten(!showTesten)}
          className="toggle-button"
        >
          {showTesten ? '▼' : '▶'} Test je beweegcondities
        </button>

        {showTesten && (
          <div className="tests-container">
            <GeslachtSelectie />

            <TestSelector 
              selectedTestId={selectedTestId}
              onSelectTest={setSelectedTestId}
            />

            {selectedTestId && (
              <div className="test-cards">
                {fysiekeTesten
                  .filter(test => test.id === selectedTestId)
                  .map(test => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            )}

            {overallFeedback && userData.testResultaten.length > 0 && (
              <div className="overall-feedback">
                <h2>Algemene evaluatie</h2>
                <p className="feedback-text" style={{ color: overallFeedback.color }}>
                  {overallFeedback.text}
                </p>
                <div className="test-count">
                  Aantal uitgevoerde testen: {userData.testResultaten.length}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Beweegcondities;