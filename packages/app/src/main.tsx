import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

import App from "./App.tsx";

import "./index.css";
import { PaginaConsulta } from "./paginas/consulta/PaginaConsulta";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { RegisterPage } from "./paginas/auth/RegisterPage.tsx";

export default App;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/consulta/:id",
    element: (
      <ProtectedRoute>
        <PaginaConsulta />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/crear-usuario",
    element: (
      <ProtectedRoute>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
