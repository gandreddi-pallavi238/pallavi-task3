# 📝 Real-Time Collaborative Document Editor


## 📌 Task 3 - Full Stack Internship @ CodTech

This project is a **Google Docs-like collaborative editor** built for the Full Stack Development Internship at **CodTech**. It allows multiple users to edit the same document in real-time using **WebSockets**. The application uses **React.js** for the frontend, **Node.js with Express and Socket.io** for the backend, and **MongoDB** to store document data.

---

## 🚀 Features

- ✅ Real-time text editing using WebSockets
- ✅ Collaborative editing for multiple users
- ✅ Auto-save document changes to MongoDB
- ✅ Rich text formatting using Quill.js
- ✅ Responsive and dynamic React.js frontend
- ✅ Backend server built with Express and Socket.io

---

## 🔧 Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React.js, Quill.js, Socket.io-client |
| Backend      | Node.js, Express.js, Socket.io |
| Database     | MongoDB (Mongoose)             |

---

## 📁 Project Structure

```

collab-doc-editor/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   └── models/
│       └── Document.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── Editor.js
│       └── index.js
│
└── README.md

````

---

## 🛠️ How to Run the Project Locally

### 📍 Prerequisites:
- Node.js and npm
- MongoDB installed and running (`mongod`)

### 📦 Backend Setup:

```bash
cd backend
npm install
node server.js
````

### 🌐 Frontend Setup:

```bash
cd frontend
npx create-react-app .   # if not already created
npm install quill socket.io-client
npm start
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🧪 How It Works

1. Users connect to the same document using a unique ID (`doc1` by default).
2. A WebSocket connection is established via Socket.io.
3. As a user types, the changes (delta) are broadcast to all other users.
4. Changes are saved to MongoDB every 2 seconds.

---


## ✍️ Document Schema (MongoDB)

```js
{
  _id: "doc1",
  data: { ops: [...] }
}
```

---

## 📜 License

This project is developed for educational purposes as part of the **CodTech Full Stack Internship**.

---

Would you like me to help you generate a live video walkthrough or a GitHub repository description for submission?
```
