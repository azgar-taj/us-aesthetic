import React from 'react';
import './App.css';
import { LoginPage } from './Components/LoginModal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeTimeline } from './Components/HomeTimeline';

function App() {
  return (
    <div className="App">
      <night-sky
        id="nightSky"
        layers="2"
        density="15"
        velocity-x="60"
        velocity-y="60"
        star-color="#FFF">
      </night-sky>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeTimeline  />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
