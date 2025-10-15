# Habit Tracker

> A Habit Tracker App built with **Next.js** and **GoLang**

A simple and intuitive application to track your daily habits and build better routines.

## Features

- 🎯 Track daily habits with custom titles and descriptions
- ✅ Mark habits as completed/uncompleted
- ➕ Add new habits with frequency settings (daily, weekly, monthly)
- 🗑️ Delete habits you no longer need
- 📊 Clean and modern UI with visual feedback
- 🚀 Built with Next.js 15 and Go
- 🎨 Styled with Tailwind CSS
- 💾 SQLite database for persistent storage
- 🐳 Docker support for easy deployment

## Project Structure

```
habit-tracker/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── home/           # Home page
│   │   │   ├── habit-tracker/  # Habit tracker page
│   │   │   └── layout.tsx      # Root layout
│   │   └── services/           # API service layer
│   ├── public/        # Static assets
│   └── Dockerfile     # Docker configuration
└── backend/           # Go backend API
    ├── database/      # Database initialization
    ├── handlers/      # Request handlers
    ├── models/        # Data models
    ├── routes/        # API routes
    ├── main.go        # Entry point
    └── Dockerfile     # Docker configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Go 1.24+
- OR Docker and Docker Compose (for containerized setup)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

**Environment Variables**

Create a `.env.local` file in the `frontend` directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Backend Setup

```bash
cd backend
go mod download
go build -o habit-tracker
./habit-tracker
```

The backend API will be available at [http://localhost:8080](http://localhost:8080)

#### API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/habits` - Get all habits
- `GET /api/habits/:id` - Get a specific habit
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/:id` - Update a habit
- `DELETE /api/habits/:id` - Delete a habit
- `PATCH /api/habits/:id/toggle` - Toggle habit completion status

## Building for Production

### Frontend

```bash
cd frontend
npm run build
npm start
```

### Backend

```bash
cd backend
go build -o habit-tracker
./habit-tracker
```

#### Environment Variables

- `GIN_MODE=release` - Set to release mode for production
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins for CORS (e.g., `https://yourdomain.com,https://www.yourdomain.com`)

Example:
```bash
export GIN_MODE=release
export ALLOWED_ORIGINS=https://yourdomain.com
./habit-tracker
```

## Deployment

### Using Docker Compose (Recommended for Quick Deployment)

The easiest way to deploy the entire application:

```bash
# Build and run both frontend and backend
docker-compose up -d

# Stop the application
docker-compose down
```

The application will be available at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080](http://localhost:8080)

### Frontend (Vercel)

The easiest way to deploy the Next.js frontend is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL` (your backend API URL)
5. Deploy!

### Backend (Any Go-compatible host)

The backend can be deployed to any platform that supports Go applications or Docker:

**Docker Deployment:**
```bash
cd backend
docker build -t habit-tracker-backend .
docker run -p 8080:8080 -e GIN_MODE=release habit-tracker-backend
```

**Platform Options:**
- Render
- Railway
- Fly.io
- Heroku
- Digital Ocean
- AWS/GCP/Azure

Make sure to set these environment variables in production:
- `GIN_MODE=release` - Set to release mode for production
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins for CORS (e.g., `https://yourdomain.com`)

### Database Persistence

The SQLite database file (`habits.db`) is stored in the application directory. For production deployments:
- Use Docker volumes to persist the database
- Consider using a managed database service for high-availability scenarios
- Regular backups are recommended

## License

All rights reserved © 2025 Jockey12
