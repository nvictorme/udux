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

export function PaginaConsulta() {
  const location = useLocation();
  const { cita } = location.state || {};

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
                    <span className="font-bold">Nombre:</span>{" "}
                    {cita.paciente.nombre}
                  </p>
                  <p>
                    <span className="font-bold">Apellido:</span>{" "}
                    {cita.paciente.apellido}
                  </p>
                  <p>
                    <span className="font-bold">Cédula:</span>{" "}
                    {cita.paciente.cedula}
                  </p>
                  <p>
                    <span className="font-bold">Género:</span>{" "}
                    {cita.paciente.genero}
                  </p>
                  <p>
                    <span className="font-bold">Edad:</span>{" "}
                    {calcularEdad(cita.paciente.fechaNacimiento)}
                  </p>
                  <p>
                    <span className="font-bold">Estado civil:</span>{" "}
                    {cita.paciente.estadoCivil}
                  </p>
                </div>
                <div className="col-span-2 gap-2 flex flex-col">
                  <p>
                    <span className="font-bold">Profesión:</span>{" "}
                    {cita.paciente.profesion}
                  </p>
                  <p>
                    <span className="font-bold">Procedencia:</span>{" "}
                    {cita.paciente.procedencia}
                  </p>
                  <p>
                    <span className="font-bold">Teléfono:</span>{" "}
                    {cita.paciente.telefono}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    {cita.paciente.email}
                  </p>
                </div>
              </div>
            </CardContent>
            <Button
              variant="secondary"
              onClick={() => {
                console.log("Actualizar paciente");
              }}
            >
              Actualizar Paciente
            </Button>
          </Card>
          <Card className="p-4 mt-4">
            <CardTitle>
              <h1 className="text-2xl font-bold">Antecedentes</h1>
            </CardTitle>
            <CardContent>
              {cita.paciente.antecedentes ? (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2 flex flex-col gap-2">
                    <p>
                      <span className="font-bold">Alergias:</span>{" "}
                      {cita.paciente.antecedentes.alergias}
                    </p>
                    <p>
                      <span className="font-bold">Enfermedades:</span>{" "}
                      {cita.paciente.antecedentes.enfermedades}
                    </p>
                    <p>
                      <span className="font-bold">Cirugías:</span>{" "}
                      {cita.paciente.antecedentes.cirugias}
                    </p>
                  </div>
                  <div className="col-span-2 gap-2 flex flex-col">
                    <p>
                      <span className="font-bold">Medicamentos:</span>{" "}
                      {cita.paciente.antecedentes.medicamentos}
                    </p>
                    <p>
                      <span className="font-bold">Hábitos:</span>{" "}
                      {cita.paciente.antecedentes.habitos}
                    </p>
                    <p>
                      <span className="font-bold">Observaciones:</span>{" "}
                      {cita.paciente.antecedentes.observaciones}
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
                paciente={cita.paciente}
                cita={cita}
                onClose={() => window.history.back()}
              />
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
