# EvenForge: Event Management and Real-Time Chat Platform

![EvenForge Logo](https://via.placeholder.com/150?text=EvenForge) <!-- Replace with actual logo if available -->

## Overview

EvenForge is a full-stack web application designed to facilitate event creation, management, and real-time collaboration. Users can register, log in, create events, join existing events, and participate in dedicated chat rooms for each event. This platform is ideal for communities, organizations, or individuals organizing virtual or in-person events, with seamless real-time chatting powered by Socket.IO for interactive discussions among participants.

The project is built with a modern tech stack, emphasizing scalability, security, and user experience. It includes user authentication, event CRUD operations, event joining mechanics, and per-event chat rooms with persistent message history stored in MongoDB.

**Current Status**: Under active development (as of January 2026). Core features are functional, but additional enhancements like notifications, user profiles, and advanced search are planned.

**Demo**: [Live Demo Link] (Coming soon – deploy to Vercel/Netlify/Heroku for production).

**Repository Structure**:
- `/backend`: Node.js/Express server, API routes, Socket.IO integration, MongoDB models.
- `/frontend`: React app with components for UI, authentication, events, and chat.
- `/public`: Static assets (images, etc.).
- `/docs`: Additional documentation (if added).
- Root files: Configuration like `package.json`, `.env.example`.

## Features

### User Authentication
- **Registration**: Users can create accounts with email, password, and optional details (e.g., name). Passwords are hashed using bcrypt for security.
- **Login**: Secure JWT-based authentication. Tokens are stored in localStorage for session persistence.
- **Logout**: Clears token and redirects to login page.
- **Protected Routes**: API endpoints require authentication middleware to prevent unauthorized access.

### Event Management
- **Create Events**: Authenticated users can create new events with details like title, description, date, location, image URL, and capacity.
- **View Events**: Public listing of all events with search/filter options (e.g., by date, location).
- **Join Events**: Users can join events, updating their `eventsJoined` array in the User model. Uses `$addToSet` to avoid duplicates.
- **Event Population**: When fetching user-joined events, populate full event details from the Event model using Mongoose `.populate()`.

### Real-Time Chat
- **Per-Event Chat Rooms**: Each event has a dedicated chat room using Socket.IO rooms (room name = `eventId`).
- **Join/Leave Rooms**: Automatically handled when selecting an event in the UI.
- **Send Messages**: Real-time messaging with user names and timestamps.
- **Message History**: Persisted in MongoDB and loaded via HTTP API on room join.
- **UI**: Modern chat interface with left pane (event list), right pane (messages + input), glassmorphic design, auto-scroll, and own-message highlighting.

### Database Integration
- **MongoDB Schemas**:
  - **User**: `_id`, `email`, `password`, `name`, `eventsJoined` (array of Event IDs, ref: 'Event').
  - **Event**: `_id`, `title`, `description`, `date`, `location`, `img`, `creator` (ref: 'User'), `participants` (array of User IDs).
  - **Message**: `_id`, `eventId` (ref: 'Event'), `userId` (ref: 'User'), `userName`, `message`, `timestamp`.
- **Indexes**: Compound index on `Message` for `{ eventId: 1, timestamp: -1 }` for fast queries.
- **Population**: Used for fetching full event details instead of just IDs.

### Additional Features
- **Refresh Context**: Custom React context (`EventRefreshProvider`) to trigger event list refreshes after joins/creations.
- **Toast Notifications**: Using libraries like Sonner or react-hot-toast for success/error messages (e.g., "Successfully Joined Event").
- **CSS Modules**: Modular styling with modern designs (glassmorphism, dark mode ready, hover effects).
- **Error Handling**: Network errors, 404s, and validation in API responses.

## Tech Stack

### Backend
- **Node.js & Express**: Server framework for API routes.
- **MongoDB & Mongoose**: Database for users, events, and messages.
- **Socket.IO**: Real-time bidirectional communication for chat.
- **JWT & Bcrypt**: Authentication and password hashing.
- **CORS**: Enabled for frontend integration.
- **Other**: dotenv for environment variables, nodemon for development watching.

### Frontend
- **React**: UI library with hooks (useState, useEffect, useRef, useContext).
- **Socket.IO-Client**: For real-time chat integration.
- **CSS Modules**: Scoped styling for components.
- **Fetch API/Axios**: For HTTP requests to backend.
- **LocalStorage**: For user token persistence.
- **Other**: react-hot-toast/Sonner for notifications, custom contexts for state management.

### Development Tools
- **npm**: Package manager.
- **Git**: Version control.

## Prerequisites

Before setting up the project locally, ensure you have:
- **Node.js**: Version 14+ (recommended 18+ for best performance). Download from [nodejs.org](https://nodejs.org).
- **MongoDB**: Local instance or cloud (e.g., MongoDB Atlas). For local: Install from [mongodb.com](https://www.mongodb.com/try/download/community) and run `mongod`.
- **Git**: For cloning the repository.
- A code editor like VS Code.

## Installation and Setup

Follow these steps to get EvenForge running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/evenforge.git  # Replace with your repo URL
cd evenforge
```

### 2. Set Up Environment Variables
- Create a `.env` file in the `/backend` directory (copy from `.env.example` if available).
- Add the following keys:

```
PORT=8000  # Backend server port
MONGO_URI=mongodb://localhost:27017/evenforge  # Your MongoDB connection string (local or Atlas)
JWT_SECRET=your_jwt_secret_here  # Strong secret for JWT signing (generate with crypto.randomBytes)
```

For MongoDB Atlas:
- Sign up at [cloud.mongodb.com](https://cloud.mongodb.com).
- Create a cluster, get the connection string, and replace placeholders with your DB user/password.

### 3. Install Dependencies
The project has separate frontend and backend packages. Install both.

- **Backend**:
  ```bash
  cd backend
  npm install
  ```

- **Frontend**:
  ```bash
  cd ../frontend
  npm install
  ```

Common dependencies: express, mongoose, socket.io, jsonwebtoken, bcryptjs, cors, dotenv (backend); react, socket.io-client, react-hot-toast (frontend).

### 4. Database Setup
- Start MongoDB: `mongod` (local) or ensure Atlas is connected.
- The app will auto-create collections (Users, Events, Messages) on first use.
- Optional: Seed data – run a script if added (e.g., `node backend/seeds.js` for sample events/users).

### 5. Running the Project

#### Backend
- Use `npm run watch` for development (uses nodemon to auto-restart on changes):
  ```bash
  cd backend
  npm run watch
  ```
- This starts the Express server on `http://localhost:8000` with Socket.IO attached.
- Test API: `curl http://localhost:8000/api/events` (or use Postman).

#### Frontend
- Use `npm run dev` for development (uses Vite or Create React App dev server):
  ```bash
  cd frontend
  npm run dev
  ```
- This starts the React app on `http://localhost:3000` (default).
- The frontend proxies API requests to backend (configure in `vite.config.js` or `package.json` proxy if needed).

#### Full Stack
- Open two terminals: one for backend (`npm run watch`), one for frontend (`npm run dev`).
- Visit `http://localhost:3000` in your browser.
- Register/login to start creating/joining events and chatting.

### Troubleshooting Setup
- **MongoDB Connection Error**: Check `MONGO_URI` in `.env`. Ensure MongoDB is running (`mongo` shell to test).
- **CORS Issues**: Ensure backend CORS allows `http://localhost:3000`.
- **Socket.IO Connection Fail**: Verify frontend socket URL matches backend port (`io('http://localhost:8000')`).
- **NPM Errors**: Run `npm cache clean --force` and reinstall.
- **Port Conflicts**: Change PORT in `.env` if 8000/3000 are occupied.
- Logs: Backend console for API/Socket errors; Browser console (F12) for frontend.

## Usage Guide

### Getting Started
1. **Register/Login**: Go to `/register` or `/login`. Use valid email/password.
2. **Create Event**: Navigate to event creation form, fill details, submit.
3. **Join Event**: Browse events, click "Join" – updates your profile and enables chat.
4. **Chat**: Select joined event from left pane – load history, send messages. Real-time updates for all participants.

### API Endpoints (Detailed)
- **Auth**:
  - POST `/api/register`: { email, password, name } → JWT token.
  - POST `/api/login`: { email, password } → JWT token.

- **Events**:
  - POST `/api/events`: Create event (auth required) – { title, description, date, location, img }.
  - GET `/api/events`: List all events.
  - POST `/api/eventJoined`: Join event – { userId, eventId }.

- **User Events**:
  - POST `/api/getEventsForUser`: { userId } → Populated list of joined events.

- **Chat History**:
  - GET `/api/messages?eventId=xxx&limit=50`: Fetch messages for event.

- Socket Events:
  - `joinEventChat(eventId)`: Join room.
  - `leaveEventChat(eventId)`: Leave room.
  - `sendMessage({ eventId, message, userName, userId })`: Send and save message.
  - `newMessage`: Receive real-time message.

### Security Notes
- JWT tokens expire (configure in backend).
- Input validation: Use Joi/Express-validator in routes (add if not present).
- Rate limiting: Add express-rate-limit for API protection.
- HTTPS: Use in production (via Nginx/Let's Encrypt).

## Contributing

Contributions welcome! Follow these steps:
1. Fork the repo.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your-feature"`.
4. Push: `git push origin feature/your-feature`.
5. Open Pull Request with detailed description.

**Code Style**: ESLint/Prettier enforced (run `npm run lint`).
**Issues**: Report bugs or suggest features via GitHub Issues.

## License

MIT License – free to use, modify, distribute. See [LICENSE](LICENSE) file.

## Acknowledgments

- Inspired by event platforms like Eventbrite + chat like Discord.
- Built with open-source tools: React, Node.js, MongoDB, Socket.IO.
- Thanks to xAI/Grok for development assistance.

For questions: [your.email@example.com] or GitHub Issues.

Happy event forging! 🎉
