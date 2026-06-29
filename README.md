# 📝 Modern Todo List API

> **Bilingual Documentation:** This repository includes explanations in both English and Indonesian. 
> *(Dokumentasi ini tersedia dalam bahasa Inggris dan Indonesia).*

A modern, high-performance Todo List API built using Node.js, Fastify, TypeScript, and MongoDB. This project demonstrates modern backend architecture, schema-driven development, and auto-generated Swagger documentation.

---

## 🚀 Tech Stack & Why I Chose Them _(Teknologi & Alasannya)_

- **Runtime: Node.js**
- **Language: TypeScript** — Enforces strict type-safety, catching errors during development rather than at runtime. *(Menerapkan keamanan tipe data yang ketat, menangkap eror saat penulisan kode).*
- **Framework: Fastify** — Chosen over Express for its superior performance and native support for JSON schema validation. *(Dipilih menggantikan Express karena performanya yang jauh lebih cepat dan dukungan bawaan untuk validasi skema JSON).*
- **Database: MongoDB (via Mongoose)** — A schemaless NoSQL database paired with Mongoose to enforce data structure at the application level. *(Database NoSQL fleksibel yang dipadukan dengan Mongoose untuk menjaga struktur data).*
- **Documentation: Swagger / OpenAPI** — Implemented for auto-generating interactive API documentation directly from the route schemas. *(Membuat dokumentasi API interaktif secara otomatis dari skema rute).*

---

## 📁 Folder Structure _(Struktur Proyek)_

```text
backend-todo-api/
├── src/
│   ├── controllers/    # Route handlers & Fastify JSON schemas
│   ├── models/         # Mongoose database schemas & TypeScript interfaces
│   ├── routes/         # API endpoint definitions
│   └── app.ts          # Main entry point & server initialization
├── package.json        # Project manifest & scripts
└── tsconfig.json       # TypeScript compiler configuration
```

## 📦 Installation & Setup (Cara Instalasi)

### 1. **Clone the repository /_Klon repositori_:**
```text
   git clone [https://github.com/risazhrn/backend-todo-api.git](https://github.com/risazhrn/backend-todo-api.git)
   cd backend-todo-api
```

### 2. **Install dependencies /_Instal dependensi_:**
   ```text
    npm install
   ```
### 3. Database Setup / _Persiapan Database_:
Make sure you have MongoDB installed and running locally on port 27017. You can use MongoDB Compass to monitor your database.
_(Pastikan MongoDB sudah berjalan di lokal komputer pada port 27017. Kamu bisa menggunakan MongoDB Compass untuk memantau data)._

### 4. Run the development server / _Jalankan server pengembangan_:
   ```text
    npm run dev
   ```
   
   The server will start at http://localhost:3000 and automatically reload when you save changes.

## 📖 API Documentation _(Dokumentasi API)_

Once the server is running, you can access the interactive Swagger UI documentation to test the endpoints directly from your browser:
*(Setelah server berjalan, kamu dapat mengakses dokumentasi Swagger interaktif di:)*

👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

### Endpoint Summary:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/todos` | Get all todo items _(Mengambil semua daftar tugas)_ |
| `POST` | `/api/todos` | Create a new todo item _(Membuat tugas baru)_ |
| `PUT` | `/api/todos/:id` | Update a todo item _(Mengubah tugas berdasarkan ID)_ |
| `DELETE` | `/api/todos/:id` | Delete a todo item _(Menghapus tugas berdasarkan ID)_|

## 🧠 How It Works: Code Architecture _(Penjelasan Arsitektur Kode)_
_
This section breaks down the reasoning behind the core components. *(Bagian ini membedah alasan di balik komponen inti).*

### 1. Database Modeling _(Pemodelan Database)_
**File:** `src/models/todo.model.ts`

We use a TypeScript Interface for compile-time checking, and a Mongoose Schema for runtime validation. *(Kita menggunakan Interface TypeScript untuk pengecekan saat coding, dan Skema Mongoose untuk validasi saat aplikasi berjalan).*

```text
const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: [true, 'Title is required!'], trim: true },
  description: { type: String, default: '' },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
```

Why? MongoDB is schemaless by default. Using Mongoose required and default properties prevents bad data (like a Todo without a title) from entering the database.

### 2. Controllers & Schema Validation _(Logika & Validasi Skema)_
**File:** `src/controllers/todo.controller.ts`

Fastify allows us to attach JSON schemas directly to our route handlers.
```text
export const createTodoSchema = {
  schema: {
    description: 'Create a new Todo',
    tags: ['Todo'],
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', minLength: 1 },
        description: { type: 'string' }
      }
    }
  }
};
```
Why? This is the core of Schema-Driven Development. This block automatically rejects invalid incoming HTTP requests and simultaneously draws the interactive Swagger UI documentation. _(Skema ini otomatis menolak request yang salah sekaligus menggambar tampilan Swagger)._

### 3. Routing _(Pemetaan Jalur)_
**File:** `src/routes/todo.routes.ts`

Separating routes from the main application file keeps the codebase modular, readable, and easy to maintain as the project scales. _(Memisahkan rute membuat kode tetap rapi dan mudah dikelola seiring membesarnya proyek)._

### 4. Server Initialization _(Inisialisasi Server)_
**File:** `src/app.ts`

Fastify's plugin system (fastify.register) ensures that everything is loaded in the correct asynchronous order. The server won't start accepting requests until the database connection and Swagger documentation generation are fully ready.

