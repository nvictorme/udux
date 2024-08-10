import { AppDataSource } from "./data-source";

import express from "express";
import cors from "cors";
import morgan from "morgan";

AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);

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

    // TODO: Define a route handler

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
