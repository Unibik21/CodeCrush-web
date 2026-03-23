<div align="center">
  <h1 align="center">✨ CodeↃrush ✨</h1>
  <p align="center">
    <strong>A modern, glassmorphic networking platform for developers.</strong>
  </p>
  
  <p align="center">
    <a href="#-key-features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-backend-architecture">Backend Repository</a> 
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
    <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white" alt="Socket.io" />
  </p>
</div>

<br />

Welcome to the frontend repository of **CodeCrush**! This application offers a premium, dating-app style networking interface tailored for developers to easily find like-minded peers, send connection requests, and engage in real-time chat. The UI boasts a sleek glassmorphic design, dynamic gradients, and smooth transition animations.

---

## 🌟 Key Features

<details>
  <summary><b>🔥 Dynamic User Feed</b></summary>
  <ul>
    <li>Swipe-like interactive view to discover new developers</li>
    <li>Interactive glowing cards to <b>Ignore</b> or show <b>Interest</b></li>
  </ul>
</details>

<details>
  <summary><b>💬 Real-Time Chat Engine</b></summary>
  <ul>
    <li>Powered by Socket.io for instant messaging</li>
    <li>Distinctive UI chat bubbles inside a glassmorphic container</li>
    <li>Maintains real-time connection status across multiple users</li>
  </ul>
</details>

<details>
  <summary><b>🤝 Connections & Requests Management</b></summary>
  <ul>
    <li>Dedicated interfaces to view your active connections</li>
    <li>Approve or reject incoming network requests with one click</li>
  </ul>
</details>

<details>
  <summary><b>🎨 Premium "Production-Level" UI</b></summary>
  <ul>
    <li>Built using Tailwind CSS 4 & DaisyUI</li>
    <li>Vibrant animated backgrounds inherited across the app</li>
    <li>Backdrop-blur glass effect applied on Modals, Navbars, and Chat interfaces</li>
  </ul>
</details>

---

## 🛠️ Tech Stack

### Frontend Ecosystem
* **Core Framework:** [React 19](https://react.dev/) via [Vite](https://vitejs.dev/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (`appStore` spanning user, connections, feed, and requests state)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
* **Network & API:** [Axios](https://axios-http.com/) (configured with cross-origin credentials)
* **WebSockets:** [Socket.io-client](https://socket.io/) (for real-time P2P communications)

---

## 🔗 Backend Architecture

> ⚠️ **Note:** CodeCrush relies on a dedicated backend server for database operations, authentication, and WebSocket handling.

This frontend **must be paired with its backend counterpart** to function properly. 

🔗 **Link to Backend Repository:** *https://github.com/Unibik21/CodeCrush*

Make sure the backend is running and the `BASE_URL` in `src/utils/constants.js` maps correctly to the backend's server port (e.g., `http://localhost:5000`).

---

## 🚀 Getting Started

Follow these steps to get the frontend environment up and running locally.

### 1. Clone the repository
```bash
git clone https://github.com/Unibik21/CodeCrush-web.git
cd CodeCrush-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Check `src/utils/constants.js` to ensure the `BASE_URL` correctly targets your local or production backend instance. By default, it usually points to your local node server port while in development.

```javascript
// Example of src/utils/constants.js
export const BASE_URL = "http://localhost:5000";
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`. 

---

## 💡 Usage Workflow

1. **Onboarding:** Create a brand new account or Login utilizing secure cookie-based auth. 
2. **Profile Setup:** Access `Edit Profile` to define your programming languages, update your photo URL, and describe yourself.
3. **Discover:** The home feed (`/`) displays developer cards—hit **Interested** or **Ignore**.
4. **Network:** Review incoming requests on the `Requests` page to accept peers.
5. **Collaborate:** Head to your `Connections` panel to open **real-time chat** windows with your new friends!

---

<div align="center">
  <p>If you like this project, please consider giving it a ⭐ on GitHub!</p>
</div>
