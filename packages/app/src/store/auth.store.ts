import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUsuario } from "shared/src/interfaces";

import { API_BASE_URL } from "@/config";

// Define the shape of our store.
export type AuthStore = {
  user: IUsuario | null;
  register: (userData: {
    nombre: string;
    email: string;
    password: string;
  }) => void;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
};

const initialState: Pick<AuthStore, "user"> = {
  user: null,
};

// Create a store with an initial state.
export const useAuthStore = create<AuthStore>()(
  persist(
    (set): AuthStore => ({
      ...initialState,
      register: async ({ nombre, email, password }) => {
        await fetch(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, password }),
        });
      },
      login: async ({ email, password }) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        set({ user: data.user });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) }
  )
);
