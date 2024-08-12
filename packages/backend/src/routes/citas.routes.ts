import { Router, Request, Response } from "express";
import { Cita } from "../entity/Cita";
import { AppDataSource } from "../data-source";
import { MoreThanOrEqual } from "typeorm";

const router = Router();

// GET /citas
router.get("/", async (req: Request, res: Response) => {
  try {
    // listar citas con paginacion
    const { page = "1", limit = "10" } = req.query;
    const today = new Date().toISOString().split("T")[0];
    const [citas, total] = await AppDataSource.getRepository(Cita).findAndCount(
      {
        where: {
          fechaCita: MoreThanOrEqual(today),
        },
        take: parseInt(limit as string),
        skip: (parseInt(page as string) - 1) * parseInt(limit as string),
        relations: ["paciente", "paciente.antecedentes"],
        order: { id: "ASC" },
      }
    );
    res.status(200).json({
      citas,
      total,
      page: parseInt(page as string),
      pageCount: Math.ceil(total / parseInt(limit as string) || 1),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /citas/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const idCita = parseInt(req.params.id);
    if (!idCita) throw new Error("Id de cita inválido");
    const cita = await AppDataSource.getRepository(Cita).findOne({
      where: { id: idCita },
      relations: ["paciente", "paciente.antecedentes"],
    });
    res.status(200).json({ cita });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /citas/paciente/:id
router.get("/paciente/:id", async (req: Request, res: Response) => {
  try {
    const idPaciente = parseInt(req.params.id);
    if (!idPaciente) throw new Error("Id de paciente inválido");
    const citas = await AppDataSource.getRepository(Cita).find({
      where: { paciente: { id: idPaciente } },
    });
    res.status(200).json({ citas });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /citas
router.post("/", async (req: Request, res: Response) => {
  try {
    const cita = AppDataSource.getRepository(Cita).create(req.body);
    await AppDataSource.getRepository(Cita).save(cita);
    res.status(201).json({ cita });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /citas/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const idCita = parseInt(req.params.id);
    if (!idCita) throw new Error("Id de cita inválido");
    const cita = await AppDataSource.getRepository(Cita).findOneBy({
      id: idCita,
    });
    if (!cita) throw new Error("Cita no encontrada");
    AppDataSource.getRepository(Cita).merge(cita, req.body);
    await AppDataSource.getRepository(Cita).save(cita);
    res.status(200).json({ cita });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /citas/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const idCita = parseInt(req.params.id);
    if (!idCita) throw new Error("Id de cita inválido");
    const cita = await AppDataSource.getRepository(Cita).findOneBy({
      id: idCita,
    });
    if (!cita) throw new Error("Cita no encontrada");
    await AppDataSource.getRepository(Cita).remove(cita);
    res.status(204).json({});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
