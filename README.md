# Simple Box

A simple wireframe and project planner for freelance websites and apps. Think "MS Paint meets Azure Boards", minus the enterprise stuff.

Open a blank canvas for each client job, lay out the pages, drag in headers, footers and other parts, draw where each button goes, and track tasks. When you're ready to build, **Copy for Claude** turns the whole project into a clean written spec.

## Download

Go to **[Releases](https://github.com/mathewG32/SimpleBox/releases/latest)** and download **`Simple Box Setup 1.0.0.exe`**. Run it, click through, and Simple Box shows up on your desktop and in the Start menu. No admin rights needed.

There's also a **Portable** `.exe` that runs without installing.

> Windows may say "Windows protected your PC" because the installer isn't code-signed. Click **More info**, then **Run anyway**.

To uninstall: Settings > Apps > Simple Box > Uninstall. Your projects stay in `%APPDATA%\Simple Box`, so reinstalling brings them back.

## Features

- **Start presets**: Blank, Mobile, App or Website (one empty page), or a full starter with pages already filled in and linked
- **Canvas**: pan, pinch or Ctrl + scroll to zoom, fit to screen, undo/redo
- **Snapping**: grid snap plus smart alignment guides (pink lines) to edges and centers of other items. Toggle it in the top bar, or hold **Alt** to skip it once
- **Tools**: pages and sections, shapes (rectangle, square, circle, triangle, diamond, rounded), text boxes, sticky notes, tasks, arrows, a pen, and images (button, paste or drag and drop)
- **Components**: 19 wireframe parts (header, hero, features, pricing, gallery, footer, card, button, form, map, tab bar and more) plus 5 whole-page templates. Drag them onto a page; headers and footers snap into place
- **Flow arrows**: link a button or page to the next page, with a label like "Log in"
- **Project details**: vibe, color palette (with presets), fonts, corner style, imagery, goals, audience, must-haves
- **Build notes** on any item
- **Copy for Claude**: exports a plain-text / Markdown spec of every page, top to bottom, with the flow and notes
- **Backup / Restore** as JSON, and in the desktop app, save backups and exports straight to files

## Run it (Windows)

1. Install **Node.js LTS** from https://nodejs.org (only once).
2. Double-click **`Run Simple Box.bat`**. The first time, it installs what it needs (a minute or two), then opens the app. After that it opens right away.

## Build the installer yourself

1. Double-click **`Build Installer.bat`**. It takes a few minutes the first time.
2. It opens the `dist` folder with **`Simple Box Setup 1.0.0.exe`** and a portable `.exe`.

**Automatic builds:** `.github/workflows/release.yml` builds the installer on GitHub's servers. Push a version tag (for example `git tag v1.0.1 && git push --tags`) and the installer is attached to a new Release automatically.

To ship a new version: bump `"version"` in `package.json`, commit, then tag and push.

## From a terminal

```bash
npm install
npm start        # run the app
npm run build    # build the Windows installer into dist/
```

## Project layout

```
app/index.html   the whole app: one HTML file, no frameworks
main.js          Electron window, file saving, opening links in your browser
preload.js       small safe bridge between the page and the desktop features
build/icon.png   app icon (icon.ico for Windows)
build/installer.nsi  standalone NSIS installer script (alternative to electron-builder)
.github/workflows/release.yml  builds the installer on GitHub when you push a tag
```

## Where your data lives

Projects save automatically inside the app's own storage on your PC (`%APPDATA%\Simple Box`). Use **Backup** on the home screen to save everything to a `.json` file, and **Restore** to load it on another computer.

## Troubleshooting

- **"Cannot create symbolic link" while building**: turn on Windows *Developer Mode* (Settings > System > For developers), or run `Build Installer.bat` as administrator, then try again.
- **Build or install errors inside OneDrive** (EPERM, file locked): OneDrive can lock files while syncing. Move the folder somewhere like `C:\Dev\Simple Box` and run it from there.
- **Windows SmartScreen warns about the installer**: the installer isn't code-signed. Click *More info* > *Run anyway*.

## License

MIT, see [LICENSE](LICENSE).
