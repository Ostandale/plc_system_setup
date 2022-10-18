import { useState, useContext } from "react";
import './PlcComponent.css';
import TestModalOpen from './TestModals';
import { Button, Container, Box, Input, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Modal from "react-modal";
import { theme } from './ThemeColor';
import { plcStatus } from './App';
import { PlcStatus } from './index';
import { PlcStatusContext } from "./App";

const customStyles = {
    content: {
        top: "40%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "80%",
        maxWidth: "80%",
        padding: "0%",
    },
};

Modal.setAppElement("body");

export default function PlcComponent({ props }: any, key: any) {
    //  コンテキストの読込
    const plcStatusContext = useContext(PlcStatusContext);

    //  モーダル表示用のステート
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const handleOpen = () => { setEditModalIsOpen(true); }
    const handleClose = () => { setEditModalIsOpen(false); }

    //  状態によってCSSを切り替え
    let cssPlc;
    let cssIpAdd;
    let cssLine;
    if (props.plc_use) {
        cssPlc = "cssPlcGreen";
        cssIpAdd = "cssIpAddGreen";
        cssLine = "cssLineGreen";
    } else {
        cssPlc = "cssPlcRed";
        cssIpAdd = "cssIpAddRed";
        cssLine = "cssLineRed";
    }

    return (
        <PlcStatusContext.Provider value={plcStatusContext}>
            console.log("context=", value);
            <ThemeProvider theme={theme}>
                <div >
                    <div className={cssPlc} onClick={handleOpen} >
                        {props.machine_id}
                        <div className={cssIpAdd}>{props.ip_address}</div>
                        <div className={cssLine}></div>
                        <div>{props.command_read}</div>
                        <div>{props.command_write}</div>
                        <div>{props.command_data_read}</div>

                    </div>
                    <Modal
                        isOpen={editModalIsOpen}
                        onRequestClose={handleClose}
                        style={customStyles}
                    >
                        <Paper className="modal">
                            <FormGroup>
                                <div >
                                    <TextField id="machine_id" label="machine_id" variant="standard" />
                                    <TextField id="ip_adress" label="ip_address" variant="standard" />
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="plc_use" />
                                </div>


                                <div><TextField fullWidth id="command_read" label="command_read" variant="standard" /></div>
                                <div><TextField fullWidth id="command_write" label="command_write" variant="standard" /></div>
                                <div><TextField fullWidth id="command_data_read" label="command_data_read" variant="standard" /></div>
                                <Button>決定</Button>
                            </FormGroup>
                        </Paper>
                    </Modal>
                </div >
            </ThemeProvider>
        </PlcStatusContext.Provider>

    )
}

