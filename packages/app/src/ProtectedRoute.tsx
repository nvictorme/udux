import { useAuthStore } from "./store/auth.store";
import { LoginPage } from "./paginas/auth/LoginPage";
import { ReactNode } from "react";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthStore();

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
};
