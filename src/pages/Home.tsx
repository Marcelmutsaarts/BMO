import React from 'react';
import { Link } from 'react-router-dom';
import DataManager from '../components/DataManager';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>BMO - Breed Motorisch Opleiden</h1>
        <p className="intro-text">
          Welkom bij de BMO app voor eerste jaars ALO studenten. 
          Ontdek het model van motorisch leren dat de HAN-ALO gebruikt.
          Klik op een van de onderstaande onderdelen om meer te leren.
        </p>
      </header>

      <DataManager />
      
      <div className="navigation-cards">
        <Link to="/fundamentele-beweegvaardigheden" className="nav-card">
          <div className="card-content">
            <h2>Fundamentele Beweegvaardigheden</h2>
            <p>De basisbewegingen die kinderen moeten leren om complexere bewegingen te kunnen maken</p>
          </div>
        </Link>
        
        <Link to="/beweegcondities" className="nav-card">
          <div className="card-content">
            <h2>Beweegcondities</h2>
            <p>Wat het lichaam moet kunnen om te bewegen zonder belemmering</p>
          </div>
        </Link>
        
        <Link to="/coordinatieve-vermogens" className="nav-card">
          <div className="card-content">
            <h2>Coördinatieve Vermogens</h2>
            <p>De vermogens om gecoördineerd te kunnen bewegen</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;