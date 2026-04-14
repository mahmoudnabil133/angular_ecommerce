# E-Commerce Backend API

A RESTful backend API for an e-commerce application built with Node.js and Express.  
The system provides authentication, product and category management, and shopping cart functionality.

## Features

- User authentication (register, login, refresh token)
- Product management (create, update, delete, get products)
- Category management
- Shopping cart operations (add, remove, clear, view cart)
- RESTful API structure
- Modular backend architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- REST API

## API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

### Category
- `GET /category`
- `GET /category/:id`
- `POST /category`
- `PATCH /category/:id`
- `DELETE /category/:id`

### Product
- `GET /product`
- `GET /product/:id`
- `POST /product`
- `PATCH /product/:id`
- `DELETE /product/:id`

### Cart
- `GET /cart`
- `GET /cart/my`
- `POST /cart/add`
- `DELETE /cart/remove`
- `DELETE /cart/clear`

## Installation

```bash
git clone https://github.com/yourusername/E-commerse.git
cd E-commerse
npm install