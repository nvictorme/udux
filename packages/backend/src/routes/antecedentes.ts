import { Router, Request, Response } from "express";
import { Antecedentes } from "../entity/Antecedentes";
import { AppDataSource } from "../data-source";

const router = Router();

// GET /antecedentes/paciente/:id
router.get("/paciente/:id", async (req: Request, res: Response) => {
  try {
    const idPaciente = parseInt(req.params.id);
    if (!idPaciente) throw new Error("Id de paciente inválido");
    const antecedentes = await AppDataSource.getRepository(
      Antecedentes
    ).findOne({
      where: { paciente: { id: idPaciente } },
    });
    res.status(200).json({ antecedentes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /antecedentes
router.post("/", async (req: Request, res: Response) => {
  try {
    const antecedentes = AppDataSource.getRepository(Antecedentes).create(
      req.body
    );
    await AppDataSource.getRepository(Antecedentes).save(antecedentes);
    res.status(201).json({ antecedentes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /antecedentes/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const idAntecedentes = parseInt(req.params.id);
    if (!idAntecedentes) throw new Error("Id de antecedentes inválido");
    const antecedentes = await AppDataSource.getRepository(
      Antecedentes
    ).findOneBy({
      id: idAntecedentes,
    });
    if (!antecedentes) throw new Error("Antecedentes no encontrados");
    AppDataSource.getRepository(Antecedentes).merge(antecedentes, req.body);
    await AppDataSource.getRepository(Antecedentes).save(antecedentes);
    res.status(200).json({ antecedentes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /antecedentes/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const idAntecedentes = parseInt(req.params.id);
    if (!idAntecedentes) throw new Error("Id de antecedentes inválido");
    const antecedentes = await AppDataSource.getRepository(
      Antecedentes
    ).findOneBy({
      id: idAntecedentes,
    });
    if (!antecedentes) throw new Error("Antecedentes no encontrados");
    await AppDataSource.getRepository(Antecedentes).remove(antecedentes);
    res.status(200).json({});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
