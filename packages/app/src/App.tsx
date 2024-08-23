import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TablaPacientes } from "./paginas/pacientes/TablaPacientes";
import "./App.css";
import { TablaCitas } from "./paginas/citas/TablaCitas";
import { formatDate } from "shared/src/helpers";

function App() {
  return (
    <>
      <h1 className="text-xl font-bold text-center">
        Unidad Diagnóstica Urológica
      </h1>
      <h2 className="font-bold my-4">
        Hoy es {formatDate(new Date().toISOString().split("T")[0])}
      </h2>
      <Tabs defaultValue="citas">
        <TabsList>
          <TabsTrigger value="citas">Citas</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
        </TabsList>

        <TabsContent value="citas">
          <TablaCitas />
        </TabsContent>

        <TabsContent value="pacientes">
          <TablaPacientes />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;
