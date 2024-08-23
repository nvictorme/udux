import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken, ITokens, IUsuario } from "shared/src/interfaces";
import { ApiClient } from "@/api/api.client";

// Define the shape of our store.
export type AuthStore = {
  user: IUsuario | null;
  tokens: ITokens | null;
  register: (userData: {
    nombre: string;
    email: string;
    password: string;
  }) => void;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
};

const initialState: Pick<AuthStore, "user" | "tokens"> = {
  user: null,
  tokens: null,
};

// Create a store with an initial state.
export const useAuthStore = create<AuthStore>()(
  persist(
    (set): AuthStore => ({
      ...initialState,
      register: async ({ nombre, email, password }) => {
        const { data } = await new ApiClient().post("/auth/register", {
          nombre,
          email,
          password,
        });
        const tokens = data.tokens as ITokens;
        const { user } = jwtDecode(tokens.accessToken) as IDecodedToken;
        set({ user, tokens });
      },
      login: async ({ email, password }) => {
        const { data } = await new ApiClient().post("/auth/login", {
          email,
          password,
        });
        const tokens = data.tokens as ITokens;
        const { user } = jwtDecode(tokens.accessToken) as IDecodedToken;
        set({ user, tokens });
      },
      logout: () => {
        set({ ...initialState });
      },
    }),
    { name: "auth-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);
