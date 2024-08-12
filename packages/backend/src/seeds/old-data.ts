import { AppDataSource } from "../data-source";
import mysql from "mysql2/promise";
import { IPaciente, IAntecedentes, ICita } from "shared/src/interfaces";
import { GENERO, ESTATUS_CITA } from "shared/src/enums";
import { Paciente } from "../entity/Paciente";
import { Cita } from "../entity/Cita";

async function run(): Promise<void> {
  await AppDataSource.initialize();
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BadBunny2023$",
    database: "udu",
  });
  console.log("Connected to MySQL");

  const oldCitas = [];

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
      nombre: row.nombre,
      cedula: row.cedula,
      fechaNacimiento: row.fecha_nacimiento,
      genero: GENERO.OTRO,
      estadoCivil: row.desc_estado,
      telefono: row.telefono,
      direccion: row.direccion,
      email: row.email,
      profesion: row.profesion,
      procedencia: row.procedencia,
      antecedentes: {
        medicos: row.medicos,
        quirurgicos: row.qx,
        habitos: row.habitos,
        actividadFisica: row.act_fisica,
        paciente: { id: row.id_paciente } as IPaciente,
      } as IAntecedentes,
    } as IPaciente;
    await AppDataSource.getRepository(Paciente).save(paciente);

    // Query the citas for the current paciente.
    const [citas] = await connection.query(`
      SELECT * FROM citas WHERE id_paciente = ${row.id_paciente};
    `);

    // Insert the citas for the current paciente.
    for (const cita of citas as any[]) {
      const newCita = {
        id: cita.id_cita,
        fechaCita: new Date(cita.fecha_cita).toISOString().split("T")[0],
        estatus: ESTATUS_CITA.FINALIZADA,
        motivoConsulta: cita.motivo_consulta,
        procedimiento: cita.procedimiento,
        enfermedadActual: cita.enfermedad_actual,
        examenClinico: cita.ex_clinico,
        impresionDiagnostica: cita.imp_diag,
        tratamiento: cita.tratamiento,
        observaciones: cita.observaciones,
        honorarios: cita.honorarios,
        paciente: { id: row.id_paciente } as IPaciente,
      } as ICita;
      oldCitas.push(newCita);
    }
  }

  oldCitas.forEach(async (cita) => {
    await AppDataSource.getRepository(Cita).save(cita);
  });
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
