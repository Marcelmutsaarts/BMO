import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

const FundamenteleBeweegvaardigheden: React.FC = () => {
  const locomotie = [
    'Lopen', 'Rennen', 'Hinken', 'Huppen', 'Springen',
    'Rollen', 'Galopperen', 'Klimmen', 'Glijden', 'Skippen'
  ];

  const manipulatie = [
    'Vangen', 'Duwen', 'Trekken', 'Dribbelen', 'Dragen',
    'Stuiten', 'Grijpen', 'Werpen', 'Trappen', 'Slaan'
  ];

  const stabilisatie = [
    'Keren', 'Wenden', 'Buigen', 'Landen', 'Hangen',
    'Draaien', 'Strekken', 'Reiken', 'Trekken'
  ];

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Terug naar hoofdmenu</Link>
      
      <header className="page-header">
        <h1>Fundamentele Beweegvaardigheden</h1>
        <p>De basisbewegingen die kinderen moeten leren om complexere bewegingen te kunnen maken en klaar te zijn om sporten te beoefenen.</p>
      </header>

      <div className="categories-container">
        <div className="category-card locomotie">
          <h2>Locomotie</h2>
          <p className="category-description">Bewegingen waarbij het lichaam zich verplaatst</p>
          <div className="skills-grid">
            {locomotie.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>

        <div className="category-card manipulatie">
          <h2>Manipulatie</h2>
          <p className="category-description">Bewegingen waarbij objecten worden gemanipuleerd</p>
          <div className="skills-grid">
            {manipulatie.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>

        <div className="category-card stabilisatie">
          <h2>Stabilisatie</h2>
          <p className="category-description">Bewegingen voor balans en lichaamscontrole</p>
          <div className="skills-grid">
            {stabilisatie.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamenteleBeweegvaardigheden;