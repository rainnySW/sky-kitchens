# 🍲 Sky Thai Kitchen - Ordering Web App

## 🚀 Project Summary
This project is a modern, mobile-first, and highly responsive food ordering web application tailored for Sky Thai Kitchen. 

### Key Features Implemented:
1. **Dynamic Theme & Language Toggle:** Users can switch between Dark (Default) / Light themes and Thai (Default) / English languages instantly. Preferences are saved in LocalStorage and MongoDB for logged-in users.
2. **Smooth Animations:** Built with Vite.js, React, and `framer-motion` to provide a premium, App-like feel with seamless page transitions, hover effects, and spring animations.
3. **Menu Browsing:** Filterable categories with aesthetic glassmorphism cards.
4. **Cart & Checkout System:** Real-time subtotal calculation. Manual table number input and Mock QR Code/Bank Slip upload implemented as requested.
5. **Post-Payment Animation:** Simulates a printing slip pop-up showing a randomly generated Queue Number and the Table Number.
6. **Authentication System:** Fully functional Login and Signup forms connecting to the Express backend and MongoDB database.
7. **Kitchen Dashboard (`/kitchen`):** A Kanban-style board for restaurant staff to view incoming orders and update statuses (`Pending` -> `Preparing` -> `Served`) in real-time (polling).
8. **Mobile Optimization:** Bottom navigation bar for mobile devices utilizing Lucide React icons for a compact, intuitive experience.

## 🛠 Tech Stack
*   **Frontend:** React (Vite), TailwindCSS, Framer Motion, React Router DOM.
*   **Backend:** Node.js, Express.js, Mongoose.
*   **Database:** MongoDB Atlas (Connected via the provided `.env.local` URI).

---

## 🏃‍♂️ How to Run Locally

### 1. Start the Backend Server
```bash
cd server
npm install
node server.js
```
*The server will run on `http://localhost:5000`.*

### 2. Start the Frontend App
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
*The app will be accessible at `http://localhost:5173`.*

---

## 💡 Suggestions & Improvements for Production

1. **Cloudinary for Image Uploads:** Currently, the payment slip uses `FileReader` to generate a Base64 string. For production, Base64 strings are too heavy for MongoDB. Implement a cloud storage solution like AWS S3 or Cloudinary.
2. **WebSocket (Socket.io) Integration:** Instead of polling the `/api/order` endpoint every 10 seconds in the Kitchen Dashboard, use WebSockets to push new orders to the Kitchen instantly without refreshing.
3. **Global State Manager:** While React Context works great for this scale, if the app grows to include complex multi-restaurant logic, migrating to `Zustand` or `Redux Toolkit` would improve rendering performance.
4. **Input Validation:** Consider adding `Zod` or `Yup` for stricter schema validation on the frontend forms (Login, Signup, Checkout) to prevent malicious payloads.

I have completed the setup. Please run the `npm install` and `npm run dev` commands to preview it. Let me know your feedback!
