# Login Dashboard Backend

A Node.js backend for user authentication and management, built with Express, MongoDB, JWT, and Joi validation.

## Features

- User registration and login
- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Input validation with Joi
- CORS enabled for frontend integration
- Cookie-based session management

## Installation

1. Clone the repository and navigate to the Backend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   PORT=8001
   MONGODB_URI=mongodb://localhost:27017/login_dashboard
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   MOBILE_ENCRYPTION_KEY=32_char_key_for_mobile_encryption
   FRONTEND_ORIGIN=http://localhost:5173
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /auth/login**
  - Body: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "message": "User login successfully", "status": 200, "token": "access_token" }`
  - Sets accessToken and refreshToken cookies.

- **POST /auth/refresh**
  - Uses refreshToken cookie to get new accessToken.
  - Response: Sets new accessToken cookie.

- **POST /auth/logout**
  - Clears accessToken and refreshToken cookies.
  - Response: `{ "message": "Logout successfully", "status": 200 }`

### User Management

- **POST /user**
  - Body: `{ "username": "user", "name": "User Name", "email": "user@example.com", "mobile": "1234567890", "password": "Pass123!" }`
  - Response: `{ "message": "User created successfully", "status": 201, "data": {...} }`

- **GET /user/:id**
  - Requires authentication (accessToken cookie or Authorization header).
  - Response: `{ "message": "ok", "status": 200, "data": [...] }`

### Password Management

- **POST /auth/forgot-password**
  - Body: `{ "email": "user@example.com" }`

- **POST /auth/reset-password/:token**
  - Body: `{ "password": "newpassword" }`

## Validation

- Uses Joi for input validation.
- Password: Min 6 chars, must include letter, number, and special char.
- Mobile: Exactly 10 digits.
- Email: Valid email format.
- Returns 400 with details on validation failure.

## Technologies

- Express.js
- MongoDB with Mongoose
- JWT for tokens
- Bcrypt for password hashing
- Joi for validation
- Cors for cross-origin requests
