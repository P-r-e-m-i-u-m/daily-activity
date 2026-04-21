# NodeFlow API

> A high-performance REST API built with Node.js, Redis caching, JWT auth, and PostgreSQL.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Redis](https://img.shields.io/badge/Redis-7.x-red)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Features
- JWT authentication with Redis session caching
- Rate limiting middleware to prevent API abuse
- Cursor-based pagination for large datasets
- Structured logging with log levels
- Async retry logic for external API calls
- Composite DB indexing for query performance
- CORS policy hardened for production
- Health check endpoint with DB and cache status

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18 |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Auth | JWT + bcrypt |
| Queue | Bull (Redis-backed) |
| Logging | Custom structured logger |

## Getting Started

```bash
git clone https://github.com/P-r-e-m-i-u-m/nodeflow-api
cd nodeflow-api
cp .env.example .env
npm install
npm run dev
```

## Project Structure
```
src/
├── config/        # CORS, DB, Redis config
├── middleware/    # Auth, rate limiter, error handler
├── routes/        # API route definitions
├── services/      # Business logic, cache, logger
├── utils/         # Pagination, retry, sanitize
└── db/
    └── migrations/ # SQL migration files
```

## Environment Variables
Copy `.env.example` and fill in your values.

## License
MIT
