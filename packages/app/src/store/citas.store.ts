import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICita } from "shared/src/interfaces";

const API_BASE_URL = "http://localhost:3000";

// Define the shape of our store.
export type CitasStore = {
  citas: ICita[];
  listarCitas: () => void;
  crearCita: (cita: ICita) => void;
  actualizarCita: (cita: ICita) => void;
  eliminarCita: (cita: ICita) => void;
};

// Create a store with an initial state.
export const useCitasStore = create<CitasStore>()(
  persist(
    (set, get): CitasStore => ({
      citas: [],
      listarCitas: async () => {
        const response = await fetch(`${API_BASE_URL}/citas`);
        const citas = await response.json();
        set({ citas });
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
    }),
    {
      name: "citas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
