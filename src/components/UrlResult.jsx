import React from 'react';
import { Box, Typography, Button, Link, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { formatDistance } from 'date-fns';

const UrlResult = ({ url }) => {
  const expiryDate = new Date(url.created);
  expiryDate.setMinutes(expiryDate.getMinutes() + url.validity);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${url.shortcode}`);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Original URL:</strong> 
        <Link href={url.longUrl} target="_blank" sx={{ ml: 1 }}>
          {url.longUrl}
        </Link>
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          <strong>Short URL:</strong> 
          <Link href={`http://localhost:3000/${url.shortcode}`} target="_blank" sx={{ ml: 1 }}>
            {`http://localhost:3000/${url.shortcode}`}
          </Link>
        </Typography>
        
        <Button 
          size="small" 
          startIcon={<ContentCopyIcon />} 
          onClick={copyToClipboard}
        >
          Copy
        </Button>
      </Box>
      
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Expires {formatDistance(expiryDate, new Date(), { addSuffix: true })}
      </Typography>
    </Paper>
  );
};

export default UrlResult;