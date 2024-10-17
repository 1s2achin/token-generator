import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/TokenGenerator.css';

function TokenGenerator() {
  const [blueTokens, setBlueTokens] = useState(0);
  const [bluePrefix, setBluePrefix] = useState('');
  const [bluePerRow, setBluePerRow] = useState(0);
  const [redTokens, setRedTokens] = useState(0);
  const [redPrefix, setRedPrefix] = useState('');
  const [redPerRow, setRedPerRow] = useState(0);
  const [tokens, setTokens] = useState({ blue: [], red: [] });

  const handleGenerate = () => {
    let blueTokenArray = [];
    let redTokenArray = [];

    for (let i = 1; i <= blueTokens; i++) {
      blueTokenArray.push(`${bluePrefix}${i}`);
    }

    for (let i = 1; i <= redTokens; i++) {
      redTokenArray.push(`${redPrefix}${i}`);
    }

    setTokens({ blue: blueTokenArray, red: redTokenArray });
  };

  const handleClear = () => {
    setBlueTokens(0);
    setBluePrefix('');
    setBluePerRow(0);
    setRedTokens(0);
    setRedPrefix('');
    setRedPerRow(0);
    setTokens({ blue: [], red: [] });
  };

  // Function to limit the tokens per row and show toast if more than 10
  const handleTokensPerRowChange = (setter) => (e) => {
    const value = parseInt(e.target.value);
    if (value > 10) {
      toast.warning('Only up to 10 tokens can be displayed per row!');
      setter(10); 
    } else {
      setter(value);
    }
  };

  // Function to handle focus event to clear the '0' value
  const handleFocus = (setter) => (e) => {
    if (e.target.value === '0') {
      setter('');  
    }
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
            value={blueTokens}
            onChange={(e) => setBlueTokens(e.target.value)}
            onFocus={handleFocus(setBlueTokens)}  // Clear '0' on focus
            inputProps={{ min: "0" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Prefix for Blue Tokens"
            value={bluePrefix}
            onChange={(e) => setBluePrefix(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Blue Tokens Per Row"
            type="number"
            value={bluePerRow}
            onChange={handleTokensPerRowChange(setBluePerRow)}
            onFocus={handleFocus(setBluePerRow)}  
            inputProps={{ min: "0" }}
            fullWidth
          />
        </Grid>

        {/* Red Tokens Section */}
        <Grid item xs={12}>
          <TextField
            label="Number of Red Tokens"
            type="number"
            value={redTokens}
            onChange={(e) => setRedTokens(e.target.value)}
            onFocus={handleFocus(setRedTokens)}  
            inputProps={{ min: "0" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Prefix for Red Tokens"
            value={redPrefix}
            onChange={(e) => setRedPrefix(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Red Tokens Per Row"
            type="number"
            value={redPerRow}
            onChange={handleTokensPerRowChange(setRedPerRow)}
            onFocus={handleFocus(setRedPerRow)}  
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
          <Typography variant="h6">Blue Tokens ({tokens.blue.length})</Typography>
          <div className="token-display" style={{ '--tokens-per-row': bluePerRow }}>
            {tokens.blue.map((token, index) => (
              <span key={index} className="token blue-token">
                {token}
              </span>
            ))}
          </div>

          <Typography variant="h6">Red Tokens ({tokens.red.length})</Typography>
          <div className="token-display" style={{ '--tokens-per-row': redPerRow }}>
            {tokens.red.map((token, index) => (
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
