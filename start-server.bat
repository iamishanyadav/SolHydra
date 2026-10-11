@echo off
title SolHydra Local Web Server
echo ===================================================
echo   Starting SolHydra Local Server (Port 8000)
echo   Creator: Ishan Yadav
echo ===================================================
echo.
echo Opening http://localhost:8000 in your browser...
start http://localhost:8000
python -m http.server 8000
if %errorlevel% neq 0 (
    echo Python server failed or was closed. Trying npx serve...
    npx serve .
)
pause
