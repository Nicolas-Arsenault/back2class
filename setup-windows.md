Setup Steps
1. Install Nginx (Windows)
2. Update Nginx Configuration
First, you need to update the root path in your nginx-dev.conf file:
```
C:/Users/meterpeter/Documents/UCAT-Prep/frontend/build
```

3. Build Your React Frontend
```
cd "C:\Users\meterpeter\Documents\UCAT-Prep\frontend"
npm install
npm run build
```
4. Start Your Services
Start your Spring Boot API (port 8080):
```
cd "C:\Users\meterpeter\Documents\UCAT-Prep\api 2"
.\mvnw.cmd spring-boot:run
```

Start Nginx with your configuration:
```
# Copy your config to nginx directory or use -c flag
cd C:\ProgramData\nginx-1.28.0

nginx.exe -c "C:\Users\meterpeter\UCAT-Prep\nginx-dev-windows.conf"

# Or if nginx is installed via Chocolatey:
nginx -c "C:\Users\meterpeter\Documents\UCAT-Prep\nginx-dev.conf" -g "daemon off;"
```

5. Test the Setup
Visit http://localhost - should serve your React app
API calls to /api/* will be proxied to your Spring Boot backend on port 8080
Alternative Development Setup
For development, you might want to run the React dev server directly:

This will run the frontend on http://localhost:3000 with hot reloading, and the proxy configuration in package.json will handle API requests.

Troubleshooting
Port conflicts: Make sure port 80 isn't used by another service
Permissions: You might need to run nginx as administrator on Windows
Build directory: Ensure the frontend build directory exists before starting nginx
Backend connectivity: Verify your Spring Boot API is running on port 8080
Would you like me to help you with any specific part of this setup or troubleshoot any issues you encounter?