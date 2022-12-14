#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod database_functions;
mod tauri_commands;

use dotenvy::dotenv;

use std::env;

//
#[tokio::main]
async fn main() {
    dotenv().ok();
<<<<<<< HEAD
    let db_url =
        &env::var("DATABASE_URL").expect(".envファイルの位置、DATABASE_URLの内容を見直して下さい");

    //  データベースとの接続チェック
    let pool = database_functions::get_db_pool(db_url).await;
    if pool.is_none() {
        panic!("データベースに接続できません");
    }

    //  データベースに接続できたらプールをステートに登録してコマンドから使えるようにする
    let state_value = tauri_commands::StateValue {
        db_pool: pool.clone(),
    };

    //  !
=======
    //  test
>>>>>>> 1d24afe0bdba984be1d6564bf40235647e808f4d
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            tauri_commands::test1_func,
            tauri_commands::read_status,
            tauri_commands::update_plc_data,
        ])
        .manage(state_value)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
