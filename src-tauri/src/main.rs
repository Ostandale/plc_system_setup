#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod tauri_commands;

use dotenvy::dotenv;
use sqlx::mysql::MySqlPoolOptions;

use std::env;

//
#[tokio::main]
async fn main() {
    dotenv().ok();
    //
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![tauri_commands::test1_func,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
