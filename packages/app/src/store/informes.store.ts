import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IInforme } from "shared/src/interfaces";

import { ApiClient } from "@/api/api.client";

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
        const { data } = await new ApiClient().get(`/informes`, {});
        set({ informes: data.informes });
      },
      crearInforme: async (informe) => {
        const { data } = await new ApiClient().post(`/informes`, informe);
        set({ informes: [...get().informes, data.informe] });
      },
      actualizarInforme: async (informe) => {
        const { data } = await new ApiClient().put(
          `/informes/${informe.id}`,
          informe
        );
        const informes = get().informes.map((i) =>
          i.id === data.informe.id ? data.informe : i
        );
        set({ informes });
      },
      eliminarInforme: async (informe) => {
        const response = await new ApiClient().delete(
          `/informes/${informe.id}`,
          {}
        );
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
