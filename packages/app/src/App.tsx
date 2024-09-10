import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  FileEdit,
  LockIcon,
  PlusIcon,
  UnlockIcon,
  UserIcon,
} from "lucide-react";
import { usePacientesStore } from "./store/pacientes.store";
import { calcularEdad, formatDate } from "shared/src/helpers";
import { DialogoPaciente } from "./paginas/pacientes/DialogoPaciente";
import { DialogoAntecedentes } from "./paginas/antecedentes/DialogoAntecedentes";
import { DialogoCita } from "./paginas/citas/DialogoCita";
import { ICita } from "shared/src/interfaces";
import { ApiClient } from "./api/api.client";

export default function PatientLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  const [leftPanelWidth, setLeftPanelWidth] = useState(30);
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [openPaciente, setOpenPaciente] = useState(false);
  const [openAnt, setOpenAnt] = useState(false);
  const [openCita, setOpenCita] = useState(false);

  const [cita, setCita] = useState<ICita | null>(null);
  const [citas, setCitas] = useState<ICita[]>([]);

  const { pacientes, paciente, resetPaciente, listarPacientes } =
    usePacientesStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    setSearchTerm(value);
    if (!value) return usePacientesStore.setState({ pacientes: [] });
    listarPacientes({ cedula: value });
  };

  // Fetch citas when paciente is selected or when openCita changes state
  useEffect(() => {
    if (paciente && !openCita) {
      new ApiClient()
        .get(`/citas/paciente/${paciente.id}`, {})
        .then(({ data }) => setCitas(data.citas));
    }
  }, [openCita, paciente]);

  useEffect(() => {
    const container = containerRef.current;
    const divider = dividerRef.current;

    if (!container || !divider) return;

    let isDragging = false;

    const handleMouseDown = () => {
      isDragging = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const containerRect = container.getBoundingClientRect();
      const newLeftPanelWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setLeftPanelWidth(Math.min(Math.max(newLeftPanelWidth, 20), 80));
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    divider.addEventListener("mousedown", handleMouseDown);

    return () => {
      divider.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex h-screen">
      <div
        style={{ width: `${leftPanelWidth}%` }}
        className="border-r p-4 flex flex-col"
      >
        <div className="flex flex-row gap-2">
          <Input
            type="text"
            placeholder="Ingresar cédula del paciente"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4"
            inputMode="numeric"
            pattern="[0-9]*"
            disabled={!!paciente}
          />

          {paciente ? (
            <Button variant="outline" className="mb-4" onClick={resetPaciente}>
              <LockIcon className="mr-2 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" className="mb-4">
              <UnlockIcon className="mr-2 h-4 w-4" />
            </Button>
          )}

          <Button
            variant="outline"
            className="mb-4"
            onClick={() => {
              resetPaciente();
              setOpenPaciente(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Nuevo Paciente
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          {pacientes.map((p) => (
            <Card
              key={p.id}
              className={`mb-4 cursor-pointer transition-colors ${
                paciente?.id === p.id ? "bg-[#82ef93c2]" : ""
              }`}
              onClick={() => usePacientesStore.setState({ paciente: p })}
            >
              <CardHeader>
                <CardTitle>{p.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p>
                      <strong>Cédula:</strong> {p.cedula}
                    </p>
                    <p>
                      <strong>Edad:</strong> {calcularEdad(p.fechaNacimiento)}
                    </p>
                    <p>
                      <strong>Genero:</strong> {p.genero}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      <strong>Estado Civil:</strong> {p.estadoCivil}
                    </p>
                    <p>
                      <strong>Profesion:</strong> {p.profesion}
                    </p>
                    <p>
                      <strong>Procedencia:</strong> {p.procedencia}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setOpenPaciente(true)}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Editar Paciente
                </Button>
                <Button variant="outline" onClick={() => setOpenAnt(true)}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Editar Antecedentes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      </div>
      <div
        ref={dividerRef}
        className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-300 active:bg-gray-400"
      />
      <div style={{ width: `${100 - leftPanelWidth}%` }} className="p-4">
        {paciente ? (
          <ScrollArea className="h-full">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Antecedentes</h2>
                <table className="w-full border-collapse border border-gray-300 bg-[#7ffeff4f]">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">
                        Médicos
                      </td>
                      <td className="border border-gray-300 p-2">
                        {paciente?.antecedentes?.medicos}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">
                        Quirúrgicos
                      </td>
                      <td className="border border-gray-300 p-2">
                        {paciente?.antecedentes?.quirurgicos}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">
                        Hábitos
                      </td>
                      <td className="border border-gray-300 p-2">
                        {paciente?.antecedentes?.habitos}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">
                        Actividad Física
                      </td>
                      <td className="border border-gray-300 p-2">
                        {paciente?.antecedentes?.actividadFisica}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div className="flex flex-row justify-start gap-3 my-3">
                  <h2 className="text-2xl font-bold mb-2">
                    Historial de Consultas
                  </h2>
                  <Button
                    variant="default"
                    onClick={() => {
                      setCita(null);
                      setOpenCita(true);
                    }}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" /> Nueva Consulta
                  </Button>
                </div>
                <table className="w-full border-collapse border border-gray-300 bg-[#f7edc5]">
                  <thead className="sticky top-0 z-10 bg-[#f7edc5]">
                    <tr>
                      <th className="border border-gray-300 p-2">Fecha</th>
                      <th className="border border-gray-300 p-2">
                        Motivo de Consulta
                      </th>
                      <th className="border border-gray-300 p-2">
                        Procedimiento
                      </th>
                      <th className="border border-gray-300 p-2">
                        Enfermedad Actual
                      </th>
                      <th className="border border-gray-300 p-2">
                        Examen Clínico
                      </th>
                      <th className="border border-gray-300 p-2">
                        Impresión Diagnóstica
                      </th>
                      <th className="border border-gray-300 p-2">
                        Tratamiento
                      </th>
                      <th className="border border-gray-300 p-2">
                        Observaciones
                      </th>
                      <th className="border border-gray-300 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.length > 0 &&
                      citas.map((c, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">
                            {formatDate(c.fechaCita)}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {c.motivoConsulta}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {c.procedimiento}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {c.enfermedadActual}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {c.examenClinico}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {c.impresionDiagnostica}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {c.tratamiento}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {c.observaciones}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Button
                              variant="link"
                              onClick={() => {
                                setCita(c);
                                setOpenCita(true);
                              }}
                            >
                              Editar
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            Seleccione un paciente para ver su información
          </div>
        )}
      </div>
      <DialogoPaciente
        accion={paciente ? "Actualizar" : "Crear"}
        paciente={paciente}
        open={openPaciente}
        onOpenChange={setOpenPaciente}
      />
      <DialogoAntecedentes
        accion={paciente ? "Actualizar" : "Crear"}
        paciente={paciente}
        antecedentes={paciente?.antecedentes || null}
        open={openAnt}
        onOpenChange={setOpenAnt}
      />
      <DialogoCita
        accion={paciente ? "Crear" : "Actualizar"}
        paciente={paciente}
        cita={cita}
        open={openCita}
        onOpenChange={setOpenCita}
      />
    </div>
  );
}
