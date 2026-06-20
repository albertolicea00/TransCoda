// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem, Submenu},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, WindowEvent,
};
use rfd::{MessageDialog, MessageLevel};

struct TrayState {
    progress_item: MenuItem<tauri::Wry>,
}

struct AppSettings {
    close_to_tray: bool,
}

#[tauri::command]
fn open_settings_window(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("settings") {
        let _ = window.show();
        let _ = window.set_focus();
    } else {
        // Create the settings window
        let settings_window = tauri::WebviewWindowBuilder::new(
            &app,
            "settings",
            tauri::WebviewUrl::App("index.html?window=settings".into()),
        )
        .title("Preferences")
        .inner_size(500.0, 600.0)
        .resizable(false)
        .build()
        .map_err(|e| e.to_string())?;

        let _ = settings_window.show();
        let _ = settings_window.set_focus();
    }
    Ok(())
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
            open_settings_window,
            update_tray_status,
            set_close_to_tray
        ])
        .setup(|app| {
            // Create native app menu bar
            let preferences_item = MenuItem::with_id(
                app,
                "preferences",
                "Preferences...",
                true,
                Some("CmdOrCtrl+,"),
            )?;
            let check_updates_item = MenuItem::with_id(
                app,
                "check_updates",
                "Check for Updates...",
                true,
                None::<&str>,
            )?;
            let help_item = MenuItem::with_id(
                app,
                "help",
                "TransCoda Help",
                true,
                Some("F1"),
            )?;
            let about_item = MenuItem::with_id(
                app,
                "about",
                "About TransCoda",
                true,
                None::<&str>,
            )?;
            let quit_menu_item = MenuItem::with_id(
                app,
                "quit_app",
                "Quit TransCoda",
                true,
                Some("CmdOrCtrl+Q"),
            )?;

            // Create App submenu
            let app_submenu = Submenu::with_items(
                app,
                "TransCoda",
                true,
                &[
                    &about_item,
                    &PredefinedMenuItem::separator(app)?,
                    &preferences_item,
                    &PredefinedMenuItem::separator(app)?,
                    &check_updates_item,
                    &PredefinedMenuItem::separator(app)?,
                    &quit_menu_item,
                ],
            )?;

            // Create Help submenu
            let help_submenu = Submenu::with_items(
                app,
                "Help",
                true,
                &[
                    &help_item,
                ],
            )?;

            let menu = Menu::with_items(app, &[&app_submenu, &help_submenu])?;
            app.set_menu(menu)?;

            // Listen to menu events
            app.on_menu_event(move |app_h, event| {
                match event.id.as_ref() {
                    "preferences" => {
                        let _ = open_settings_window(app_h.clone());
                    }
                    "about" => {
                        MessageDialog::new()
                            .set_title("About TransCoda")
                            .set_description("TransCoda v1.0.0\nEvery file deserves a fabulous finale.\n\nCreated with pride 🌈")
                            .set_level(MessageLevel::Info)
                            .show();
                    }
                    "check_updates" => {
                        MessageDialog::new()
                            .set_title("Check for Updates")
                            .set_description("You are running the most fabulous version!\nTransCoda v1.0.0 is up to date. 🦄✨")
                            .set_level(MessageLevel::Info)
                            .show();
                    }
                    "help" => {
                        let _ = open::that("https://github.com/albertolicea00/TransCoda");
                    }
                    "quit_app" => {
                        app_h.exit(0);
                    }
                    _ => {}
                }
            });

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

            let tray_menu = Menu::with_items(app, &[&show_item, &progress_item, &quit_item])?;

            let _tray = TrayIconBuilder::<tauri::Wry>::with_id("main_tray")
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&tray_menu)
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
                if window.label() == "main" {
                    let app = window.app_handle();
                    let settings = app.state::<Mutex<AppSettings>>();
                    if settings.lock().unwrap().close_to_tray {
                        window.hide().unwrap();
                        api.prevent_close();
                    }
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
