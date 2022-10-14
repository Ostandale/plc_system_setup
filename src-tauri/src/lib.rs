mod database_functions;
mod etc_functions;
mod tauri_commands;

//  !   エラーテスト用
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test1() {
        assert_eq!(tauri_commands::test1_func(), 10);
        assert_eq!(tauri_commands::test2_func(), 20);
    }
}
