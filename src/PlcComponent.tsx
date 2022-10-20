import { useState, useContext } from "react";
import './PlcComponent.css';
import TestModalOpen from './TestModals';
import { Button, Container, Box, Input, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Modal from "react-modal";
import { theme } from './ThemeColor';
import { plcStatus } from './App';

//import { PlcStatusContext } from "./App";

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

// pub num: u16,
//     pub machine_id: String,
//         pub ip_address: String,
//             pub plc_use: bool,
//                 pub plc_working: bool,
//                     pub plc_stop: bool,
//                         pub command_read: String,
//                             pub command_write: String,
//                                 pub command_data_read: String,


function submitCanceled() {
}
export default function PlcComponent({ props }: any, { key }: any) {
    //  コンテキストの読込
    const [values, setValues] = useState(
        {
            formMachineId: props.machine_id,
            formIpAddress: props.ip_address,
            formPlcUse: props.plc_use,
            formCommandRead: props.command_read,
            formCommandWrite: props.command_write,
            formCommandDataRead: props.command_data_read,
            // formOriginMachineId: props.machine_id,
            // formOriginIpAddress: props.ip_address,
            // formOriginPlcUse: props.plc_use,
        });

    //  モーダル表示用のステート
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const handleOpen = () => { setEditModalIsOpen(true); }
    const handleClose = () => {
        setEditModalIsOpen(false);
        const newState =
            (
                {
                    formMachineId: props.machine_id,
                    formIpAddress: props.ip_address,
                    formPlcUse: props.plc_use,
                    formCommandRead: props.command_read,
                    formCommandWrite: props.command_write,
                    formCommandDataRead: props.command_data_read,
                });
        setValues(newState);
        // setValues({
        //     ...values, formPlcUse: values.formOriginPlcUse
        // });
    }



    const handleChange = (e: any) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };

    function SubmitButton() {
        setValues({ ...values, formMachineId: values.formMachineId });
        plcStatus[props.num] = {
            ...props,
            machine_id: values.formMachineId,
        }
        console.log("plcStatus after", plcStatus)
        props.handleSettingChange(plcStatus);
    }
    //  状態によってCSSを切り替え
    //  CSSを直接変更する方法があるはず
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
        // <PlcStatusContext.Provider value={plcStatusContext}>

        < ThemeProvider theme={theme} >
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
                                <TextField name="formMachineId" id="machine_id" label="machine_id" variant="standard" value={values.formMachineId} onChange={handleChange} />
                                <TextField name="formIpAddress" id="ip_adress" label="ip_address" variant="standard" value={values.formIpAddress} onChange={handleChange} />

                                <FormControlLabel control={<Checkbox name="formPlcUse" id="plc_use" checked={values.formPlcUse} onChange={handleChange} />} label="plc_use" />

                            </div>


                            <div><TextField fullWidth id="command_read" label="command_read" variant="standard" name="formCommandRead" value={values.formCommandRead} onChange={handleChange} /></div>
                            <div><TextField fullWidth id="command_write" label="command_write" variant="standard" name="formCommandWrite" value={values.formCommandWrite} onChange={handleChange} /></div>
                            <div><TextField fullWidth id="command_data_read" label="command_data_read" variant="standard" name="formCommandDataRead" value={values.formCommandDataRead} onChange={handleChange} /></div>
                            <Button onClick={SubmitButton}>決定</Button>
                        </FormGroup>
                    </Paper>
                </Modal>
            </div >
        </ThemeProvider >


    )
}

