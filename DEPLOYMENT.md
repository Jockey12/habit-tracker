# Deployment Guide

This guide covers different deployment options for the Habit Tracker application.

## Quick Start with Docker Compose

The easiest way to run the entire application:

```bash
# Clone the repository
git clone https://github.com/Jockey12/habit-tracker.git
cd habit-tracker

# Start the application
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```

## Development Setup

### Backend

```bash
cd backend
go mod download
go build -o habit-tracker
./habit-tracker
```

The backend will be available at `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

Don't forget to create `.env.local` in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Production Deployment

### Option 1: Docker (Recommended)

**Backend:**
```bash
cd backend
docker build -t habit-tracker-backend .
docker run -d \
  -p 8080:8080 \
  -e GIN_MODE=release \
  -e ALLOWED_ORIGINS=https://your-frontend-domain.com \
  -v $(pwd)/data:/root \
  habit-tracker-backend
```

**Frontend:**
```bash
cd frontend
docker build -t habit-tracker-frontend .
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-backend-api.com \
  habit-tracker-frontend
```

### Option 2: Platform as a Service

#### Frontend on Vercel
1. Push code to GitHub
2. Import repository in Vercel
3. Set root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Deploy!

#### Backend on Fly.io
```bash
cd backend
fly launch
fly secrets set GIN_MODE=release
fly secrets set ALLOWED_ORIGINS=https://your-frontend.vercel.app
fly deploy
```

#### Backend on Render
1. Create a new Web Service
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Build command: `go build -o habit-tracker`
5. Start command: `./habit-tracker`
6. Add environment variables:
   - `GIN_MODE=release`
   - `ALLOWED_ORIGINS=https://your-frontend-domain.com`

#### Backend on Railway
1. Create a new project
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Railway will auto-detect Go and build
5. Add environment variables in the dashboard

### Option 3: Traditional Server

**Backend:**
```bash
cd backend
go build -o habit-tracker
export GIN_MODE=release
export ALLOWED_ORIGINS=https://your-frontend-domain.com
nohup ./habit-tracker &
```

Use a process manager like systemd or PM2 for production.

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

Use a process manager and reverse proxy (nginx) for production.

## Environment Variables

### Backend
- `GIN_MODE`: Set to `release` for production
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins
- `PORT`: Server port (default: 8080)

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL (required)
- `PORT`: Server port (default: 3000)

## Database

The application uses SQLite for data persistence. The database file `habits.db` is created automatically on first run.

For production:
- Use Docker volumes to persist data
- Regular backups recommended
- For high-traffic scenarios, consider migrating to PostgreSQL (requires code changes)

## CORS Configuration

Make sure to configure CORS properly:
- For development: Use `ALLOWED_ORIGINS=*` (already default)
- For production: Set `ALLOWED_ORIGINS` to your frontend domain(s)

Example:
```bash
export ALLOWED_ORIGINS=https://myapp.vercel.app,https://www.myapp.com
```

## Monitoring

Consider adding:
- Application logs monitoring
- Database backups
- Uptime monitoring
- Error tracking (e.g., Sentry)

## Security Checklist

- ✅ CORS properly configured
- ✅ Use HTTPS in production
- ✅ Environment variables for secrets
- ✅ Regular security updates
- ✅ Database backups
- ✅ Rate limiting (recommended for production)
- ✅ Input validation (implemented in handlers)

## Troubleshooting

**Frontend can't connect to backend:**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify CORS settings on backend
- Ensure backend is running and accessible

**Database errors:**
- Check file permissions on `habits.db`
- Ensure SQLite is available
- Verify disk space

**Build failures:**
- Go version: 1.24+
- Node version: 18+
- Clean build: `go clean` / `npm run clean` and rebuild

## Support

For issues and questions, please open an issue on GitHub.
