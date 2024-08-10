import { AppDataSource } from "./data-source";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import PacientesRouter from "./routes/pacientes";
import CitasRouter from "./routes/citas";
import AntecedentesRouter from "./routes/antecedentes";
import InformesRouter from "./routes/informes";

AppDataSource.initialize()
  .then(async () => {
    // Create a new express application instance
    const app = express();

    // CORS, JSON, Helmet, and Morgan middleware
    const corsHandler = cors({
      origin: "*",
    });
    app
      .use(corsHandler)
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(morgan("combined"));

    // Define a route handler
    app.use("/pacientes", PacientesRouter);
    app.use("/citas", CitasRouter);
    app.use("/antecedentes", AntecedentesRouter);
    app.use("/informes", InformesRouter);

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
