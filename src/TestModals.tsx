import { useState } from "react";
import { Button, Container } from "@mui/material";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

function TestModalOpen() {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    return (
        <Container maxWidth="sm">
            <Button variant="contained"
                color="primary"
                onClick={() => {
                    setEditModalIsOpen(true);
                }}
            >
                モーダル開く
            </Button>
            <Modal isOpen={editModalIsOpen} style={customStyles}>
                モーダル開いた
            </Modal>
        </Container>
    );
}

export default TestModalOpen;

