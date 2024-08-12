import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IAntecedentes } from "shared/src/interfaces";

import { API_BASE_URL } from "@/config";

// Define the shape of our store.
export type AntecedentesStore = {
  antecedente: IAntecedentes | null;
  fetchAntecedente: (id: number) => void;
  crearAntecedente: (antecedente: IAntecedentes) => void;
  actualizarAntecedente: (antecedente: IAntecedentes) => void;
  eliminarAntecedente: (antecedente: IAntecedentes) => void;
};

// Create a store with an initial state.
export const useAntecedentesStore = create<AntecedentesStore>()(
  persist(
    (set): AntecedentesStore => ({
      antecedente: null,
      fetchAntecedente: async (id) => {
        const response = await fetch(`${API_BASE_URL}/antecedentes/${id}`);
        const data = await response.json();
        set({ antecedente: data.antecedente });
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
        set({ antecedente: data.antecedente });
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
        set({ antecedente: data.antecedente });
      },
      eliminarAntecedente: async (antecedente) => {
        const response = await fetch(
          `${API_BASE_URL}/antecedentes/${antecedente.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          set({ antecedente: null });
        }
      },
    }),
    {
      name: "antecedentes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
