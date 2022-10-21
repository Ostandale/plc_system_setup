import { useState, useContext } from "react";
import './PlcComponent.css';
import TestModalOpen from './TestModals';
import { Button, Container, Box, Input, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Modal from "react-modal";
import { theme } from './ThemeColor';
import { plcStatus } from './App';
import { invoke } from '@tauri-apps/api';

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

//  !   PlcComponent
export default function PlcComponent({ propsValue, ...props }: any, { key }: any) {
    //  コンポーネント情報を保存　新しい配列を作ることで同期させない
    const savingProps = { ...propsValue };
    const [values, setValues] = useState(savingProps);

    //  モーダル表示用のステート
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const handleOpen = () => { setEditModalIsOpen(true); }
    const handleClose = () => {
        //  モーダル表示を枠外クリック、キャンセルした場合は元の情報に戻す
        setEditModalIsOpen(false);
        setValues(propsValue);
    }

    //  １文字入力ごとに判定する
    //  拡張すればおかしな入力を弾くことができる
    const handleChange = (e: any) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };

    //  決定したときの処理
    //  ステートを書き換えて、データベースも書き換える
    function SubmitButton() {
        // setValues(values);
        plcStatus[propsValue.num] = values;
        const newPlcStatus = { ...plcStatus };
        //  todo    リフトアップしてステート書換　もしかしてデータベースを書き換えることで必要ない？
        props.handleSettingChange(newPlcStatus);

        //  todo    データベースに変更を加える  invoke発行
        invoke('update_plc_data', { props: plcStatus[propsValue.num] }).then(res => { }).catch(err => { console.log("database writing error") })

    }

    //  状態によってCSSを切り替え
    //  CSSを直接変更する方法があるはず
    let cssPlc;
    let cssIpAdd;
    let cssLine;
    if (propsValue.plc_use) {
        cssPlc = "cssPlcGreen";
        cssIpAdd = "cssIpAddGreen";
        cssLine = "cssLineGreen";
    } else {
        cssPlc = "cssPlcRed";
        cssIpAdd = "cssIpAddRed";
        cssLine = "cssLineRed";
    }

    return (
        < ThemeProvider theme={theme} >
            <div >
                <div className={cssPlc} onClick={handleOpen} >
                    {propsValue.machine_id}
                    <div className={cssIpAdd}>{propsValue.ip_address}</div>
                    <div className={cssLine}></div>
                    <div>{propsValue.command_read}</div>
                    <div>{propsValue.command_write}</div>
                    <div>{propsValue.command_data_read}</div>

                </div>
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={handleClose}
                    style={customStyles}
                >
                    <Paper className="modal">
                        <FormGroup>
                            <div >
                                <TextField name="machine_id" id="machine_id" label="machine_id" variant="standard" value={values.machine_id} onChange={handleChange} />
                                <TextField name="ip_address" id="ip_adress" label="ip_address" variant="standard" value={values.ip_address} onChange={handleChange} />

                                <FormControlLabel control={<Checkbox name="plc_use" id="plc_use" checked={values.plc_use} onChange={handleChange} />} label="plc_use" />

                            </div>


                            <div><TextField fullWidth id="command_read" label="command_read" variant="standard" name="command_read" value={values.command_read} onChange={handleChange} /></div>
                            <div><TextField fullWidth id="command_write" label="command_write" variant="standard" name="command_write" value={values.command_write} onChange={handleChange} /></div>
                            <div><TextField fullWidth id="command_data_read" label="command_data_read" variant="standard" name="command_data_read" value={values.command_data_read} onChange={handleChange} /></div>
                            <Button onClick={SubmitButton}>決定</Button>
                        </FormGroup>
                    </Paper>
                </Modal>
            </div >
        </ThemeProvider >


    )
}

