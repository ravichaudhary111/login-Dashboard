# Login Dashboard

A full-stack web application featuring a login and registration system with a dashboard. Built with a React frontend and Node.js backend.

## Project Structure

- **Frontend/**: React application using Vite for the user interface (login, register, profile).
- **Backend/**: Node.js server with Express, handling authentication, user management, and API endpoints.

## Features

- User registration and login
- JWT-based authentication
- Password reset functionality
- User profile management
- Responsive UI with modern design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ravichaudhary111/login-Dashboard.git
   cd login-Dashboard
   ```

2. Install backend dependencies:
   ```
   cd Backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../Frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```
   cd Backend
   npm start
   ```
   The server will run on `http://localhost:3000` (or check the console for the port).

2. Start the frontend development server:
   ```
   cd ../Frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default Vite port).

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/user/profile` - Get user profile
- `POST /api/password/reset` - Request password reset

## Technologies Used

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express.js, MongoDB (assumed from models), JWT
- **Database**: MongoDB
- **Authentication**: JWT with refresh tokens

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
