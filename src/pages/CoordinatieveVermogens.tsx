import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

const CoordinatieveVermogens: React.FC = () => {
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
    </div>
  );
};

export default CoordinatieveVermogens;