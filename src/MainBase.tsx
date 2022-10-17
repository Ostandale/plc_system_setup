import './MainBase.css';
import { useState, useEffect } from 'react';
import PlcComponent from './PlcComponent';
import { CssBaseline, Paper, Container } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './ThemeColor';
import { invoke } from '@tauri-apps/api';
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

function MainBase() {

    const plcs = ['PLC 1', 'PLC 2', 'PLC 3', 'PLC 4', 'PLC 5', 'PLC 6', 'PLC 7', 'PLC 8'];
    useEffect(() => {
        invoke('read_status').then((res: any) => plcStatus = res)
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container >
                <Paper className='base'>
                    {plcs.map((value, key) => {
                        return (<PlcComponent props={value} key={key} />)
                    })}
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
export default MainBase;