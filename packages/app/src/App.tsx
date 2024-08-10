import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { IPaciente } from "shared/src/interfaces";
import { ESTADO_CIVIL, GENERO } from "shared/src/enums";
import { TablaPacientes } from "./pacientes/TablaPacientes";

async function listarPacientes() {
  const response = await fetch("http://localhost:3000/pacientes");
  const data = await response.json();
  return data.pacientes;
}

function App() {
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);

  useEffect(() => {
    listarPacientes().then((data) => setPacientes(data));
  }, []);

  const insertPaciente = useCallback((paciente: Partial<IPaciente>) => {
    fetch("http://localhost:3000/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paciente),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) return alert(data.error);
        listarPacientes().then((data) => setPacientes(data));
      });
  }, []);

  return (
    <>
      <h1>UDUXtreme</h1>
      <div className="card">
        <h2>Pacientes</h2>
        <TablaPacientes pacientes={pacientes} />
      </div>
      <div className="card">
        <Button
          onClick={() =>
            insertPaciente({
              nombre: "Victor",
              apellido: "Hugo",
              genero: GENERO.MASCULINO,
              cedula: "V-17066986",
              fechaNacimiento: "1984-05-11",
              estadoCivil: ESTADO_CIVIL.CASADO,
              profesion: "Ingeniero",
              procedencia: "Naguanagua",
              direccion: "",
              telefono: "",
              email: "nvictor@pm.me",
            })
          }
        >
          insertar paciente
        </Button>
      </div>
    </>
  );
}

export default App;
