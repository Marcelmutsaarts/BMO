import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTestContext } from '../context/TestContext';
import BLOCTestCard from '../components/BLOCTestCard';
import { blocTesten } from '../data/blocTests';
import '../styles/Pages.css';

const CoordinatieveVermogens: React.FC = () => {
  const [showBLOCTests, setShowBLOCTests] = useState(false);
  const { addBLOCResult, getBLOCResult } = useTestContext();
  const vermogens = [
    {
      naam: 'Koppelingsvermogen',
      beschrijving: 'Het in tijd en ruimte vloeiend kunnen koppelen van bewegingen van eigen lichaamsdelen die tegelijkertijd of na elkaar plaatsvinden.'
    },
    {
      naam: 'Ruimtelijk oriëntatievermogen',
      beschrijving: 'Het snel en adequaat veranderen van eigen positie en bewegingen in de ruimte ten opzichte van de externe omgeving.'
    },
    {
      naam: 'Evenwichtsvermogen',
      beschrijving: 'Het kunnen verkrijgen of behouden van balans bij snelle en onverwachte veranderingen in lichaamshouding.'
    },
    {
      naam: 'Ritmisch vermogen',
      beschrijving: 'Het afstemmen van eigen bewegen op een (extern) ritme of het vinden van een optimaal en effectief intern ritme.'
    },
    {
      naam: 'Kinetisch differentiatievermogen',
      beschrijving: 'Het nauwkeurig kunnen afstemmen van de snelheid en richting van eigen (deel)bewegingen of voorwerpen op de (veranderende) omgeving.'
    },
    {
      naam: '(Complex) reactievermogen',
      beschrijving: 'Het snel kunnen reageren op een of meerdere prikkels of situatieveranderingen uit de omgeving om tot de meest succesvolle bewegingsuitvoering te komen.'
    }
  ];

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Terug naar hoofdmenu</Link>
      
      <header className="page-header">
        <h1>Coördinatieve Vermogens</h1>
        <p>De vermogens om gecoördineerd te kunnen bewegen.</p>
      </header>

      <div className="abilities-container">
        {vermogens.map((vermogen, index) => (
          <div key={index} className="ability-card">
            <h2>{vermogen.naam}</h2>
            <p>{vermogen.beschrijving}</p>
          </div>
        ))}
      </div>

      <div className="bloc-test-section">
        <button
          onClick={() => setShowBLOCTests(!showBLOCTests)}
          className="toggle-button bloc-button"
        >
          {showBLOCTests ? '▼' : '▶'} BLOC Test - Test je coördinatieve vermogens
        </button>

        {showBLOCTests && (
          <div className="bloc-tests-container">
            <div className="bloc-intro">
              <h2>BLOC Test</h2>
              <p>De BLOC test meet verschillende aspecten van coördinatieve vermogens door middel van 4 onderdelen:</p>
              <ul>
                <li><strong>Achterwaarts Balanceren</strong> - Test je evenwichtsvermogen</li>
                <li><strong>Zijwaarts Verplaatsen</strong> - Meet je coördinatievermogen</li>
                <li><strong>Zijwaarts Springen</strong> - Test je behendigheid en ritme</li>
                <li><strong>Oog-Hand Coördinatie</strong> - Meet je reactie- en differentiatievermogen</li>
              </ul>
            </div>

            <div className="bloc-test-cards">
              {blocTesten.map(test => (
                <BLOCTestCard
                  key={test.id}
                  test={test}
                  onSaveResult={addBLOCResult}
                  savedScores={getBLOCResult(test.id)?.scores}
                />
              ))}
            </div>

            <div className="bloc-summary">
              <h3>Testresultaten</h3>
              <p>Voer alle 4 de testen uit voor een complete evaluatie van je coördinatieve vermogens.</p>
              <p className="note">Benchmarks volgen later - scores worden lokaal opgeslagen.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinatieveVermogens;