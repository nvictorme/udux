import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TablaPacientes } from "./paginas/pacientes/TablaPacientes";
import "./App.css";
import { TablaCitas } from "./paginas/citas/TablaCitas";

function App() {
  return (
    <>
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
