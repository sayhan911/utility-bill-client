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
