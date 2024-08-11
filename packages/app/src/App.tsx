import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TablaPacientes } from "./pacientes/TablaPacientes";
import "./App.css";

function App() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
        <TabsTrigger value="citas">Citas</TabsTrigger>
      </TabsList>
      <TabsContent value="pacientes">
        <TablaPacientes />
      </TabsContent>
      <TabsContent value="citas">Change your password here.</TabsContent>
    </Tabs>
  );
}

export default App;
