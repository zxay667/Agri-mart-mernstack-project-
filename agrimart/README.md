# AgriMart - Farming Supplies E-commerce Platform

AgriMart is a full-stack e-commerce platform for farming supplies built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Full-featured shopping cart
- Product reviews and ratings
- Product search feature
- Product filtering by category
- User profile with orders
- Admin product management
- Admin user management
- Admin order details page
- Checkout process (shipping, payment method, etc)
- Database seeder (products & users)

## Usage

### Environment Variables

Create a `.env` file in the backend directory and add the following:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Install Dependencies (Backend)

```
cd backend
npm install
```

### Install Dependencies (Frontend)

```
cd frontend
npm install
```

### Run

```
# Run backend (:5000) & frontend (:3000)
cd backend
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

### Seed Database

You can use the following commands to seed the database with sample users and products or destroy all data:

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

### Sample User Logins

```
admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

## Build & Deploy

```
# Create frontend production build
cd frontend
npm run build
```

## License

This project is licensed under the MIT License.
