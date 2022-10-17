import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainBase from './MainBase';
import reportWebVitals from './reportWebVitals';


let plcStatus = [];


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

for (var i = 0; i < 8; i++) {
  let plcStatus2: PlcStatus = {
    num: i,
    machine_id: "aaa",
    ip_address: "bbb",
    plc_use: true,
    plc_working: true,
    plc_stop: false,
    command_read: "com r",
    command_write: "com w",
    command_data_read: "com data r",
  };
  plcStatus[i] = plcStatus2;
}

console.log(plcStatus);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainBase />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
