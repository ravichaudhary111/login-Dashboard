#!/bin/bash

# Login Dashboard API Curl Examples
# Run these commands to test the backend endpoints.
# Make sure the backend is running on http://localhost:8001

# 1. Register a new user
echo "Registering a new user..."
curl -X POST http://localhost:8001/user \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "name": "Test User",
    "email": "test@example.com",
    "mobile": "1234567890",
    "password": "Pass123!"
  }'

echo -e "\n\n"

# 2. Login (this will set cookies)
echo "Logging in..."
curl -X POST http://localhost:8001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Pass123!"
  }' \
  -c cookies.txt  # Save cookies to file

echo -e "\n\n"

# 3. Get user data (using cookies for auth)
echo "Getting user data..."
curl -X GET http://localhost:8001/user/USER_ID_HERE \
  -b cookies.txt  # Use saved cookies

echo -e "\n\n"

# 4. Refresh token
echo "Refreshing token..."
curl -X POST http://localhost:8001/auth/refresh \
  -b cookies.txt \
  -c cookies.txt  # Update cookies

echo -e "\n\n"

# 5. Logout
echo "Logging out..."
curl -X POST http://localhost:8001/auth/logout \
  -b cookies.txt

echo -e "\n\n"

# Clean up
rm cookies.txt
