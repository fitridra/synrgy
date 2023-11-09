## How to run
Pertama lakukan penginstalan menggunakan npm

```bash
npm install
```

lalu ubah file config yakni username, password, dan database yang akan digunakan

lalu lakukan migration

```bash
npm migrate
```

Terakhir, anda dapat menjalankan aplikasinya

```bash
npm run dev
```

## Endpoints

### Endpoints Routes
GET "/" => Routes pada list car

GET "/form" => Routes pada form tambah data

GET "/form/:id" => Routes pada edit data

### Endpoints REST API
GET /api/cars -> Getting all cars

GET /api/cars/:id -> Getting a specific car by id

POST /api/cars -> Creating a car

PUT /api/cars -> Update a car

DELETE /api/cars/:id -> Deleting a specific car by id

## Directory Structure

```
.
├── config
│   ├── migrations
│   │   ├── 20231109144022_create_cars_table.js
│   │   └── 20231109144453_create_sizes_table.js
│   └── knexfile.js
├── routes
│   ├── api
│   │   └── cars
│   │       └── cars.js
│   └── cars
│       └── cars.js
├── .gitignore
├── app.js
├── erd.jpg
├── package-lock.json
├── package.json
└── README.md
```

## ERD
![Entity Relationship Diagram](erd.jpg)

