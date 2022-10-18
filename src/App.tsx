import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import PlcComponent from './PlcComponent';
import { CssBaseline, Paper, Container } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './ThemeColor';
import { invoke } from '@tauri-apps/api';
import { PlcStatus } from './index';

export let plcStatus: any = [];
export const PlcStatusContext = React.createContext(plcStatus);


//  todo  -----------------------------------------------------------------------------
function App() {
  invoke('read_status').then((res: any) => {
    plcStatus: PlsStatus = {
      num: res.get(0),
    };
  });
  console.log("data", plcStatus);
  //  todo  ---------------------------------------------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container >

        <Paper className='App-base'>
          {plcStatus.map((value: any, key: any) => {
            return (<PlcComponent props={value} key={key} />)
          })}
        </Paper>

      </Container>
    </ThemeProvider>
  )

}
export default App;