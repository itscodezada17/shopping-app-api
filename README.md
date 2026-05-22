# Shopping App API

Express and MySQL backend for a simple shopping app.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Update `.env` with your local MySQL credentials and JWT settings before starting the app.

Create the wishlist table before using wishlist routes:

```bash
mysql -u <user> -p <database> < db/schema.sql
```

## Scripts

- `npm start`: run the server with Node.
- `npm run dev`: run the server with Nodemon.

## Routes

- `GET /health`
- `GET /api/items`
- `GET /api/users`
- `POST /api/users`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /api/wishlist`
- `POST /api/wishlist/items/:itemId`
- `DELETE /api/wishlist/items/:itemId`
- `GET /cart/:userId`
- `POST /cart/:userId/add`
- `DELETE /cart/:userId/remove/:itemId`
- `PUT /cart/:userId/update/:itemId`

Wishlist routes require `Authorization: Bearer <token>` and use the authenticated user from the JWT. Do not pass `userId` from the client for wishlist operations.
