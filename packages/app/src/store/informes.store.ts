import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IInforme } from "shared/src/interfaces";

import { API_BASE_URL } from "@/config";

// Define the shape of our store.
export type InformesStore = {
  informes: IInforme[];
  listarInformes: () => void;
  crearInforme: (informe: IInforme) => void;
  actualizarInforme: (informe: IInforme) => void;
  eliminarInforme: (informe: IInforme) => void;
};

// Create a store with an initial state.
export const useInformesStore = create<InformesStore>()(
  persist(
    (set, get): InformesStore => ({
      informes: [],
      listarInformes: async () => {
        const response = await fetch(`${API_BASE_URL}/informes`);
        const informes = await response.json();
        set({ informes });
      },
      crearInforme: async (informe) => {
        const response = await fetch(`${API_BASE_URL}/informes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(informe),
        });
        const data = await response.json();
        set({ informes: [...get().informes, data.informe] });
      },
      actualizarInforme: async (informe) => {
        const response = await fetch(`${API_BASE_URL}/informes/${informe.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(informe),
        });
        const data = await response.json();
        const informes = get().informes.map((i) =>
          i.id === data.informe.id ? data.informe : i
        );
        set({ informes });
      },
      eliminarInforme: async (informe) => {
        const response = await fetch(`${API_BASE_URL}/informes/${informe.id}`, {
          method: "DELETE",
        });
        if (response.status === 204) {
          const informes = get().informes.filter((i) => i.id !== informe.id);
          set({ informes });
        }
      },
    }),
    {
      name: "informes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
