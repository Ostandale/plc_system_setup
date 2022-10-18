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
                    command_d_read: i.get(8),
                };
                res_list.push(read_status);
            }

            Ok(res_list)
        }
        Err(_) => Err("ng".to_string()),
    }
}
