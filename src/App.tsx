import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { LoginForm } from "./pages/authentication/login";
import { SignupForm } from "./pages/authentication/Signup";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useAppSelecter } from "./Redux/Hooks/store";
import Dashboard from "./pages/dashboard/Dashboard";
import { Cart } from "./pages/dashboard/Cart";
import { Menu } from "./pages/dashboard/Menu";
import { Order } from "./pages/dashboard/Order";

function App() {
  const token = useAppSelecter((state) => state?.auth?.token);
  const isAuthenticated = token ? true : false;
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          <Route
            path="*"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="" element={<Dashboard />}>
            <Route path="" element={<Menu />} />
              <Route path="cart" element={<Cart />} />
              <Route path="order" element={<Order />} />
            </Route>
          </Route>
        </Routes>

        <Toaster />
      </Router>
    </>
  );
}

export default App;
