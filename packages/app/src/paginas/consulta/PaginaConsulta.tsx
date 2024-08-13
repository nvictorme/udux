import { FormularioCita } from "../citas/FormularioCita";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { calcularEdad, formatDate } from "shared/src/helpers";
import { Button } from "@/components/ui/button";
import { DialogoPaciente } from "../pacientes/DialogoPaciente";
import { useCitasStore } from "@/store/citas.store";
import { Spinner } from "@/components/Spinner";
import { usePacientesStore } from "@/store/pacientes.store";
import { useEffect, useState } from "react";
import { DialogoAntecedentes } from "../antecedentes/DialogoAntecedentes";
import { useAntecedentesStore } from "@/store/antecedentes.store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICita } from "shared/src/interfaces";
import { API_BASE_URL } from "@/config";

export function PaginaConsulta() {
  // Local state.
  const [openPaciente, setOpenPaciente] = useState(false);
  const [openAntecedentes, setOpenAntecedentes] = useState(false);

  // Get the current cita id from the URL.
  const location = useLocation();
  // Get the cita id from the URL.
  const citaId = parseInt(location.pathname.split("/").pop() as string, 10);

  // Get the cita from the store.
  const { cita, fetchCita, resetCita } = useCitasStore();
  const [citas, setCitas] = useState<ICita[]>([]);

  // Get paciente from the store.
  const { paciente, fetchPaciente, resetPaciente } = usePacientesStore();

  // Get the antecedentes from the store.
  const { antecedente, fetchAntecedente, resetAntecedente } =
    useAntecedentesStore();

  // Fetch cita on mount.
  useEffect(() => {
    fetchCita(citaId);
    return () => {
      resetCita();
    };
  }, [citaId, fetchCita, resetCita]);

  // Fetch paciente when cita changes.
  useEffect(() => {
    if (cita?.paciente) {
      fetchPaciente(cita.paciente.id);
    }
    return () => {
      resetPaciente();
    };
  }, [cita, fetchPaciente, resetPaciente]);

  // Fetch antecedentes when paciente changes.
  useEffect(() => {
    if (paciente) {
      if (paciente.antecedentes) {
        fetchAntecedente(paciente.antecedentes.id);
      }
      fetch(`${API_BASE_URL}/citas/paciente/${paciente.id}`)
        .then((res) => res.json())
        .then((data) =>
          setCitas(data.citas.filter((c: ICita) => c.id !== citaId))
        );
    }
    return () => {
      resetAntecedente();
    };
  }, [paciente, fetchAntecedente, resetAntecedente, citaId]);

  // Show a spinner while loading.
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
                <span className="font-light text-sm">Edad:</span>
                <br />
                {calcularEdad(paciente.fechaNacimiento)}
              </p>
            </div>
            <div className="col-span-2 gap-2 flex flex-col">
              <p>
                <span className="font-light text-sm">Estado civil:</span>
                <br />
                {paciente.estadoCivil}
              </p>
              <p>
                <span className="font-light text-sm">Profesión:</span>
                <br />
                {paciente.profesion}
              </p>
            </div>
            <div className="col-span-2 gap-2 flex flex-col">
              <p>
                <span className="font-light text-sm">Cédula:</span>
                <br />
                {paciente.cedula}
              </p>
              <p>
                <span className="font-light text-sm">Procedencia:</span>
                <br />
                {paciente.procedencia}
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
          {antecedente ? (
            <div className="grid grid-cols-6 gap-1 text-xl">
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Médicos:</span>
                  <br />
                  <i>{antecedente.medicos}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Quirúrgicos:</span>
                  <br />
                  <i>{antecedente.quirurgicos}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Familiares:</span>
                  <br />
                  <i>{antecedente.habitos}</i>
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p>
                  <span className="font-light text-sm">Actividad física:</span>
                  <br />
                  <i>{antecedente.actividadFisica}</i>
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>
        <Button variant="secondary" onClick={() => setOpenAntecedentes(true)}>
          Actualizar Antecedentes
        </Button>
      </Card>

      {/* Historial de consultas */}
      <Card className="p-4">
        <CardTitle>
          <h1 className="text-2xl">Historial de consultas</h1>
        </CardTitle>
        <CardContent>
          <Accordion type="multiple">
            {citas.map((cita) => (
              <AccordionItem key={cita.id} value={`${cita.id}`}>
                <AccordionTrigger>
                  <div className="flex justify-between">
                    <div>
                      <p>
                        {formatDate(cita.fechaCita)} - {cita.motivoConsulta}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-8 gap-4 text-xl">
                    <div className="col-span-2 flex flex-col gap-2">
                      <p>
                        <span className="font-light text-sm">Motivo:</span>
                        <br />
                        {cita.motivoConsulta}
                      </p>
                      <p className="mt-2">
                        <span className="font-light text-sm">
                          Enfermedad Actual:
                        </span>
                        <br />
                        {cita.enfermedadActual}
                      </p>
                    </div>

                    <div className="col-span-2 flex flex-col gap-2">
                      <p>
                        <span className="font-light text-sm">
                          Examen Clínico:
                        </span>
                        <br />
                        {cita.examenClinico}
                      </p>
                      <p>
                        <span className="font-light text-sm">
                          Procedimiento:
                        </span>
                        <br />
                        {cita.procedimiento}
                      </p>
                    </div>

                    <div className="col-span-2 flex flex-col gap-2">
                      <p>
                        <span className="font-light text-sm">
                          Impresión Diagnóstica:
                        </span>
                        <br />
                        {cita.impresionDiagnostica}
                      </p>
                      <p>
                        <span className="font-light text-sm">Tratamiento:</span>
                        <br />
                        {cita.tratamiento}
                      </p>
                    </div>

                    <div className="col-span-2 flex flex-col gap-2">
                      <p>
                        <span className="font-light text-sm">
                          Observaciones:
                        </span>
                        <br />
                        {cita.observaciones}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
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
        accion={!antecedente ? "Crear" : "Actualizar"}
        paciente={paciente}
        antecedentes={antecedente}
        open={openAntecedentes}
        onOpenChange={setOpenAntecedentes}
      />
    </div>
  );
}
