import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("cloudi5");
    const userRole = localStorage.getItem("userRole"); 
    if (token && allowedRoles.includes(userRole)) {
      return children; 
    } else {
      return <Navigate to="/login" />; 
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
