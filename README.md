# 📝 iNotebook

A secure and responsive web-based notebook app built with the **MERN Stack**. iNotebook allows users to create, update, and delete personal notes after authentication. Your notes are stored securely and accessible from anywhere.

## 🔧 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/) – for lightning-fast development
- [Bootstrap](https://getbootstrap.com/) – for responsive styling

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

### Authentication
- [JWT (JSON Web Tokens)](https://jwt.io/) – for secure authentication and route protection

---

## 🚀 Features

- ✅ User Authentication (Signup/Login with JWT)
- 🗒️ CRUD operations for notes
- 🔐 Private user-specific notes
- ⚡ Fast development experience with Vite
- 📱 Responsive UI using Bootstrap
- 📦 RESTful API backend with Express

---

## 🛠️ Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/AbdullahEnemy/iNotebook.git
cd iNotebook
```
### 2. Install dependencies
```bash
npm install
```
This installs dependencies for both client and server using a root-level script.

Make sure you have Node.js and npm installed.

### 3. Set up environment variables
Create a .env file in the root and in /client if needed:

Server .env example:
```bash
PORT=Port number
MONGO_URI=MongoUrl
JWT_SECRET=your_jwt_secret_key
```
## 🧾 Available Scripts
Run both client and server:
```bash
npm run both

This will concurrently start:
Frontend: Vite dev server at http://localhost:5173
Backend: Express server at http://localhost:5000
```
Run individually:
```bash
# Server
cd server
npm start

# Client
cd client
npm run dev

