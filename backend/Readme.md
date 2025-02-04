# Finkonomics - Unified Reward System

Finkonomics is a revolutionary project designed to unify reward systems across multiple sellers, allowing users to exchange points and use them efficiently. The backend is built with *Node.js, and the frontend is developed in **React.js*. The system enables users to utilize coins from other sellers during payments, with the system verifying and processing these transactions seamlessly.

---

## Features

1. *Cross-Seller Point Exchange*: Users can exchange points across different sellers and use them efficiently.
2. *Multi-Seller Coin Usage*: Users can use coins from other sellers during payment. The system verifies and processes these payments.
3. *Notifications and History*: Users receive notifications and can view their transaction history (upcoming in updates).
4. *Demo*: A demo showcasing the functionality of the app.

---

## Project Structure

- *Backend*: Node.js
- *Frontend*: React.js

---

## Installation

### Backend Setup

1. *Clone the repository*:
   ```bash
   git clone https://github.com/harshkhandelwal97/finkonomics
   cd finkonomics
   
## Dependency :
   
   npm install bcryptjs cloudinary cors dotenv express jsonwebtoken multer nodemailer pg twilio
   
##.env 
   PORT=3000
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   
# Run the server : 
   npm start