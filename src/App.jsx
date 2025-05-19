import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;