import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

import Auth from "../middleware/auth.middleware";

const router = Router();

// POST /auth/login
router.post(
  "/login",
  Auth.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    try {
      res.status(200).json({ user: req.user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// POST /auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    const newUser = new Usuario();
    newUser.nombre = nombre;
    newUser.email = email;
    newUser.password = password;

    const user = await AppDataSource.getRepository(Usuario).save(newUser);

    res.status(201).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
