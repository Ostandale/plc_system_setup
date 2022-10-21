//  tauri用のコマンド類
//  tauri用のステート設定

use sqlx::mysql::MySqlRow;
use sqlx::{MySql, Pool, Row};
use tauri::{command, State};

use crate::database_functions;

//  !   ステート用構造体
#[derive(Debug)]
pub struct StateValue {
    pub db_pool: Option<Pool<MySql>>,
}

#[tauri::command]
pub fn test1_func() -> i32 {
    let a = 10;
    return a;
}

pub fn test2_func() -> i32 {
    let b = 10;
    return b * 2;
}

//  !   PLCの設定を読み込む
#[tauri::command]
pub async fn read_status(
    state: State<'_, StateValue>,
) -> Result<Vec<database_functions::DabaseForSystemStatus>, String> {
    let mut res_list: Vec<database_functions::DabaseForSystemStatus> = Vec::new();
    let sql_query = "select * from plc_status";

    let mut db_pool = state.db_pool.clone().unwrap();

    match sqlx::query(&sql_query).fetch_all(&db_pool).await {
        Ok(res) => {
            for i in res {
                let read_status = database_functions::DabaseForSystemStatus {
                    num: i.get(0),
                    machine_id: i.get(1),
                    ip_address: i.get(2),
                    plc_use: i.get(3),
                    plc_working: i.get(4),
                    plc_stop: i.get(5),
                    command_read: i.get(6),
                    command_write: i.get(7),
                    command_data_read: i.get(8),
                };
                res_list.push(read_status);
            }
            Ok(res_list)
        }
        Err(_) => Err("ng".to_string()),
    }
}

//  !   PLCの設定を書き込む
#[tauri::command]
pub async fn update_plc_data(
    state: State<'_, StateValue>,
    props: database_functions::ReciveDataFromFront,
) -> Result<(), ()> {
    let sql_query = format!("update plc_status set machine_id=\"{machine_id}\", ip_address=\"{ip_address}\", plc_use={plc_use}, command_read=\"{cr}\", command_write=\"{cw}\", command_data_read=\"{cdr}\" where num={num}",num = props.num, machine_id = props.machine_id, ip_address = props.ip_address, plc_use = props.plc_use, cr =props.command_read, cw = props.command_write, cdr=props.command_data_read);

    let mut db_pool = state.db_pool.clone().unwrap();
    match sqlx::query(&sql_query).fetch_all(&db_pool).await {
        Ok(v) => Ok(()),
        Err(e) => Err(()),
    }
}
