import React, { useContext, useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UrlForm from '../components/UrlForm';
import UrlResult from '../components/UrlResult';
import { UrlContext } from '../context/UrlContext';
import { logger } from '../middleware/logger';

const ShortenerPage = () => {
  const { urls, addUrl } = useContext(UrlContext);
  const [results, setResults] = useState([]);

  const handleAddUrl = (newUrl) => {
    // Case-insensitive check for existing shortcode
    const existing = urls.find(url => 
      url.shortcode.toLowerCase() === newUrl.shortcode.toLowerCase()
    );
    
    if (existing) {
      alert('Shortcode already exists. Please try a different one.');
      logger.error('Shortcode collision', { shortcode: newUrl.shortcode });
      return;
    }

    const fullUrl = {
      ...newUrl,
      clicks: [],
      clickCount: 0,
      created: new Date().toISOString()
    };
    
    addUrl(fullUrl);
    setResults(prev => [...prev, fullUrl]);
    logger.info('URL shortened successfully', { shortcode: newUrl.shortcode });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener
        </Typography>
        
        <UrlForm onAdd={handleAddUrl} />
        
        {results.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Shortened URLs
            </Typography>
            {results.map((url, index) => (
              <UrlResult key={index} url={url} />
            ))}
          </Box>
        )}
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/statistics"
          >
            View Statistics
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ShortenerPage;