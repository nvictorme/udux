import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TablaPacientes } from "./paginas/pacientes/TablaPacientes";
import "./App.css";
import { TablaCitas } from "./paginas/citas/TablaCitas";

function App() {
  return (
    <Tabs defaultValue="pacientes">
      <TabsList>
        <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
        <TabsTrigger value="citas">Citas</TabsTrigger>
      </TabsList>
      <TabsContent value="pacientes">
        <TablaPacientes />
      </TabsContent>
      <TabsContent value="citas">
        <TablaCitas />
      </TabsContent>
    </Tabs>
  );
}

export default App;
