import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IAntecedentes } from "shared/src/interfaces";

const API_BASE_URL = "http://localhost:3000";

// Define the shape of our store.
export type AntecedentesStore = {
  antecedentes: IAntecedentes[];
  listarAntecedentes: () => void;
  crearAntecedente: (antecedente: IAntecedentes) => void;
  actualizarAntecedente: (antecedente: IAntecedentes) => void;
  eliminarAntecedente: (antecedente: IAntecedentes) => void;
};

// Create a store with an initial state.
export const useAntecedentesStore = create<AntecedentesStore>()(
  persist(
    (set, get): AntecedentesStore => ({
      antecedentes: [],
      listarAntecedentes: async () => {
        const response = await fetch(`${API_BASE_URL}/antecedentes`);
        const antecedentes = await response.json();
        set({ antecedentes });
      },
      crearAntecedente: async (antecedente) => {
        const response = await fetch(`${API_BASE_URL}/antecedentes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(antecedente),
        });
        const data = await response.json();
        set({ antecedentes: [...get().antecedentes, data.antecedente] });
      },
      actualizarAntecedente: async (antecedente) => {
        const response = await fetch(
          `${API_BASE_URL}/antecedentes/${antecedente.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(antecedente),
          }
        );
        const data = await response.json();
        const antecedentes = get().antecedentes.map((a) =>
          a.id === data.antecedente.id ? data.antecedente : a
        );
        set({ antecedentes });
      },
      eliminarAntecedente: async (antecedente) => {
        const response = await fetch(
          `${API_BASE_URL}/antecedentes/${antecedente.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          const antecedentes = get().antecedentes.filter(
            (a) => a.id !== antecedente.id
          );
          set({ antecedentes });
        }
      },
    }),
    {
      name: "antecedentes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
