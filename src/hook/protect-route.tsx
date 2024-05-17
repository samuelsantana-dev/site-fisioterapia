import { Navigate } from "react-router-dom";
import { useAuth } from "./use-auth";

export const ProtectedRoute = ({ children }: any) => {
  const { user }: { user: any } = useAuth() as { user: any };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};