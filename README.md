# Habit Tracker

> A Habit Tracker App built with **Next.js** and **GoLang**

A simple and intuitive application to track your daily habits and build better routines.

## Features

- 🎯 Track daily habits
- ✅ Mark habits as completed
- 📊 Clean and modern UI
- 🚀 Built with Next.js 15 and Go
- 🎨 Styled with Tailwind CSS

## Project Structure

```
habit-tracker/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   └── app/
│   │       ├── home/           # Home page
│   │       ├── habit-tracker/  # Habit tracker page
│   │       └── layout.tsx      # Root layout
│   └── public/        # Static assets
└── backend/           # Go backend API
    ├── models/        # Data models
    ├── routes/        # API routes
    └── main.go        # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Go 1.24+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

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

## Deployment

### Frontend (Vercel)

The easiest way to deploy the Next.js frontend is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the root directory to `frontend`
4. Deploy!

### Backend (Any Go-compatible host)

The backend can be deployed to any platform that supports Go applications:

- Render
- Railway
- Heroku
- Digital Ocean
- AWS/GCP/Azure

Make sure to set `GIN_MODE=release` environment variable in production.

## License

All rights reserved © 2025 Jockey12
