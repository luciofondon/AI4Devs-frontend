import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Position } from './pages/Position';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/positions/:id" element={<Position />} />
          {/* Aquí puedes añadir más rutas según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
