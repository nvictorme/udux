import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICita } from "shared/src/interfaces";
import { ApiClient } from "@/api/api.client";

// Define the shape of our store.
export type CitasStore = {
  citas: ICita[];
  cita: ICita | null;
  total: number;
  page: number;
  limit: number;
  pageCount: number;
  listarCitas: () => void;
  fetchCita: (id: number) => void;
  crearCita: (cita: ICita) => void;
  actualizarCita: (cita: ICita) => void;
  eliminarCita: (cita: ICita) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetCita: () => void;
  resetCitas: () => void;
};

const initialState: Pick<
  CitasStore,
  "citas" | "cita" | "total" | "page" | "limit" | "pageCount"
> = {
  citas: [],
  cita: null,
  total: 0,
  page: 1,
  limit: 10,
  pageCount: 1,
};

// Create a store with an initial state.
export const useCitasStore = create<CitasStore>()(
  persist(
    (set, get): CitasStore => ({
      ...initialState,
      listarCitas: async () => {
        const { data } = await new ApiClient().get(
          `/citas?page=${get().page}&limit=${get().limit}`,
          {}
        );
        set({ ...data });
      },
      fetchCita: async (id) => {
        const { data } = await new ApiClient().get(`/citas/${id}`, {});
        set({ cita: data.cita });
      },
      crearCita: async (cita) => {
        const { data } = await new ApiClient().post(`/citas`, cita);
        set({ citas: [...get().citas, data.cita] });
      },
      actualizarCita: async (cita) => {
        const { data } = await new ApiClient().put(`/citas/${cita.id}`, cita);
        const citas = get().citas.map((c) =>
          c.id === data.cita.id ? data.cita : c
        );
        set({ citas });
      },
      eliminarCita: async (cita) => {
        const response = await new ApiClient().delete(`/citas/${cita.id}`, {});
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
      resetCita: () => set({ cita: null }),
      resetCitas: () => {
        set({ ...initialState });
        get().listarCitas();
      },
    }),
    {
      name: "citas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
