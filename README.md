# TAHIR-SHAIKH-Uniworld-Omniport-Backend
Demo Ecommerce Backend for Uniworld Omniport

# E-Commerce Backend

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Error Handling](#error-handling)
9. [Testing](#testing)
10. [Contributing](#contributing)

## Introduction

This project provides the backend for an e-commerce website that displays various products, allows users to add them to a cart, and proceed to checkout. It includes functionalities for user management, order processing, and storing order details in a structured database.

## Features

- User registration and management
- Product listing by category
- Cart management
- Checkout process
- Order storage and retrieval

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MySQL (or any structured database like MariaDB, SQL Server)
- **ORM:** None (using raw SQL queries)
- **HTTP Client:** Axios (for handling HTTP requests in the frontend)
- **Others:** JSON for product listing

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL (or any other supported database) installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   PORT=your_port
   ```

4. Initialize the database:

   - Run the SQL script provided in `db/schema.sql` to create the necessary tables.

5. Start the server:

   ```bash
   npm start
   ```

## Project Structure

```
ecommerce-backend/
├── controllers/
│   ├── orderController.js
│   └── userController.js
├── db/
│   └── schema.sql
├── models/
│   └── db.js
├── routes/
│   ├── orderRoutes.js
│   └── userRoutes.js
├── utils/
│   └── calculateTotal.js
├── .env
├── app.js
├── package.json
└── README.md
```

- **controllers/**: Contains the controllers for handling requests and business logic.
- **db/**: Contains the database schema.
- **models/**: Contains the database connection setup.
- **routes/**: Contains the route definitions.
- **utils/**: Contains utility functions.

## Database Schema

The database schema includes the following tables:

- **Users**
  - `id` (INT, primary key)
  - `name` (VARCHAR)
  - `email` (VARCHAR)

- **Order**
  - `id` (INT, primary key)
  - `amount` (DECIMAL)
  - `user_id` (INT, foreign key)
  - `created_at` (TIMESTAMP)

- **Order_Chairs**
  - `id` (INT, primary key)
  - `order_id` (INT, foreign key)
  - `chair_id` (INT)

- **Order_Tables**
  - `id` (INT, primary key)
  - `order_id` (INT, foreign key)
  - `table_id` (INT)

- **Order_Tops**
  - `id` (INT, primary key)
  - `order_id` (INT, foreign key)
  - `top_id` (INT)

## API Endpoints

### User Endpoints

- **POST /users**
  - Create a new user
  - Request body: `{ "name": "John Doe", "email": "john.doe@example.com" }`
  - Response: `{ "status": "success", "data": { "id": 1, "name": "John Doe", "email": "john.doe@example.com" } }`

### Order Endpoints

- **POST /orders**
  - Place a new order
  - Request body: `{ "name": "John Doe", "email": "john.doe@example.com", "items": [ { "id": 1, "category": "Chairs", "price": 2000 }, ... ] }`
  - Response: `{ "status": "success", "data": "Order placed successfully" }`

## Error Handling

Errors are handled using a global error handler. In case of any error during database operations or request processing, an appropriate error message is sent back to the client with a suitable HTTP status code.

## Testing

To test the application:

1. Ensure the database is set up and running.
2. Use a tool like Postman to send HTTP requests to the API endpoints and verify the responses.

## Contributing

We welcome contributions to improve this project. To contribute, please fork the repository, create a new branch, and submit a pull request.
