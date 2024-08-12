import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
  const [dialogoPacienteOpen, setDialogoPacienteOpen] = useState(false);

  if (!cita || !paciente) {
    return <Spinner />;
  }

  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="mx-4">
          <Card className="p-4">
            <CardTitle>
              <h1 className="text-2xl font-bold">Paciente</h1>
            </CardTitle>
            <CardContent className="my-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2 flex flex-col gap-2">
                  <p>
                    <span className="font-bold">Nombre:</span> {paciente.nombre}
                  </p>
                  <p>
                    <span className="font-bold">Apellido:</span>{" "}
                    {paciente.apellido}
                  </p>
                  <p>
                    <span className="font-bold">Cédula:</span> {paciente.cedula}
                  </p>
                  <p>
                    <span className="font-bold">Género:</span> {paciente.genero}
                  </p>
                  <p>
                    <span className="font-bold">Edad:</span>{" "}
                    {calcularEdad(paciente.fechaNacimiento)}
                  </p>
                  <p>
                    <span className="font-bold">Estado civil:</span>{" "}
                    {paciente.estadoCivil}
                  </p>
                </div>
                <div className="col-span-2 gap-2 flex flex-col">
                  <p>
                    <span className="font-bold">Profesión:</span>{" "}
                    {paciente.profesion}
                  </p>
                  <p>
                    <span className="font-bold">Procedencia:</span>{" "}
                    {paciente.procedencia}
                  </p>
                  <p>
                    <span className="font-bold">Teléfono:</span>{" "}
                    {paciente.telefono}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {paciente.email}
                  </p>
                </div>
              </div>
            </CardContent>
            <Button
              variant="secondary"
              onClick={() => setDialogoPacienteOpen(true)}
            >
              Actualizar Paciente
            </Button>
          </Card>
          <Card className="p-4 mt-4">
            <CardTitle>
              <h1 className="text-2xl font-bold">Antecedentes</h1>
            </CardTitle>
            <CardContent>
              {paciente.antecedentes ? (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2 flex flex-col gap-2">
                    <p>
                      <span className="font-bold">Alergias:</span>{" "}
                      {paciente.antecedentes.alergias}
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
            <Button
              variant="secondary"
              onClick={() => {
                console.log("Actualizar antecedentes");
              }}
            >
              Actualizar antecedentes
            </Button>
          </Card>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="mx-4">
          <Card className="p-4">
            <CardTitle>
              <h1 className="text-2xl font-bold">Consulta</h1>
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
        </ResizablePanel>
      </ResizablePanelGroup>
      <DialogoPaciente
        accion="Actualizar"
        paciente={paciente}
        open={dialogoPacienteOpen}
        onOpenChange={setDialogoPacienteOpen}
      />
    </div>
  );
}
