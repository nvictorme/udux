import { AppDataSource } from "./data-source";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import AuthRoutes from "./routes/auth.routes";
import PacientesRoutes from "./routes/pacientes.routes";
import CitasRoutes from "./routes/citas.routes";
import AntecedentesRoutes from "./routes/antecedentes.routes";
import InformesRoutes from "./routes/informes.routes";

AppDataSource.initialize()
  .then(async () => {
    // Create a new express application instance
    const app = express();

    // CORS, JSON, Helmet, and Morgan middleware
    const corsHandler = cors({ origin: true });
    app
      .use(corsHandler)
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(morgan("combined"));

    // Define a route handler
    app.use("/auth", AuthRoutes);
    app.use("/pacientes", PacientesRoutes);
    app.use("/citas", CitasRoutes);
    app.use("/antecedentes", AntecedentesRoutes);
    app.use("/informes", InformesRoutes);

    // 404 - catch all
    app.use((req, res) => {
      res.status(404).json({ message: "Not Found" });
    });

    // Start the server
    const { APP_NAME, APP_VERSION, APP_PORT } = process.env;
    const port = APP_PORT || 3000;
    app.listen(port, () => {
      console.log(
        `${APP_NAME} v${APP_VERSION} is running at http://localhost:${port}`
      );
    });
  })
  .catch((error) => console.log(error));
