import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IAntecedentes } from "shared/src/interfaces";
import { ApiClient } from "@/api/api.client";

// Define the shape of our store.
export type AntecedentesStore = {
  antecedente: IAntecedentes | null;
  fetchAntecedente: (id: number) => void;
  crearAntecedente: (antecedente: IAntecedentes) => void;
  actualizarAntecedente: (antecedente: IAntecedentes) => void;
  eliminarAntecedente: (antecedente: IAntecedentes) => void;
  resetAntecedente: () => void;
};

// Create a store with an initial state.
export const useAntecedentesStore = create<AntecedentesStore>()(
  persist(
    (set): AntecedentesStore => ({
      antecedente: null,
      fetchAntecedente: async (id) => {
        const { data } = await new ApiClient().get(`/antecedentes/${id}`, {});
        set({ antecedente: data.antecedente });
      },
      crearAntecedente: async (antecedente) => {
        const { data } = await new ApiClient().post(
          `/antecedentes`,
          antecedente
        );
        set({ antecedente: data.antecedente });
      },
      actualizarAntecedente: async (antecedente) => {
        const { data } = await new ApiClient().put(
          `/antecedentes/${antecedente.id}`,
          antecedente
        );
        set({ antecedente: data.antecedente });
      },
      eliminarAntecedente: async (antecedente) => {
        const response = await new ApiClient().delete(
          `/antecedentes/${antecedente.id}`,
          {}
        );
        if (response.status === 204) {
          set({ antecedente: null });
        }
      },
      resetAntecedente: () => set({ antecedente: null }),
    }),
    {
      name: "antecedentes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
