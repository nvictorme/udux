import { Router, Request, Response } from "express";
import { Informe } from "../entity/Informe";
import { AppDataSource } from "../data-source";

const router = Router();

// GET /informes
router.get("/", async (req: Request, res: Response) => {
  try {
    // listar informes con paginacion
    const { page = "1", limit = "10" } = req.query;
    const informes = await AppDataSource.getRepository(Informe).find({
      take: parseInt(limit as string),
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      relations: ["paciente"],
    });
    res.status(200).json({ informes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /informes/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const idInforme = parseInt(req.params.id);
    if (!idInforme) throw new Error("Id de informe inválido");
    const informe = await AppDataSource.getRepository(Informe).findOneBy({
      id: idInforme,
    });
    res.status(200).json({ informe });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /informes/paciente/:id
router.get("/paciente/:id", async (req: Request, res: Response) => {
  try {
    const idPaciente = parseInt(req.params.id);
    if (!idPaciente) throw new Error("Id de paciente inválido");
    const informes = await AppDataSource.getRepository(Informe).find({
      where: { paciente: { id: idPaciente } },
    });
    res.status(200).json({ informes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /informes
router.post("/", async (req: Request, res: Response) => {
  try {
    const informe = AppDataSource.getRepository(Informe).create(req.body);
    await AppDataSource.getRepository(Informe).save(informe);
    res.status(201).json({ informe });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /informes/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const idInforme = parseInt(req.params.id);
    if (!idInforme) throw new Error("Id de informe inválido");
    const informe = await AppDataSource.getRepository(Informe).findOneBy({
      id: idInforme,
    });
    if (!informe) throw new Error("Informe no encontrado");
    AppDataSource.getRepository(Informe).merge(informe, req.body);
    await AppDataSource.getRepository(Informe).save(informe);
    res.status(200).json({ informe });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /informes/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const idInforme = parseInt(req.params.id);
    if (!idInforme) throw new Error("Id de informe inválido");
    const informe = await AppDataSource.getRepository(Informe).findOneBy({
      id: idInforme,
    });
    if (!informe) throw new Error("Informe no encontrado");
    await AppDataSource.getRepository(Informe).remove(informe);
    res.status(200).json({});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
