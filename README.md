# Nest Starter Template

A starter template for building RESTful APIs with NestJS, Prisma ORM, and JWT Authentication.

---

## Features

- NestJS framework with modular architecture
- Prisma ORM for database access
- JWT-based authentication and authorization
- Input validation with `class-validator` and `ValidationPipe`
- Swagger API documentation with bearer token support
- Global PrismaService for database connection management
- Github Workflows (CI/CD Pipeline)
- Testing Coming soon!

---

## Getting Started

### Prerequisites

- Node.js v16+
- pnpm or npm
- PostgreSQL or other supported database

### Installation

1. Clone the repository

```bash
git clone https://github.com/Mikepn02/nest-stater-template
cd nest-starter-template
```

2. Install Dependencies
```bash
pnpm install
```

3. Set up environment variables .env file

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="1d"
PORT=8000
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=johndoe@example.com
MAIL_PASS=pass1234
APP_URL=http://localhost:8000
```

4. Generate Prisma Client

```bash
pnpm prisma generate
```

5. Run DB Migrations

```bash
pnpm prisma migrate dev
```

6. Running Application

```bash
pnpm dev
```


### API Documentation

Swagger UI is available at: ```url http://localhost:8000/api-docs ```





