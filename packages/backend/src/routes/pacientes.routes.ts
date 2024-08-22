import { Router, Request, Response } from "express";
import { Paciente } from "../entity/Paciente";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";

const router = Router();

// GET /pacientes
router.get("/", async (req: Request, res: Response) => {
  try {
    // listar pacientes con paginacion
    const { page = "1", limit = "10", nombre, apellido, cedula } = req.query;
    const [pacientes, total] = await AppDataSource.getRepository(
      Paciente
    ).findAndCount({
      ...((nombre || apellido || cedula) && {
        where: {
          ...(nombre && { nombre: Like(`%${nombre}%`) }),
          ...(apellido && { apellido: Like(`%${apellido}%`) }),
          ...(cedula && { cedula: Like(`%${cedula}%`) }),
        },
      }),
      take: parseInt(limit as string),
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      relations: ["antecedentes"],
      order: { id: "DESC" },
    });
    res.status(200).json({
      pacientes,
      total,
      page: parseInt(page as string),
      pageCount: Math.ceil(total / parseInt(limit as string) || 1),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /pacientes/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const idPaciente = parseInt(req.params.id);
    if (!idPaciente) throw new Error("Id de paciente inválido");
    const paciente = await AppDataSource.getRepository(Paciente).findOne({
      where: { id: idPaciente },
      relations: ["antecedentes"],
    });
    res.status(200).json({ paciente });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /pacientes
router.post("/", async (req: Request, res: Response) => {
  try {
    const paciente = AppDataSource.getRepository(Paciente).create(req.body);
    await AppDataSource.getRepository(Paciente).save(paciente);
    res.status(201).json({ paciente });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /pacientes/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const idPaciente = parseInt(req.params.id);
    if (!idPaciente) throw new Error("Id de paciente inválido");
    const paciente = await AppDataSource.getRepository(Paciente).findOneBy({
      id: idPaciente,
    });
    if (!paciente) throw new Error("Paciente no encontrado");
    AppDataSource.getRepository(Paciente).merge(paciente, req.body);
    await AppDataSource.getRepository(Paciente).save(paciente);
    res.status(200).json({ paciente });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /pacientes/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const idPaciente = parseInt(req.params.id);
    if (!idPaciente) throw new Error("Id de paciente inválido");
    const paciente = await AppDataSource.getRepository(Paciente).findOneBy({
      id: idPaciente,
    });
    if (!paciente) throw new Error("Paciente no encontrado");
    await AppDataSource.getRepository(Paciente).remove(paciente);
    res.status(204).json({});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
