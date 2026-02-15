// src/components/auth/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Send user back to resort and open login modal (we’ll handle this via query param)
    return <Navigate to={`/resort?login=1&next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}