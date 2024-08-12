import { FormularioCita } from "../citas/FormularioCita";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { calcularEdad } from "shared/src/helpers";
import { Button } from "@/components/ui/button";
import { DialogoPaciente } from "../pacientes/DialogoPaciente";
import { useCitasStore } from "@/store/citas.store";
import { Spinner } from "@/components/Spinner";
import { usePacientesStore } from "@/store/pacientes.store";
import { useState } from "react";
import { DialogoAntecedentes } from "../antecedentes/DialogoAntecedentes";

export function PaginaConsulta() {
  const location = useLocation();
  // Get the cita id from the URL.
  const citaId = parseInt(location.pathname.split("/").pop() as string, 10);

  // Get the cita from the store.
  const cita = useCitasStore().citas.find((c) => c.id === citaId);

  // Get paciente from the store.
  const paciente = usePacientesStore().pacientes.find(
    (p) => p.id === cita?.paciente?.id
  );
  const [openPaciente, setOpenPaciente] = useState(false);

  // Get the antecedentes from the store.
  const antecedentes = paciente?.antecedentes || null;
  const [openAntecedentes, setOpenAntecedentes] = useState(false);

  if (!cita || !paciente) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Paciente */}
      <Card className="p-4">
        <CardTitle>
          <h1 className="text-2xl">Paciente</h1>
        </CardTitle>
        <CardContent className="my-4">
          <div className="grid grid-cols-6 gap-4 text-xl">
            <div className="col-span-2 flex flex-col gap-2">
              <p>
                <span className="font-light text-sm">Nombre:</span>
                <br />
                <span>{paciente.nombre}</span>
              </p>
              <p>
                <span className="font-light text-sm">Apellido:</span>
                <br />
                {paciente.apellido}
              </p>
              <p>
                <span className="font-light text-sm">Cédula:</span>
                <br />
                {paciente.cedula}
              </p>
            </div>
            <div className="col-span-2 gap-2 flex flex-col">
              <p>
                <span className="font-light text-sm">Género:</span>
                <br />
                {paciente.genero}
              </p>
              <p>
                <span className="font-light text-sm">Edad:</span>
                <br />
                {calcularEdad(paciente.fechaNacimiento)}
              </p>
              <p>
                <span className="font-light text-sm">Estado civil:</span>
                <br />
                {paciente.estadoCivil}
              </p>
            </div>
            <div className="col-span-2 gap-2 flex flex-col">
              <p>
                <span className="font-light text-sm">Profesión:</span>
                <br />
                {paciente.profesion}
              </p>
              <p>
                <span className="font-light text-sm">Procedencia:</span>
                <br />
                {paciente.procedencia}
              </p>
              <p>
                <span className="font-light text-sm">Teléfono:</span>
                <br />
                {paciente.telefono}
              </p>
            </div>
          </div>
        </CardContent>
        <Button variant="secondary" onClick={() => setOpenPaciente(true)}>
          Actualizar Paciente
        </Button>
      </Card>

      {/* Antecedentes */}
      <Card className="p-4 my-4">
        <CardTitle>
          <h1 className="text-2xl">Antecedentes</h1>
        </CardTitle>
        <CardContent>
          {antecedentes ? (
            <div className="grid grid-cols-6 gap-1 text-xl">
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Médicos:</span>
                  <br />
                  <i>{antecedentes.medicos}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Quirúrgicos:</span>
                  <br />
                  <i>{antecedentes.quirurgicos}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Familiares:</span>
                  <br />
                  <i>{antecedentes.familiares}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Actividad física:</span>
                  <br />
                  <i>{antecedentes.actividadFisica}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Alergias:</span>
                  <br />
                  <i>{antecedentes.alergias}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Medicamentos:</span>
                  <br />
                  <i>{antecedentes.medicamentos}</i>
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>
        <Button variant="secondary" onClick={() => setOpenAntecedentes(true)}>
          Actualizar Antecedentes
        </Button>
      </Card>

      {/* Consulta */}
      <Card className="p-4">
        <CardTitle>
          <h1 className="text-2xl">Consulta</h1>
        </CardTitle>
        <CardContent>
          <FormularioCita
            accion="Actualizar"
            paciente={paciente}
            cita={cita}
            onClose={() => window.history.back()}
          />
        </CardContent>
      </Card>

      {/* Modal Dialogs */}
      <DialogoPaciente
        accion="Actualizar"
        paciente={paciente}
        open={openPaciente}
        onOpenChange={setOpenPaciente}
      />
      <DialogoAntecedentes
        accion={!antecedentes ? "Crear" : "Actualizar"}
        paciente={paciente}
        antecedentes={paciente.antecedentes}
        open={openAntecedentes}
        onOpenChange={setOpenAntecedentes}
      />
    </div>
  );
}
