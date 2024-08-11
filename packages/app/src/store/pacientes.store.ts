import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IPaciente } from "shared/src/interfaces";

const API_BASE_URL = "http://localhost:3000";

// Define the shape of our store.
export type PacientesStore = {
  pacientes: IPaciente[];
  listarPacientes: () => void;
  crearPaciente: (paciente: IPaciente) => void;
  actualizarPaciente: (paciente: IPaciente) => void;
  eliminarPaciente: (paciente: IPaciente) => void;
};

// Create a store with an initial state.
export const usePacientesStore = create<PacientesStore>()(
  persist(
    (set, get): PacientesStore => ({
      pacientes: [],
      listarPacientes: async () => {
        const response = await fetch(`${API_BASE_URL}/pacientes`);
        const data = await response.json();
        set({ pacientes: data.pacientes });
      },
      crearPaciente: async (paciente) => {
        const response = await fetch(`${API_BASE_URL}/pacientes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paciente),
        });
        const data = await response.json();
        set({ pacientes: [...get().pacientes, data.paciente] });
      },
      actualizarPaciente: async (paciente) => {
        const response = await fetch(
          `${API_BASE_URL}/pacientes/${paciente.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paciente),
          }
        );
        const data = await response.json();
        const pacientes = get().pacientes.map((p) =>
          p.id === data.paciente.id ? data.paciente : p
        );
        set({ pacientes });
      },
      eliminarPaciente: async (paciente) => {
        const response = await fetch(
          `${API_BASE_URL}/pacientes/${paciente.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          const pacientes = get().pacientes.filter((p) => p.id !== paciente.id);
          set({ pacientes });
        }
      },
    }),
    {
      name: "pacientes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
