@echo off
echo ========================================
echo Fixing npm install for Windows
echo ========================================

echo Step 1: Setting PowerShell execution policy...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"

echo.
echo Step 2: Running npm install...
cd /d "%~dp0"
call npm install --legacy-peer-deps

echo.
echo ========================================
echo Done! Press any key to exit...
pause >nul
