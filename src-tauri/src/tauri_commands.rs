//  tauri用のコマンド類
//  tauri用のステート設定

use sqlx::{MySql, Pool};
use tauri::command;

//  ステート用構造体
#[derive(Debug)]
pub struct StateValue {
    pub db_pool: Option<Pool<MySql>>,
}

#[command]
pub fn test1_func() -> i32 {
    let a = 10;
    return a;
}

pub fn test2_func() -> i32 {
    let b = 10;
    return b * 2;
}
