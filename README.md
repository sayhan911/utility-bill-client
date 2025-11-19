# ⚡ Utility Bill Management System

A full-stack MERN web application that allows users to view, manage, and pay their monthly utility bills — including Electricity, Gas, Water, and Internet.  
Built with React (Vite), Tailwind CSS, Firebase Authentication, and Express + MongoDB on the backend.

## 🌍 Live Links

| Type                 | URL                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------- |
| 🖥️ Client (Frontend) | [https://utility-bills-7097f.web.app/](https://utility-bills-7097f.web.app/)                 |
| ⚙️ Server (Backend)  | [https://utility-bill-server-eight.vercel.app](https://utility-bill-server-eight.vercel.app) |
| 💾 Database          | MongoDB Atlas                                                                                |

## 🚀 Features

- 🔐 **User Authentication** using Firebase (Email/Password + Google Login)
- 🧾 **View and Filter Bills** — by category, using dynamic queries from backend
- 💳 **Pay Current Month Bills** only, with validation on bill date
- 📋 **My Pay Bills Dashboard** — view, update, and delete your own bills
- 📄 **PDF Report Download** — generate and export all your paid bills as a PDF using jsPDF + AutoTable
- 🌗 **Dark/Light Theme Toggle** on Home Page
- ⚡ **Responsive UI** built with Tailwind CSS & Framer Motion
- 🔍 **Dynamic Routing & Protected Routes** using React Router v7
- 💬 **Toast Notifications** for all CRUD actions (no default alerts used)
- 🧠 **Modern Animations** using React Awesome Reveal + Framer Motion

## 🧩 Technologies Used

### Frontend

- **React (Vite)** — fast, modern build system
- **Tailwind CSS** — responsive, utility-first CSS
- **Firebase Authentication** — secure login/register
- **Framer Motion** — page transitions and animations
- **React Hot Toast** — for success/error notifications
- **Lucide React / React Icons** — clean modern icons
- **Lottie React** — vector animations
- **jsPDF & jsPDF-AutoTable** — PDF report generator

### Backend

- **Express.js** — RESTful API
- **MongoDB + Atlas** — NoSQL database
- **CORS & dotenv** — secure configuration
- **Vercel Serverless Functions** — backend deployment

## 🔐 Authentication

- Users can **Register** and **Login** using Firebase Auth.
- Supports **Google Login**.
- After login, users can access:
  - `/my-bills` (private route)
  - `/bills/:id` (bill details)
- Authenticated users stay logged in even after page reloads.

## 💰 Bills Management Features

### 🔹 Bills Page

- Displays all bills from MongoDB (with pagination/filter).
- Filter by category dynamically.
- Each bill card shows: image, title, category, amount, date, and "See Details" button.

### 🔹 Bill Details Page

- Displays full info about a single bill.
- “Pay Bill” button is enabled only for the current month’s bills.
- Opens modal with prefilled form (Email, Bill ID, Amount).
- Saves payment record in the `payments` collection.

### 🔹 My Pay Bills Page

- Shows only logged-in user’s payments.
- Includes:
  - **Update** button (opens editable modal)
  - **Delete** button (confirmation modal)
  - **Total bills** and **total amount** summary
  - **Download Report** button → generates PDF for all records.

## 🌙 Dark/Light Mode

- Implemented with Tailwind’s `dark:` variants.
- Toggle button (☀️ / 🌙) on Home page switches theme and saves preference in `localStorage`.

## 🧠 Extra Features

- 🎞️ **Lottie animations** in Home banner section.
- ✨ **Animated sections** using Framer Motion & React Awesome Reveal.
- 🧭 **404 Not Found Page**.
- 🧾 **Axios interceptor** (optional improvement).
- 🧭 **Dynamic Page Titles** for each route.
- 🧩 **Responsive Navbar** with user avatar and dropdown.

## 🧩 Dependencies

### 🎨 Frontend
```json
"dependencies": {
  "@tailwindcss/vite": "4.1.17",
  "firebase": "12.5.0",
  "framer-motion": "12.23.24",
  "jspdf": "3.0.3",
  "jspdf-autotable": "5.0.2",
  "lottie-react": "2.4.1",
  "lucide-react": "0.553.0",
  "react": "19.1.1",
  "react-awesome-reveal": "4.3.1",
  "react-dom": "19.1.1",
  "react-hot-toast": "2.6.0",
  "react-icons": "5.5.0",
  "react-router": "7.9.5",
  "react-spinners": "0.17.0",
  "swiper": "12.0.3",
  "tailwindcss": "4.1.17"
}
```

### ⚙️ Backend
```json
"dependencies": {
  "cors": "2.8.5",
  "dotenv": "17.2.3",
  "express": "5.1.0",
  "mongodb": "7.0.0"
}
```
## 🚀 Run Locally

```bash
# Clone & enter the project
git clone https://github.com/sayhan-ahmed/utility-bill-client.git
cd utility-bill-client

# Install dependencies
npm install
# or → yarn / pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your own keys (MongoDB URI, etc.)

# Start dev server
npm run dev

# Open localhost in your browser
# e.g. http://localhost:5173 for Vite
```

<br><br>

<div align="center">
  
### 🌐 Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/sayhan-ahmed) 
[![GitHub](https://img.shields.io/badge/GitHub-%23181717.svg?logo=github&logoColor=white)](https://github.com/sayhan-ahmed) 
[![Portfolio](https://img.shields.io/badge/Portfolio-%23000000.svg?logo=About.me&logoColor=white)](https://sayhan.dev) 
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white)](https://facebook.com/sayhan911) 
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/noerrortoday) 
[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:sayanahmed228@gmail.com) 

</div>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,32,18,36&height=120&section=footer"/>
</p>
