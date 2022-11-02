import './App.css';
import PlcComponent from './PlcComponent';
import { useState } from 'react';
import { Paper, Container } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './ThemeColor';
import { invoke } from '@tauri-apps/api';

//  todo  -----------------------------------------------------------------------------

export let plcStatus: any = [];

//  スリープ用　あまり良くない処理
const sleepSync = (ms: number) => {
  const end = new Date().getTime() + ms;
  while (new Date().getTime() < end) { /* do nothing */ }
}

//  todo  invokeの処理待ちを改善したい
//  設定をデータベースから読み込む
invoke('read_status')
  .then((res: any) => {
    plcStatus = res;
  })
  .catch(() => {
    invoke("make_db_plc_status").then(() => {
      console.log("新規DB作成");
      invoke('read_status').then((res: any) => {
        plcStatus = res;
      })
    }).catch((e) => console.log("DB作成失敗", e))
  });
//  １００ｍｓ待つ　データベースの処理待ち　他にやり方を探したい
sleepSync(100);
//  todo


//  ! App
function App() {
  const [getPlcStatus, setPlcStatus] = useState(plcStatus);

  //  todo  リフトアップ用
  function handleSettingChange(newPlcStatus: any) {
    setPlcStatus(newPlcStatus);
  }

  //  todo
  return (
    <ThemeProvider theme={theme}>
      <Container >
        <Paper className='App-base'>

          {
            plcStatus.map((value: any, key: any) => {
              return (
                < PlcComponent propsValue={value} key={key} handleSettingChange={(e: any) => handleSettingChange(e)} />
              )
            })
          }

        </Paper>
      </Container>
    </ThemeProvider>
  )
}
export default App;