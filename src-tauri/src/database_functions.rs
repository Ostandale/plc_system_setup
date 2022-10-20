use dotenvy::dotenv;
use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlPoolOptions;
use sqlx::{MySql, Pool};
use std::env;

//  *   データベース用の構造体
#[derive(Debug, Clone, Serialize)]
pub struct DabaseForSystemStatus {
    pub num: u16,
    pub machine_id: String,
    pub ip_address: String,
    pub plc_use: bool,
    pub plc_working: bool,
    pub plc_stop: bool,
    pub command_read: String,
    pub command_write: String,
    pub command_data_read: String,
}

//  *   データベースとの接続チェック
pub async fn get_db_pool(db_url: &String) -> Option<Pool<MySql>> {
    match MySqlPoolOptions::new()
        .max_connections(10)
        .connect(db_url)
        .await
    {
        Ok(v) => Some(v),
        Err(_) => None,
    }
}
