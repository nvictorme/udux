import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICita } from "shared/src/interfaces";

const API_BASE_URL = "http://localhost:3000";

// Define the shape of our store.
export type CitasStore = {
  citas: ICita[];
  total: number;
  page: number;
  limit: number;
  pageCount: number;
  listarCitas: () => void;
  crearCita: (cita: ICita) => void;
  actualizarCita: (cita: ICita) => void;
  eliminarCita: (cita: ICita) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

// Create a store with an initial state.
export const useCitasStore = create<CitasStore>()(
  persist(
    (set, get): CitasStore => ({
      citas: [],
      total: 0,
      page: 1,
      limit: 10,
      pageCount: 1,
      listarCitas: async () => {
        const response = await fetch(
          `${API_BASE_URL}/citas?page=${get().page}&limit=${get().limit}`
        );
        const data = await response.json();
        set({ ...data });
      },
      crearCita: async (cita) => {
        const response = await fetch(`${API_BASE_URL}/citas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cita),
        });
        const data = await response.json();
        set({ citas: [...get().citas, data.cita] });
      },
      actualizarCita: async (cita) => {
        const response = await fetch(`${API_BASE_URL}/citas/${cita.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cita),
        });
        const data = await response.json();
        const citas = get().citas.map((c) =>
          c.id === data.cita.id ? data.cita : c
        );
        set({ citas });
      },
      eliminarCita: async (cita) => {
        const response = await fetch(`${API_BASE_URL}/citas/${cita.id}`, {
          method: "DELETE",
        });
        if (response.status === 204) {
          const citas = get().citas.filter((c) => c.id !== cita.id);
          set({ citas });
        }
      },
      setPage: (page) => {
        set({ page });
        get().listarCitas();
      },
      setLimit: (limit) => {
        set({ limit });
        get().listarCitas();
      },
    }),
    {
      name: "citas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
