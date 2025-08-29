import React, { useState, useEffect } from 'react';
import { useTestContext } from '../context/TestContext';
import '../styles/GrondvormenTest.css';

interface GrondvormItem {
  id: number;
  beschrijving: string;
  categorie: 'rollen' | 'slaan' | 'springen' | 'werpen' | 'klimmen' | 'balanceren' | 'balans' | 'trapeze';
  pogingen?: number;
}

const grondvormen: GrondvormItem[] = [
  { id: 1, beschrijving: 'Rollen vanuit hurkzit voorover met behulp van handen komen tot hurkzit op de turnmat', categorie: 'rollen' },
  { id: 2, beschrijving: 'Rollen vanuit hurkzit voorover zonder behulp van handen komen tot hurkzit op de turnmat', categorie: 'rollen' },
  { id: 3, beschrijving: 'Rollen vanuit hurkzit voorover zonder behulp van handen tot hurkzit op oplopende turnmat', categorie: 'rollen' },
  { id: 4, beschrijving: 'Gericht slaan van een zelf opgeworpen tennisbal met een racket over 10 meter', categorie: 'slaan', pogingen: 2 },
  { id: 5, beschrijving: 'Gericht slaan van een zelf opgeworpen tennisbal met een slagplank over 10 meter', categorie: 'slaan', pogingen: 2 },
  { id: 6, beschrijving: 'Gericht slaan met twee handen van zelf opgeworpen tennisbal met een knuppel over 10 meter', categorie: 'slaan', pogingen: 2 },
  { id: 7, beschrijving: 'Springen van blok in trampoline met stabiele landing op het blok met ¼ draai in de hoepel', categorie: 'springen', pogingen: 2 },
  { id: 8, beschrijving: 'Springen van blok in trampoline met stabiele landing op het blok met ½ draai in de hoepel', categorie: 'springen', pogingen: 2 },
  { id: 9, beschrijving: 'Springen van blok in trampoline met stabiele landing op het blok met 1/1 draai in de hoepel', categorie: 'springen', pogingen: 2 },
  { id: 10, beschrijving: 'Gericht werpen van een bal onderhands (enkelhandig met de niet voorkeurshand) over een afstand van 10 meter', categorie: 'werpen', pogingen: 2 },
  { id: 11, beschrijving: 'Gericht werpen van een bal bovenhands (enkelhandig met de niet voorkeurshand) over een afstand van 10 meter', categorie: 'werpen', pogingen: 2 },
  { id: 12, beschrijving: 'Gericht werpen van een frisbee (enkelhandig met de niet voorkeurshand) over een afstand van 10 meter', categorie: 'werpen', pogingen: 2 },
  { id: 13, beschrijving: 'Klimmen in een overhangend wandrek tot aan de bovenzijde en klauteren via de zijkant naar de voorzijde en achterwaarts terug naar de startpositie', categorie: 'klimmen', pogingen: 1 },
  { id: 14, beschrijving: 'Klimmen in een overhangend wandrek tot aan de bovenzijde en klauteren via de achterzijde naar de voorzijde en achterwaarts terug naar de startpositie', categorie: 'klimmen', pogingen: 1 },
  { id: 15, beschrijving: 'Klimmen in een overhangend wandrek tot aan de bovenzijde en klauteren via de achterzijde naar de voorzijde en voorwaarts terug naar de startpositie', categorie: 'klimmen', pogingen: 1 },
  { id: 16, beschrijving: 'Op handen en voeten voorwaarts op 1 lijn over een afstand van 5 meter (2 banken) zonder onderbreking', categorie: 'balanceren', pogingen: 2 },
  { id: 17, beschrijving: 'Op handen en voeten voorwaarts op 1 lijn over een afstand van 5 meter met obstakels (2 banken) zonder onderbreking', categorie: 'balanceren', pogingen: 2 },
  { id: 18, beschrijving: 'Op handen en voeten achterwaarts op 1 lijn over een afstand van 5 meter met obstakels (2 banken) zonder onderbreking', categorie: 'balanceren', pogingen: 2 },
  { id: 19, beschrijving: 'Het uit balans brengen van de partner middels chinees boksen (tenen of hakken los voeten parallel) vanuit stand', categorie: 'balans', pogingen: 3 },
  { id: 20, beschrijving: 'Het uit balans brengen van de partner middels chinees boksen (tenen of hakken los voeten parallel) vanuit hurkzit', categorie: 'balans', pogingen: 3 },
  { id: 21, beschrijving: 'Het uit balans brengen van de partner middels de ijzeren vinger (tenen of hakken los) voeten achter elkaar', categorie: 'balans', pogingen: 3 },
  { id: 22, beschrijving: 'Vanuit stand springen in stilstaande trapeze met afgolven vanuit strekhangzwaai tot stand op de mat', categorie: 'trapeze' },
  { id: 23, beschrijving: 'Vanuit stand springen in zwaaiende trapeze met afgolven vanuit strekhangzwaai tot stand in balans op de mat', categorie: 'trapeze' },
  { id: 24, beschrijving: 'Vanuit loop springen in zwaaiende trapeze met afgolven vanuit strekhangzwaai tot stand in balans op de mat', categorie: 'trapeze' }
];

