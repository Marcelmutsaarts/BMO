import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TestProvider } from './context/TestContext';
import Home from './pages/Home';
import FundamenteleBeweegvaardigheden from './pages/FundamenteleBeweegvaardigheden';
import Beweegcondities from './pages/Beweegcondities';
import CoordinatieveVermogens from './pages/CoordinatieveVermogens';
import './App.css';

function App() {
  return (
    <TestProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fundamentele-beweegvaardigheden" element={<FundamenteleBeweegvaardigheden />} />
            <Route path="/beweegcondities" element={<Beweegcondities />} />
            <Route path="/coordinatieve-vermogens" element={<CoordinatieveVermogens />} />
          </Routes>
        </div>
      </Router>
    </TestProvider>
  );
}

export default App;
