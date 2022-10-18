import { useState } from "react";
import './PlcComponent.css';
import TestModalOpen from './TestModals';
import { Button, Container, Box, Input, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Modal from "react-modal";
import { theme } from './ThemeColor';

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
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const handleOpen = () => { setEditModalIsOpen(true); }
    const handleClose = () => { setEditModalIsOpen(false); }

    return (

        <ThemeProvider theme={theme}>
            <div >
                <div className="plcComponent" onClick={handleOpen} >
                    {props}
                    <div className='ipadd'>192.168.10.100</div>
                    <div className='line'></div>
                    <div>command read</div>
                    <div>command write</div>
                    <div>data read</div>
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

    )
}

