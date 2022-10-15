import { useState } from "react";
import './PlcComponent.css';
import SettingScreen from './SettingScreen';
import TestModalOpen from './TestModals';
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import '@fontsource/roboto/300.css';
import MainBase from "./MainBase";

const customStyles = {
    content: {
        top: "20%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "40%",
        bgcolor: 'background.paper'
    },
};

Modal.setAppElement("body");

export default function PlcComponent({ props }: any, key: any) {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const handleOpen = () => { setEditModalIsOpen(true); }
    const handleClose = () => { setEditModalIsOpen(false); }

    return (
        <div>
            <div className='plcComponent' onClick={handleOpen}>
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
                className="Modal"
            >

                モーダル開いた
                <Button variant="contained" onClick={() => {
                    setEditModalIsOpen(false);
                    <TestModalOpen />
                }}></Button>
            </Modal>
        </div>
    )
}

function BtnOn(value: number) {

    console.log(value);

    < TestModalOpen />

    console.log("end")
}
