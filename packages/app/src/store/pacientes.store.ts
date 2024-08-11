import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IPaciente } from "shared/src/interfaces";

const API_BASE_URL = "http://localhost:3000";

// Define the shape of our store.
export type PacientesStore = {
  pacientes: IPaciente[];
  total: number;
  page: number;
  limit: number;
  pageCount: number;
  listarPacientes: () => void;
  crearPaciente: (paciente: IPaciente) => void;
  actualizarPaciente: (paciente: IPaciente) => void;
  eliminarPaciente: (paciente: IPaciente) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

// Create a store with an initial state.
export const usePacientesStore = create<PacientesStore>()(
  persist(
    (set, get): PacientesStore => ({
      pacientes: [],
      total: 0,
      page: 1,
      limit: 10,
      pageCount: 1,
      listarPacientes: async () => {
        const response = await fetch(
          `${API_BASE_URL}/pacientes?page=${get().page}&limit=${get().limit}`
        );
        const data = await response.json();
        set({ ...data });
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
        set({ pacientes: [data.paciente, ...get().pacientes] });
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
      setPage: (page) => {
        set({ page });
        get().listarPacientes();
      },
      setLimit: (limit) => {
        set({ limit });
        get().listarPacientes();
      },
    }),
    {
      name: "pacientes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
