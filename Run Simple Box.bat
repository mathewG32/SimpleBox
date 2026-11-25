@echo off
title Simple Box
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

if not exist "node_modules\electron\dist\electron.exe" (
  echo.
  echo  First run: installing Simple Box. This takes a minute or two...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  Install failed. Check your internet and try again.
    pause
    exit /b
  )
)

start "" "node_modules\electron\dist\electron.exe" .
exit
