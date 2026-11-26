@echo off
title Building Simple Box
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is not installed.
  echo  Get the LTS version from https://nodejs.org , install it, then run this again.
  echo.
  pause
  exit /b
)

if not exist "node_modules" (
  echo  Installing tools first...
  call npm install
  if errorlevel 1 ( pause & exit /b )
)

echo.
echo  Building the Simple Box installer. This takes a few minutes the first time...
echo.
call npm run build
if errorlevel 1 (
  echo.
  echo  Build failed. See "Troubleshooting" in README.md.
  pause
  exit /b
)

echo.
echo  Done! Opening the dist folder. Double-click the "Simple Box Setup" file to install.
start "" "%~dp0dist"
pause
