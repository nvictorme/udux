import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { ITokens } from "shared/src/interfaces";

import { deriveTokens, verifyRefreshToken } from "../providers/encryption";

import Auth from "../middleware/auth.middleware";

const router = Router();

// POST /auth/login
router.post(
  "/login",
  Auth.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    try {
      const user = req.user as Usuario;
      const tokens = deriveTokens(user);
      res.status(200).json({ tokens });
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

    const tokens = deriveTokens(user);
    res.status(201).json({ tokens });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /auth/refresh
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const payload = verifyRefreshToken(refreshToken) as any;
    const user = payload.user as Usuario;
    const tokens: ITokens = deriveTokens(user);
    res.status(201).json({ tokens });
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
});

export default router;
