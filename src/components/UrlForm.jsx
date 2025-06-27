import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { logger } from '../middleware/logger';

const UrlForm = ({ onAdd }) => {
  const [inputs, setInputs] = useState([
    { longUrl: '', validity: '', shortcode: '' }
  ]);

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const validate = () => {
    const errors = [];
    
    inputs.forEach((input, index) => {
      if (!input.longUrl) {
        errors.push(`URL ${index + 1}: Long URL is required`);
        logger.error('Validation failed', { field: 'longUrl', index });
        return;
      }

      try {
        new URL(input.longUrl);
      } catch {
        errors.push(`URL ${index + 1}: Invalid URL format`);
        logger.error('Validation failed', { field: 'longUrl', index });
      }

      if (input.validity && (isNaN(input.validity) || input.validity < 1)) {
        errors.push(`URL ${index + 1}: Validity must be a positive number`);
        logger.error('Validation failed', { field: 'validity', index });
      }

      if (input.shortcode && !/^[a-zA-Z0-9_-]{4,20}$/.test(input.shortcode)) {
        errors.push(`URL ${index + 1}: Shortcode must be 4-20 alphanumeric characters`);
        logger.error('Validation failed', { field: 'shortcode', index });
      }
    });

    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    inputs.forEach(input => {
      if (input.longUrl) {
        onAdd({
          longUrl: input.longUrl,
          shortcode: input.shortcode || generateShortcode(),
          validity: parseInt(input.validity) || 30,
          created: new Date().toISOString()
        });
      }
    });

    setInputs([{ longUrl: '', validity: '', shortcode: '' }]);
  };

  const generateShortcode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return (
    <Box sx={{ mt: 3 }}>
      {inputs.map((input, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Long URL"
              value={input.longUrl}
              onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              fullWidth
              label="Validity (mins)"
              type="number"
              value={input.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
              placeholder="30"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={input.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddInput}
          disabled={inputs.length >= 5}
        >
          Add URL
        </Button>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
        >
          Shorten URLs
        </Button>
      </Box>
    </Box>
  );
};

export default UrlForm;