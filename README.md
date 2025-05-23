# 💉 Digital LabCore

## 📌 Problem Statement
In today's fast-paced healthcare environment, accessing and managing lab tests remains fragmented and inefficient. **Digital LabCore** solves this by offering a centralized, AI-powered web platform that allows patients to register, search, compare, and book lab tests with ease. The system also empowers lab administrators and super admins with tools for efficient order handling and analytics.

---

## 🚀 Features

🔐 **Secure User Authentication** (Registration, Login, JWT-based Access Control)

🤖 **AI-based Test Recommendations** (via LLMs like Mistral & MedLLaMA2)

🧪 **Search, Compare & Book Lab Tests**

📦 **Order Tracking & Status Updates**

🏥 **Lab Profile & Test Management for Lab Admins**

📊 **Super Admin Dashboard for Analytics & Control**

📄 **Upload/Download Test Reports**

💳 **Integrated Stripe Payment Gateway**

💬 **Planned: Real-time Chat System**

---

## 🏢 Roles & Responsibilities

### 👤 **User (Patient)**
- Register & log in securely.
- Enter symptoms for AI-based test recommendations.
- Search, compare, and book lab tests.
- Make payments and track order status.
- View/download test results.
- Submit feedback & contact support.

### 🏥 **Lab Admin**
- Manage lab profile & test listings.
- View/manage incoming test orders.
- Update test and payment statuses.
- Upload test reports for users.
- Communicate with users and super admin.

### 🔧 **Super Admin**
- Oversee all labs, users, and orders.
- Manage user roles and lab accounts.
- Monitor analytics & AI recommendation flow.
- Moderate platform communication & support.

---

## 🔄 Workflow Overview

1. **Registration/Login** → Patients sign up with secure validation.
2. **Symptom Input** → AI suggests tests using pretrained LLMs.
3. **Test Booking** → Patient books test & pays via Stripe.
4. **Order Handling** → Lab admin manages order & uploads report.
5. **Dashboard Oversight** → Super admin reviews system analytics.

---

## 🛠 Tech Stack

### 🌐 Frontend
- React.js – SPA frontend
- Redux – State management
- Material UI / Bootstrap – UI components

### 🔙 Backend
- Node.js & Express.js – RESTful API
- MongoDB 
- Mongoose – ODM for MongoDB
- JWT – Auth tokens
- Bcrypt.js – Password hashing

### 🧪 Development Tools
- Postman – API testing
- GitHub – Version control
- VS Code – Code editor

---

## 📦 Deployment
> Deployment instructions or hosting platform details to be added.

---

