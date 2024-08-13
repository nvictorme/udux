import { AppDataSource } from "../data-source";
import mysql from "mysql2/promise";
import { IPaciente, IAntecedentes, ICita } from "shared/src/interfaces";
import { GENERO, ESTATUS_CITA } from "shared/src/enums";
import { Paciente } from "../entity/Paciente";
import { Cita } from "../entity/Cita";
import { writeFileSync } from "fs";

// sanitize any string by removing html tags
// also removing any new lines, carriage returns, tabs
// and trimming it
function sanitizeString(str: string): string {
  if (!str) return "";
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/\r?\n|\r/g, "")
    .replace(/\t/g, "")
    .trim();
}

async function run(): Promise<void> {
  await AppDataSource.initialize();
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BadBunny2023$",
    database: "udu",
  });
  console.log("Connected to MySQL");

  const pacientes: IPaciente[] = [];
  const oldCitas: ICita[] = [];

  // Get all the old data from MySQL.
  const [rows] = await connection.query(`
    SELECT 
      pacientes.*, 
      antecedentes.medicos,
      antecedentes.qx,
      antecedentes.habitos,
      antecedentes.act_fisica,
      estadocivil.desc_estado
    FROM pacientes
    LEFT JOIN estadocivil ON pacientes.estado_civil = estadocivil.estado_civil
    LEFT OUTER JOIN antecedentes ON pacientes.id_paciente = antecedentes.id_paciente;
  `);

  // Insert the old data into the new database.
  for (const row of rows as any[]) {
    const paciente = {
      id: row.id_paciente,
      nombre: sanitizeString(row.nombre),
      cedula: row.ci_rif,
      fechaNacimiento: row.fecha_nacimiento,
      genero: GENERO.OTRO,
      estadoCivil: row.desc_estado,
      telefono: sanitizeString(row.telefono),
      direccion: sanitizeString(row.direccion),
      email: sanitizeString(row.email),
      profesion: sanitizeString(row.profesion),
      procedencia: sanitizeString(row.procedencia),
      antecedentes: {
        medicos: sanitizeString(row.medicos),
        quirurgicos: sanitizeString(row.qx),
        habitos: sanitizeString(row.habitos),
        actividadFisica: sanitizeString(row.act_fisica),
        paciente: { id: row.id_paciente } as IPaciente,
      } as IAntecedentes,
    } as IPaciente;

    pacientes.push(paciente);
  }
  // Save the pacientes in chunks of 500.
  await AppDataSource.getRepository(Paciente).save(pacientes, { chunk: 500 });

  // Get all the old citas from MySQL.
  for (const paciente of pacientes as any[]) {
    // Query the citas for the current paciente.
    const [citas] = await connection.query(`
      SELECT * FROM citas WHERE id_paciente = ${paciente.id};
    `);

    // Insert the citas for the current paciente.
    for (const cita of citas as any[]) {
      const newCita = {
        id: cita.id_cita,
        fechaCita: new Date(cita.fecha_cita).toISOString().split("T")[0],
        motivoConsulta: sanitizeString(cita.motivo_consulta),
        procedimiento: sanitizeString(cita.procedimiento),
        enfermedadActual: sanitizeString(cita.enfermedad_actual),
        examenClinico: sanitizeString(cita.ex_clinico),
        impresionDiagnostica: sanitizeString(cita.imp_diag),
        tratamiento: sanitizeString(cita.tratamiento),
        observaciones: sanitizeString(cita.observaciones),
        honorarios: parseInt(cita.honorarios),
        estatus: ESTATUS_CITA.FINALIZADA,
        paciente: { id: paciente.id } as IPaciente,
      } as ICita;
      oldCitas.push(newCita);
    }
  }
  // Save the citas in chunks of 500.
  await AppDataSource.getRepository(Cita).save(oldCitas, { chunk: 500 });
}

run()
  .then(() => {
    console.log("Migration successful");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed", error);
    process.exit(1);
  });
