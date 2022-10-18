import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import PlcComponent from './PlcComponent';
import { CssBaseline, Paper, Container } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './ThemeColor';

interface PlcStatus {
  num: number,
  machine_id: string,
  ip_address: string,
  plc_use: boolean,
  plc_working: boolean,
  plc_stop: boolean,
  command_read: string,
  command_write: string,
  command_data_read: string,
}

let plcStatus = [];

function App() {

  const plcs = ['PLC 1', 'PLC 2', 'PLC 3', 'PLC 4', 'PLC 5', 'PLC 6', 'PLC 7', 'PLC 8'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container >
        <Paper className='App-base'>
          {plcs.map((value, key) => {
            return (<PlcComponent props={value} key={key} />)
          })}
        </Paper>
      </Container>
    </ThemeProvider>
  )
}
export default App;