const GrondvormenTest: React.FC = () => {
  const { addGrondvormenResult, getGrondvormenResult } = useTestContext();
  const [testScores, setTestScores] = useState<{ [key: number]: boolean | null }>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedResult = getGrondvormenResult?.();
    if (savedResult) {
      setTestScores(savedResult.scores);
    }
  }, [getGrondvormenResult]);

  const handleScoreChange = (id: number, gelukt: boolean | null) => {
    setTestScores(prev => ({
      ...prev,
      [id]: gelukt
    }));
  };

  const saveResults = () => {
    addGrondvormenResult?.(testScores);
    setShowResults(true);
  };

  const calculateScore = () => {
    const completed = Object.values(testScores).filter(score => score === true).length;
    const total = grondvormen.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const getCategorieScore = (categorie: string) => {
    const categorieItems = grondvormen.filter(g => g.categorie === categorie);
    const completed = categorieItems.filter(g => testScores[g.id] === true).length;
    return { completed, total: categorieItems.length };
  };

  const isTestComplete = () => {
    return grondvormen.every(g => testScores[g.id] !== undefined && testScores[g.id] !== null);
  };

  const resetTest = () => {
    setTestScores({});
    setShowResults(false);
  };

  const exportResults = () => {
    const score = calculateScore();
    const resultText = `Grondvormen van Bewegen - Testresultaten
    
Datum: ${new Date().toLocaleDateString('nl-NL')}
Totaal Score: ${score.completed}/${score.total} (${score.percentage}%)

Per categorie:
- Rollen: ${getCategorieScore('rollen').completed}/${getCategorieScore('rollen').total}
- Slaan: ${getCategorieScore('slaan').completed}/${getCategorieScore('slaan').total}
- Springen: ${getCategorieScore('springen').completed}/${getCategorieScore('springen').total}
- Werpen: ${getCategorieScore('werpen').completed}/${getCategorieScore('werpen').total}
- Klimmen: ${getCategorieScore('klimmen').completed}/${getCategorieScore('klimmen').total}
- Balanceren: ${getCategorieScore('balanceren').completed}/${getCategorieScore('balanceren').total}
- Balans: ${getCategorieScore('balans').completed}/${getCategorieScore('balans').total}
- Trapeze: ${getCategorieScore('trapeze').completed}/${getCategorieScore('trapeze').total}

Gedetailleerde resultaten:
${grondvormen.map(g => `${g.id}. ${g.beschrijving}: ${testScores[g.id] === true ? '✓' : testScores[g.id] === false ? '✗' : '-'}`).join('\n')}`;

    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grondvormen_test_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grondvormen-test">
      <div className="test-header">
        <h2>Test: Grondvormen van Bewegen op 3 Niveaus</h2>
        <p>Beoordeel per onderdeel of de beweging wel of niet gelukt is.</p>
        {grondvormen.some(g => g.pogingen) && (
          <p className="info-text">
            Let op: Sommige onderdelen hebben meerdere pogingen. Het aantal staat tussen haakjes.
          </p>
        )}
      </div>

      <div className="test-grid">
        {grondvormen.map((grondvorm) => (
          <div key={grondvorm.id} className="test-item">
            <div className="test-number">{grondvorm.id}</div>
            <div className="test-description">
              {grondvorm.beschrijving}
              {grondvorm.pogingen && <span className="pogingen"> ({grondvorm.pogingen} pogingen)</span>}
            </div>
            <div className="test-buttons">
              <button
                className={`score-button ${testScores[grondvorm.id] === true ? 'selected-yes' : ''}`}
                onClick={() => handleScoreChange(grondvorm.id, true)}
              >
                Wel
              </button>
              <button
                className={`score-button ${testScores[grondvorm.id] === false ? 'selected-no' : ''}`}
                onClick={() => handleScoreChange(grondvorm.id, false)}
              >
                Niet
              </button>
              {testScores[grondvorm.id] !== undefined && testScores[grondvorm.id] !== null && (
                <button
                  className="clear-button"
                  onClick={() => handleScoreChange(grondvorm.id, null)}
                  title="Wis selectie"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showResults && (
        <div className="results-section">
          <h3>Resultaten</h3>
          <div className="score-summary">
            <p>Totaal Score: {calculateScore().completed}/{calculateScore().total} ({calculateScore().percentage}%)</p>
            <div className="categorie-scores">
              <h4>Score per categorie:</h4>
              <ul>
                <li>Rollen: {getCategorieScore('rollen').completed}/{getCategorieScore('rollen').total}</li>
                <li>Slaan: {getCategorieScore('slaan').completed}/{getCategorieScore('slaan').total}</li>
                <li>Springen: {getCategorieScore('springen').completed}/{getCategorieScore('springen').total}</li>
                <li>Werpen: {getCategorieScore('werpen').completed}/{getCategorieScore('werpen').total}</li>
                <li>Klimmen: {getCategorieScore('klimmen').completed}/{getCategorieScore('klimmen').total}</li>
                <li>Balanceren: {getCategorieScore('balanceren').completed}/{getCategorieScore('balanceren').total}</li>
                <li>Balans: {getCategorieScore('balans').completed}/{getCategorieScore('balans').total}</li>
                <li>Trapeze (optioneel): {getCategorieScore('trapeze').completed}/{getCategorieScore('trapeze').total}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button
          className="save-button"
          onClick={saveResults}
          disabled={!isTestComplete()}
        >
          {isTestComplete() ? 'Resultaten Opslaan' : `Vul alle onderdelen in (${Object.keys(testScores).length}/${grondvormen.length})`}
        </button>
        {showResults && (
          <>
            <button className="export-button" onClick={exportResults}>
              Exporteer Resultaten
            </button>
            <button className="reset-button" onClick={resetTest}>
              Opnieuw Beginnen
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GrondvormenTest;