# 📝 Modern Todo List API

> **Bilingual Documentation:** This repository includes explanations in both English and Indonesian. 
> *(Dokumentasi ini tersedia dalam bahasa Inggris dan Indonesia).*

A modern, high-performance Todo List API built using Node.js, Fastify, TypeScript, and MongoDB. This project demonstrates modern backend architecture, schema-driven development, and auto-generated Swagger documentation.

---

## 🚀 Tech Stack & Why I Chose Them (Teknologi & Alasannya)

- **Runtime: Node.js**
- **Language: TypeScript** — Enforces strict type-safety, catching errors during development rather than at runtime. *(Menerapkan keamanan tipe data yang ketat, menangkap eror saat penulisan kode).*
- **Framework: Fastify** — Chosen over Express for its superior performance and native support for JSON schema validation. *(Dipilih menggantikan Express karena performanya yang jauh lebih cepat dan dukungan bawaan untuk validasi skema JSON).*
- **Database: MongoDB (via Mongoose)** — A schemaless NoSQL database paired with Mongoose to enforce data structure at the application level. *(Database NoSQL fleksibel yang dipadukan dengan Mongoose untuk menjaga struktur data).*
- **Documentation: Swagger / OpenAPI** — Implemented for auto-generating interactive API documentation directly from the route schemas. *(Membuat dokumentasi API interaktif secara otomatis dari skema rute).*

---

## 📁 Folder Structure (Struktur Proyek)

```text
backend-todo-api/
├── src/
│   ├── controllers/    # Route handlers & Fastify JSON schemas
│   ├── models/         # Mongoose database schemas & TypeScript interfaces
│   ├── routes/         # API endpoint definitions
│   └── app.ts          # Main entry point & server initialization
├── package.json        # Project manifest & scripts
└── tsconfig.json       # TypeScript compiler configuration
