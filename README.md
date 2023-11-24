# Car Management API 🔥

Car Management API (Backend Only)

- Superadmin

```
username = superadmin
password = admin
```

## 🏃How to Run (Installation)

```
npm install
Edit file config/database.js with your postgre username and password
npx knex migrate:latest
npx knex seed:run
npm run dev
```

## 🔍Endpoints

```
- /api-docs = API Documentation & testing
- /api/auth/login = Login
- /api/auth/register-admin = Register Account Role Admin
- /api/cars = Post & Get Car Data
- /api/cars/:id = Get by id, Put, Delete Car Data
```