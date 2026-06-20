// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, WindowEvent,
};

struct TrayState {
    progress_item: MenuItem,
}

struct AppSettings {
    close_to_tray: bool,
}

#[tauri::command]
fn update_tray_status(
    app: tauri::AppHandle,
    state: tauri::State<'_, Mutex<Option<TrayState>>>,
    status_text: String,
    tooltip_text: Option<String>,
) -> Result<(), String> {
    if let Some(tray_state) = state.lock().unwrap().as_ref() {
        tray_state
            .progress_item
            .set_text(&status_text)
            .map_err(|e| e.to_string())?;
    }
    if let Some(tray) = app.tray_by_id("main_tray") {
        if let Some(tooltip) = tooltip_text {
            let _ = tray.set_tooltip(Some(tooltip));
        }
    }
    Ok(())
}

#[tauri::command]
fn set_close_to_tray(
    state: tauri::State<'_, Mutex<AppSettings>>,
    value: bool,
) {
    let mut s = state.lock().unwrap();
    s.close_to_tray = value;
}

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(None::<TrayState>))
        .manage(Mutex::new(AppSettings {
            close_to_tray: true, // Default to true
        }))
        .invoke_handler(tauri::generate_handler![
            update_tray_status,
            set_close_to_tray
        ])
        .setup(|app| {
            // Create tray menu items
            let show_item = MenuItem::with_id(app, "show", "Show TransCoda", true, None::<&str>)?;
            let progress_item = MenuItem::with_id(
                app,
                "progress",
                "No active tasks",
                false,
                None::<&str>,
            )?;
            let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;

            let menu = Menu::with_items(app, &[&show_item, &progress_item, &quit_item])?;

            let _tray = TrayIconBuilder::new()
                .id("main_tray")
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .tooltip("TransCoda")
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                })
                .build(app)?;

            // Store progress item reference in state
            let state = app.state::<Mutex<Option<TrayState>>>();
            *state.lock().unwrap() = Some(TrayState { progress_item });

            Ok(())
        })
        .on_window_event(|window, event| match event {
            WindowEvent::CloseRequested { api, .. } => {
                let app = window.app_handle();
                let settings = app.state::<Mutex<AppSettings>>();
                if settings.lock().unwrap().close_to_tray {
                    window.hide().unwrap();
                    api.prevent_close();
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
