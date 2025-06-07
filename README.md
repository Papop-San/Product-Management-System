# Product Management System

ระบบจัดการสินค้า (Product Management System) ที่พัฒนาด้วย Next.js (TypeScript) เป็น Frontend และ Express (TypeScript) + Prisma + PostgreSQL เป็น Backend เพื่อจัดการข้อมูลสินค้าแบบครบวงจร

---

## 🔥 Features

- สร้างสินค้าใหม่ (Create Product)
- ดูรายการสินค้า (Read Products)
- ดูรายละเอียดสินค้า (Read Product Detail)
- แก้ไขสินค้า (Update Product)
- ลบสินค้า (Delete Product)
- เชื่อมต่อฐานข้อมูล PostgreSQL ด้วย Prisma ORM
- ใช้ TypeScript ทั้ง frontend และ backend เพื่อความปลอดภัยของโค้ด
- โครงสร้างโปรเจกต์แบบแยกชั้นชัดเจน (Controller, Service, Routes)
- รองรับการขยายในอนาคต เช่น Authentication, Pagination, Validation

---

## 🛠 Tech Stack

| ส่วน | เทคโนโลยี |
|-|-|
| Frontend | Next.js, React, TypeScript, axios |
| Backend | Express, TypeScript, Prisma ORM |
| Database | PostgreSQL |
| Tooling | ESLint, Prettier, Nodemon (backend), React Hook Form (frontend) |

---

## 🚀 การติดตั้งและรันโปรเจกต์

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/your-username/product-management-system.git
cd product-management-system
