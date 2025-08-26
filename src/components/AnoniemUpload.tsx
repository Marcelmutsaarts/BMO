import React, { useState } from 'react';
import { useTestContext } from '../context/TestContext';
import { uploadAnoniemData, checkRateLimit, updateRateLimit } from '../services/dataUpload';
import '../styles/AnoniemUpload.css';

export default function AnoniemUpload() {
  const { userData } = useTestContext();
  const [isUploading, setIsUploading] = useState(false);
  const [lastResult, setLastResult] = useState<{ success: boolean; message: string } | null>(null);

  const hasDataToUpload = userData.geslacht || userData.testResultaten.length > 0;

  const handleUpload = async () => {
    // Rate limiting check
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setLastResult({
        success: false,
        message: `⏳ Wacht nog ${rateCheck.waitTime} minuten voordat je opnieuw uploadt.\n\nDit voorkomt spam en beschermt de database.`
      });
      return;
    }

    // Bevestiging dialoog
    const confirmed = window.confirm(
      '🔒 Anonieme upload naar docent\n\n' +
      'Je gaat de volgende gegevens ANONIEM uploaden:\n' +
      `• Geslacht: ${userData.geslacht || 'Niet ingesteld'}\n` +
      `• Testresultaten: ${userData.testResultaten.length} test(en)\n\n` +
      'Er wordt GEEN persoonlijke informatie verzonden.\n' +
      'Akkoord om door te gaan?'
    );

    if (!confirmed) return;

    setIsUploading(true);
    setLastResult(null);

    try {
      const result = await uploadAnoniemData(userData);
      setLastResult(result);

      if (result.success) {
        updateRateLimit();
      }
    } catch (error) {
      setLastResult({
        success: false,
        message: '❌ Onverwachte fout bij uploaden. Probeer het later opnieuw.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getDataSummary = () => {
    if (!hasDataToUpload) return 'Geen gegevens om te uploaden';
    
    const items = [];
    if (userData.geslacht) items.push(`Geslacht: ${userData.geslacht}`);
    if (userData.testResultaten.length > 0) items.push(`${userData.testResultaten.length} testresultaten`);
    
    return items.join(', ');
  };

  return (
    <div className="anoniem-upload">
      <div className="upload-info">
        <h4>📤 Upload naar docent</h4>
        <p className="upload-description">
          Deel je testresultaten anoniem met je docent voor klassikale analyse
        </p>
        <div className="data-summary">
          <span className="summary-label">Te uploaden:</span>
          <span className="summary-data">{getDataSummary()}</span>
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={!hasDataToUpload || isUploading}
        className={`upload-button ${!hasDataToUpload ? 'disabled' : ''}`}
        title={!hasDataToUpload ? 'Geen gegevens om te uploaden' : 'Upload anoniem naar docent'}
      >
        {isUploading ? (
          <>
            <span className="upload-spinner">🔄</span>
            <span>Uploaden...</span>
          </>
        ) : (
          <>
            <span className="upload-icon">🔒</span>
            <span>Upload Anoniem</span>
          </>
        )}
      </button>

      {lastResult && (
        <div className={`upload-result ${lastResult.success ? 'success' : 'error'}`}>
          <div className="result-content">
            {lastResult.message.split('\n').map((line, index) => (
              <div key={index} className={index === 0 ? 'result-title' : 'result-detail'}>
                {line}
              </div>
            ))}
          </div>
          <button
            onClick={() => setLastResult(null)}
            className="result-close"
            title="Sluit melding"
          >
            ✕
          </button>
        </div>
      )}

      <div className="privacy-notice">
        <h5>🔐 Privacy waarborg</h5>
        <ul>
          <li>Geen namen, emails of andere persoonlijke gegevens</li>
          <li>Alleen testscores en geslacht worden gedeeld</li>
          <li>Volledig anoniem - niet herleidbaar naar jou</li>
          <li>Maximum 1 upload per 5 minuten</li>
        </ul>
      </div>
    </div>
  );
}