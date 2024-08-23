import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IPaciente } from "shared/src/interfaces";

import { ApiClient } from "@/api/api.client";

// Define the shape of our store.
export type PacientesStore = {
  pacientes: IPaciente[];
  paciente: IPaciente | null;
  total: number;
  page: number;
  limit: number;
  pageCount: number;
  listarPacientes: ({
    nombre,
    cedula,
  }: {
    nombre?: string;
    cedula?: string;
  }) => void;
  fetchPaciente: (id: number) => void;
  crearPaciente: (paciente: IPaciente) => void;
  actualizarPaciente: (paciente: IPaciente) => void;
  eliminarPaciente: (paciente: IPaciente) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetPaciente: () => void;
  resetPacientes: () => void;
};

const initialState: Pick<
  PacientesStore,
  "pacientes" | "paciente" | "total" | "page" | "limit" | "pageCount"
> = {
  pacientes: [],
  paciente: null,
  total: 0,
  page: 1,
  limit: 10,
  pageCount: 1,
};

// Create a store with an initial state.
export const usePacientesStore = create<PacientesStore>()(
  persist(
    (set, get): PacientesStore => ({
      ...initialState,
      listarPacientes: async ({ nombre, cedula }) => {
        const { data } = await new ApiClient().get(`/pacientes`, {
          page: get().page,
          limit: get().limit,
          ...(nombre && { nombre }),
          ...(cedula && { cedula }),
        });
        set({ ...data });
      },
      fetchPaciente: async (id) => {
        const { data } = await new ApiClient().get(`/pacientes/${id}`, {});
        set({ paciente: data.paciente });
      },
      crearPaciente: async (paciente) => {
        const { data } = await new ApiClient().post(`/pacientes`, paciente);
        set({ pacientes: [data.paciente, ...get().pacientes] });
      },
      actualizarPaciente: async (paciente) => {
        const { data } = await new ApiClient().put(
          `/pacientes/${paciente.id}`,
          paciente
        );
        const pacientes = get().pacientes.map((p) =>
          p.id === data.paciente.id ? data.paciente : p
        );
        set({ pacientes, paciente: data.paciente });
      },
      eliminarPaciente: async (paciente) => {
        const response = await new ApiClient().delete(
          `/pacientes/${paciente.id}`,
          {}
        );
        if (response.status === 204) {
          const pacientes = get().pacientes.filter((p) => p.id !== paciente.id);
          set({ pacientes });
        }
      },
      setPage: (page) => {
        set({ page });
        get().listarPacientes({});
      },
      setLimit: (limit) => {
        set({ limit });
        get().listarPacientes({});
      },
      resetPaciente: () => {
        set({ paciente: null });
      },
      resetPacientes: () => {
        set({ ...initialState });
        get().listarPacientes({});
      },
    }),
    {
      name: "pacientes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
