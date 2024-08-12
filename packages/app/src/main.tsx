import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

import App from "./App.tsx";

import "./index.css";
import { PaginaConsulta } from "./paginas/consulta/PaginaConsulta";
import { formatDate } from "shared/src/helpers.ts";

export default App;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/consulta/:id",
    element: <PaginaConsulta />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <h1 className="text-2xl font-bold text-center my-4">
        Sistema de gestión de consultas médicas UDU
      </h1>
      <h2 className="text-xl font-bold my-4">
        Hoy es {formatDate(new Date().toISOString().split("T")[0])}
      </h2>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
