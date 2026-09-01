@echo off
echo 🚀 Building and preparing for Netlify deployment...
echo.

npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo 📁 Your dist folder is ready for deployment
echo.
echo 🌐 Go to: https://app.netlify.com/drop
echo 📂 Drag and drop the "dist" folder
echo.
echo 🎉 Your site will be live in seconds!
echo.
pause
