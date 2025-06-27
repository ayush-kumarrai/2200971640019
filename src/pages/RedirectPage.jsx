import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { UrlContext } from '../context/UrlContext';
import { logger } from '../middleware/logger';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const { getUrlByShortcode, recordClick } = useContext(UrlContext);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const redirectUrl = getUrlByShortcode(shortcode);

    if (!redirectUrl) {
      setError('URL not found');
      setLoading(false);
      logger.error('Shortcode not found', { shortcode });
      return;
    }

    const createdDate = new Date(redirectUrl.created);
    const expiryDate = new Date(createdDate.getTime() + redirectUrl.validity * 60000);
    
    if (Date.now() > expiryDate.getTime()) {
      setError('This URL has expired');
      setLoading(false);
      logger.error('URL expired', { shortcode, expiry: expiryDate });
      return;
    }

    // Record click
    const clickData = {
      timestamp: new Date().toISOString(),
      source: document.referrer || 'direct',
      location: navigator.geolocation ? 'Unknown' : 'Not available'
    };

    recordClick(shortcode, clickData);
    
    // Redirect after short delay
    setTimeout(() => {
      window.location.href = redirectUrl.longUrl;
    }, 2000);

    logger.info('Redirect initiated', { shortcode, destination: redirectUrl.longUrl });

  }, [shortcode, getUrlByShortcode, recordClick]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>Redirecting to your destination...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <Typography variant="h5" color="error" gutterBottom>
        {error}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default RedirectPage;