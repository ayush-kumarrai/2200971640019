import React, { useContext } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StatisticsTable from '../components/StatisticsTable';
import { UrlContext } from '../context/UrlContext';
import { logger } from '../middleware/logger';

const StatsPage = () => {
  const { urls } = useContext(UrlContext);

  React.useEffect(() => {
    logger.info('Statistics page visited');
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">URL Statistics</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/"
          >
            Back to Shortener
          </Button>
        </Box>
        
        <StatisticsTable urls={urls} />
      </Box>
    </Container>
  );
};

export default StatsPage;