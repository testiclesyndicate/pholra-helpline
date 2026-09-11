import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DemoBanner } from './components/DemoBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Toasts } from './components/Toasts';
import { InitialPermissionModal } from './components/InitialPermissionModal';
import { LocationModal } from './components/LocationModal';

import { Home } from './pages/Home';
import { Assistant } from './pages/Assistant';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { Weather } from './pages/Weather';
import { MyCrop } from './pages/MyCrop';
import { RiskAnalysis } from './pages/RiskAnalysis';
import { Officials } from './pages/Officials';
import { GovtSchemes } from './pages/GovtSchemes';
import { About } from './pages/About';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--cream)',
            color: 'var(--ink)',
          }}
        >
          <DemoBanner />
          <Header />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/disease" element={<DiseaseDetection />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/my-crop" element={<MyCrop />} />
              <Route path="/risk" element={<RiskAnalysis />} />
              <Route path="/officials" element={<Officials />} />
              <Route path="/schemes" element={<GovtSchemes />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <BottomNav />
          <Toasts />
          <InitialPermissionModal />
          <LocationModal />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
