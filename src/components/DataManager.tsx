import React, { useRef } from 'react';
import { useTestContext } from '../context/TestContext';
import '../styles/DataManager.css';

export default function DataManager() {
  const { userData, exportData, importData, clearAllData } = useTestContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    // Reset file input
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
    <div className="data-manager">
      <div className="data-manager-header">
        <h3>📊 Gegevens beheer</h3>
        <p>Exporteer, importeer of wis je app gegevens</p>
      </div>
      
      <div className="data-manager-buttons">
        <button
          onClick={handleExport}
          className="data-button export-button"
          disabled={!hasData}
          title={hasData ? 'Download je gegevens als JSON bestand' : 'Geen gegevens om te exporteren'}
        >
          📥 Exporteer gegevens
        </button>

        <button
          onClick={handleImportClick}
          className="data-button import-button"
          title="Upload een eerder geëxporteerd JSON bestand"
        >
          📤 Importeer gegevens
        </button>

        <button
          onClick={handleClearData}
          className="data-button clear-button"
          disabled={!hasData}
          title={hasData ? 'Wis alle opgeslagen gegevens' : 'Geen gegevens om te wissen'}
        >
          🗑️ Wis alle gegevens
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {hasData && (
        <div className="data-summary">
          <h4>Huidige gegevens:</h4>
          <ul>
            {userData.geslacht && (
              <li>👤 Geslacht: {userData.geslacht === 'man' ? 'Man' : 'Vrouw'}</li>
            )}
            {userData.testResultaten.length > 0 && (
              <li>📋 Test resultaten: {userData.testResultaten.length} testen uitgevoerd</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}