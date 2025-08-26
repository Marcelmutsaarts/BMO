import React, { useState } from 'react';
import { useTestContext } from '../context/TestContext';
import '../styles/CollapsibleDataManager.css';

export default function CollapsibleDataManager() {
  const { userData, exportData, importData, clearAllData } = useTestContext();
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmo-gegevens-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = importData(content);
      
      if (success) {
        alert('✅ Gegevens succesvol geïmporteerd!');
      } else {
        alert('❌ Fout bij importeren. Controleer of het bestand correct is.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleClearData = () => {
    const confirmed = window.confirm(
      '⚠️ Weet je zeker dat je alle gegevens wilt wissen?\n\nDit kan niet ongedaan worden gemaakt. Overweeg eerst je gegevens te exporteren.'
    );
    
    if (confirmed) {
      clearAllData();
      alert('🗑️ Alle gegevens zijn gewist.');
    }
  };

  const hasData = userData.geslacht || userData.testResultaten.length > 0;

  return (
    <div className="collapsible-data-manager">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="collapsible-toggle"
        aria-expanded={isOpen}
      >
        <span className="toggle-icon">{isOpen ? '▼' : '▶'}</span>
        <span className="toggle-text">⚙️ Gegevens beheer</span>
        {hasData && (
          <span className="data-badge">
            {userData.testResultaten.length > 0 
              ? `${userData.testResultaten.length} test${userData.testResultaten.length > 1 ? 'en' : ''}`
              : 'Geslacht ingesteld'
            }
          </span>
        )}
      </button>

      {isOpen && (
        <div className="collapsible-content">
          <div className="data-actions">
            <button
              onClick={handleExport}
              className="action-button export-btn"
              disabled={!hasData}
              title={hasData ? 'Download je gegevens als JSON bestand' : 'Geen gegevens om te exporteren'}
            >
              <span className="button-icon">📥</span>
              <span className="button-text">Exporteer</span>
            </button>

            <button
              onClick={handleImportClick}
              className="action-button import-btn"
              title="Upload een eerder geëxporteerd JSON bestand"
            >
              <span className="button-icon">📤</span>
              <span className="button-text">Importeer</span>
            </button>

            <button
              onClick={handleClearData}
              className="action-button clear-btn"
              disabled={!hasData}
              title={hasData ? 'Wis alle opgeslagen gegevens' : 'Geen gegevens om te wissen'}
            >
              <span className="button-icon">🗑️</span>
              <span className="button-text">Wis alles</span>
            </button>
          </div>

          {hasData && (
            <div className="data-info">
              <div className="info-item">
                {userData.geslacht && (
                  <span>👤 {userData.geslacht === 'man' ? 'Man' : 'Vrouw'}</span>
                )}
                {userData.testResultaten.length > 0 && (
                  <span>📊 {userData.testResultaten.length} test(en)</span>
                )}
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
}