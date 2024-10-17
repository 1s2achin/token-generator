import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/TokenGenerator.css';

function TokenGenerator() {
  const [tokenSettings, setTokenSettings] = useState({
    blueTokens: 0,
    bluePrefix: '',
    bluePerRow: 0,
    redTokens: 0,
    redPrefix: '',
    redPerRow: 0,
    tokens: { blue: [], red: [] },
  });

  // Handle general input change for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTokenSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle tokens per row limit
  const handleTokensPerRowChange = (name) => (e) => {
    const value = parseInt(e.target.value);
    if (value > 10) {
      toast.warning('Only up to 10 tokens can be displayed per row!');
      setTokenSettings((prevState) => ({
        ...prevState,
        [name]: 10,
      }));
    } else {
      setTokenSettings((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle focus to clear '0' values in the input fields
  const handleFocus = (name) => (e) => {
    if (e.target.value === '0') {
      setTokenSettings((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    }
  };

  // Generate tokens based on the input values
  const handleGenerate = () => {
    let blueTokenArray = [];
    let redTokenArray = [];

    for (let i = 1; i <= tokenSettings.blueTokens; i++) {
      blueTokenArray.push(`${tokenSettings.bluePrefix}${i}`);
    }

    for (let i = 1; i <= tokenSettings.redTokens; i++) {
      redTokenArray.push(`${tokenSettings.redPrefix}${i}`);
    }

    setTokenSettings((prevState) => ({
      ...prevState,
      tokens: { blue: blueTokenArray, red: redTokenArray },
    }));
  };

  // Clear all input fields and reset state
  const handleClear = () => {
    setTokenSettings({
      blueTokens: 0,
      bluePrefix: '',
      bluePerRow: 0,
      redTokens: 0,
      redPrefix: '',
      redPerRow: 0,
      tokens: { blue: [], red: [] },
    });
  };

  return (
    <div className="token-generator">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Token Generator
      </Typography>

      <Grid container spacing={2}>
        {/* Blue Tokens Section */}
        <Grid item xs={12}>
          <TextField
            label="Number of Blue Tokens"
            type="number"
            name="blueTokens"
            value={tokenSettings.blueTokens}
            onChange={handleChange}
            onFocus={handleFocus('blueTokens')}  
            inputProps={{ min: "0" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Prefix for Blue Tokens"
            name="bluePrefix"
            value={tokenSettings.bluePrefix}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Blue Tokens Per Row"
            type="number"
            name="bluePerRow"
            value={tokenSettings.bluePerRow}
            onChange={handleTokensPerRowChange('bluePerRow')}
            onFocus={handleFocus('bluePerRow')}  
            inputProps={{ min: "0" }}
            fullWidth
          />
        </Grid>

        {/* Red Tokens Section */}
        <Grid item xs={12}>
          <TextField
            label="Number of Red Tokens"
            type="number"
            name="redTokens"
            value={tokenSettings.redTokens}
            onChange={handleChange}
            onFocus={handleFocus('redTokens')}  
            inputProps={{ min: "0" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Prefix for Red Tokens"
            name="redPrefix"
            value={tokenSettings.redPrefix}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Red Tokens Per Row"
            type="number"
            name="redPerRow"
            value={tokenSettings.redPerRow}
            onChange={handleTokensPerRowChange('redPerRow')}
            onFocus={handleFocus('redPerRow')}  
            inputProps={{ min: "0" }}
            fullWidth
          />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleGenerate} fullWidth>
            Generate
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
            Clear All
          </Button>
        </Grid>

        {/* Token Display */}
        <Grid item xs={12}>
          <Typography variant="h6">Blue Tokens ({tokenSettings.tokens.blue.length})</Typography>
          <div className="token-display" style={{ '--tokens-per-row': tokenSettings.bluePerRow }}>
            {tokenSettings.tokens.blue.map((token, index) => (
              <span key={index} className="token blue-token">
                {token}
              </span>
            ))}
          </div>

          <Typography variant="h6">Red Tokens ({tokenSettings.tokens.red.length})</Typography>
          <div className="token-display" style={{ '--tokens-per-row': tokenSettings.redPerRow }}>
            {tokenSettings.tokens.red.map((token, index) => (
              <span key={index} className="token red-token">
                {token}
              </span>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default TokenGenerator;
