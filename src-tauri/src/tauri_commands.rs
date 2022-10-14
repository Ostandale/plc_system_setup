use tauri::command;

#[command]
pub fn test1_func() -> i32 {
    let a = 10;
    return a;
}

pub fn test2_func() -> i32 {
    let b = 10;
    return b * 2;
}
