# food delivery system that includes user authentication, menu management, and order tracking.

This is the **frontend** repository for the **food delivery system**. The application allows users to search, browse, and manage menus efficiently. This project is built using modern web technologies to provide a smooth and responsive user experience.

## 🚀 Features

- **Dynamic Menu Management**: Fetch, display, and manage menu items dynamically using APIs.
- **Search Functionality**: Perform efficient, debounced searches across menu items.
- **Pagination**: Seamless scrolling and pagination for large datasets.
- **Protected Routes**: Secure pages with user authentication.
- **Error Handling**: Comprehensive error boundary implementation for better UX.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

---

## 🛠️ Tech Stack

- **React.js**: Core framework for building UI components.
- **TypeScript**: Type-safe development for enhanced maintainability.
- **Redux Toolkit**: State management for global application state.
- **React Router DOM**: For routing and navigation.
- **Axios**: For handling API requests.
- **Vite**: Lightning-fast development environment.
- **Tailwind CSS**: For styling and responsive design.

---

## 🔧 Setup & Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CodeSciRahul/full-stack-task-management-app.git
2. ```bash
   npm install
3. **Create env variable**:
   **VITE_PUBLIC_BASE_URL**:
   ```bash
   https://full-stack-task-management-app-backend-lww7.onrender.com/api
4.**Run code**
```bash
npm run dev

## 📂 Project Structure graphql Copy code
src/
├── assets/         # Static assets like images
├── components/     # Reusable components (e.g., MenuCard, Navbar)
├── pages/          # Page components (e.g., Dashboard, Menu)
├── services/       # API service handlers
├── store/          # Redux Toolkit slices and store setup
├── styles/         # Tailwind CSS custom styles
├── utils/          # Utility functions and helpers
└── App.tsx         # Main application entry point



