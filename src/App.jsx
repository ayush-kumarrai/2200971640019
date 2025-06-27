import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UrlProvider } from './context/UrlContext';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';
import { logger } from './middleware/logger';

function App() {
  React.useEffect(() => {
    logger.info('Application mounted');
  }, []);

  return (
    <UrlProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/statistics" element={<StatsPage />} />
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Router>
    </UrlProvider>
  );
}

export default App;