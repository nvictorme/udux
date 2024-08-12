import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FormularioCita } from "../citas/FormularioCita";
import { useLocation } from "react-router-dom";

export function PaginaConsulta() {
  const location = useLocation();
  const { cita } = location.state || {};
  console.log(cita);
  return (
    <div className="p-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Antecedentes</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="p-4">
            <h1 className="text-2xl font-bold">Consulta</h1>
            <FormularioCita
              accion="Actualizar"
              paciente={cita.paciente}
              cita={cita}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
