import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Position } from './pages/Position';
import Positions from './components/Positions';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidate from './components/AddCandidateForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecruiterDashboard />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/positions/:id" element={<Position />} />
          <Route path="/add-candidate" element={<AddCandidate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
