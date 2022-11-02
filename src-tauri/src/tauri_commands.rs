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

//

//

//
#[tauri::command]
pub async fn make_db_plc_status(state: State<'_, StateValue>) -> Result<String, String> {
    let sql_query = r#"
    CREATE TABLE `plc_status` (
        `num` int unsigned NOT NULL,
        `machine_id` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
        `ip_address` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
        `plc_maker` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
        `plc_use` tinyint(1) NOT NULL,
        `plc_working` tinyint(1) NOT NULL,
        `plc_stop` tinyint(1) NOT NULL,
        `command_read` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
        `command_write` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
        `command_data_read` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (`num`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      "#;
    let db_pool = state.db_pool.clone().unwrap();
    match sqlx::query(&sql_query).execute(&db_pool).await {
        Ok(_) => {
            for index in 0..=8 {
                let read_command = "500000FFFF03000C000200010401008A0200900100";
                let write_command = "500000FFFF03000D000200011401008A020090010010";
                let read_data_command = "500000FFFF03000C00000001040000140500A82800";

                let sql_query = format!("INSERT INTO `plc_status` (`num`, `machine_id`, `ip_address`, `plc_maker`, `plc_use`, `plc_working`, `plc_stop`, `command_read`, `command_write`, `command_data_read`) VALUES ('{}', 'PLC_NAME', '192.168.100.100:8000', 'Mitsubishi', '0', '0', '0', '{}', '{}', '{}')",index,read_command, write_command, read_data_command);
                sqlx::query(&sql_query)
                    .execute(&db_pool)
                    .await
                    .expect("新規データベース書込失敗");
            }
            Ok("Ok".to_string())
        }
        Err(_) => Err("Err".to_string()),
    }
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
                    plc_maker: i.get(3),
                    plc_use: i.get(4),
                    plc_working: i.get(5),
                    plc_stop: i.get(6),
                    command_read: i.get(7),
                    command_write: i.get(8),
                    command_data_read: i.get(9),
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
    let sql_query = format!("update plc_status set machine_id=\"{machine_id}\", ip_address=\"{ip_address}\", plc_maker=\"{plc_maker}\", plc_use={plc_use}, command_read=\"{cr}\", command_write=\"{cw}\", command_data_read=\"{cdr}\" where num={num}",num = props.num, machine_id = props.machine_id, ip_address = props.ip_address, plc_maker = props.plc_maker, plc_use = props.plc_use, cr =props.command_read, cw = props.command_write, cdr=props.command_data_read);

    let mut db_pool = state.db_pool.clone().unwrap();
    match sqlx::query(&sql_query).fetch_all(&db_pool).await {
        Ok(v) => {
            //  *   machine_idに応じた新規データベースをセットアップする
            let sql_query = format!(
                "CREATE TABLE if not exists `{machine_id}_log` (
                `epoch_time` bigint NOT NULL,
                `machine_id` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
                `product_name` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
                `lot_num` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
                `measured_value` int unsigned NOT NULL,
                `decision` int NOT NULL,
                `resistance_value` int unsigned NOT NULL,
                `allowable_difference` int unsigned NOT NULL,
                `date_year` int NOT NULL,
                `date_month` int NOT NULL,
                `date_day` int NOT NULL,
                PRIMARY KEY (`epoch_time`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
                machine_id = props.machine_id
            );
            match sqlx::query(&sql_query).fetch_all(&db_pool).await {
                Ok(v) => Ok(()),
                Err(e) => Err(()),
            }
        }
        Err(e) => Err(()),
    }
}
