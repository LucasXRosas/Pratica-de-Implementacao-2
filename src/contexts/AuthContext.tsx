import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { api, setAuthToken } from "@/services/api";
import { loginRequest, refreshRequest } from "@/services/auth";
import { User } from "@/types";
import { isUnauthorized } from "@/utils/errors";

const TOKEN_KEY = "@catalogo-jogos:token";
const USER_KEY = "@catalogo-jogos:user";

// Props do contexto de autenticação
export interface AuthContextProps {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; // true enquanto a sessão salva está sendo restaurada
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Contexto vazio (undefined) — o acesso é feito pelo hook useAuthContext
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider: todo o estado de autenticação fica encapsulado aqui
export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveSession = useCallback(async (newToken: string, newUser: User) => {
    setAuthToken(newToken);
    await AsyncStorage.multiSet([
      [TOKEN_KEY, newToken],
      [USER_KEY, JSON.stringify(newUser)],
    ]);
    setUser(newUser);
    setToken(newToken);
  }, []);

  const logout = useCallback(async () => {
    setAuthToken(null);
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  }, []);

  // Ao abrir o app: recupera o token salvo e reestabelece a sessão
  useEffect(() => {
    async function restoreSession() {
      try {
        const [[, storedToken], [, storedUser]] = await AsyncStorage.multiGet([
          TOKEN_KEY,
          USER_KEY,
        ]);
        if (!storedToken || !storedUser) return;

        setAuthToken(storedToken);
        try {
          // Valida o token no servidor e renova-o
          const data = await refreshRequest();
          await saveSession(data.token, data.record);
        } catch (error) {
          if (isUnauthorized(error)) {
            await logout(); // token expirado/inválido
          } else {
            // Sem conexão: mantém a sessão local; as telas exibem o erro de rede
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
          }
        }
      } catch {
        await logout();
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, [logout, saveSession]);

  // Se qualquer requisição autenticada retornar 401, encerra a sessão
  useEffect(() => {
    const interceptor = api.interceptors.response.use(undefined, (error) => {
      if (error?.response?.status === 401 && api.defaults.headers.common.Authorization) {
        logout();
      }
      return Promise.reject(error);
    });
    return () => api.interceptors.response.eject(interceptor);
  }, [logout]);

  const authContext: AuthContextProps = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login: async (email, password) => {
      const data = await loginRequest(email.trim(), password);
      await saveSession(data.token, data.record);
    },
    logout,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

// Hook consumidor
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used inside AuthContextProvider!");
  }

  return context;
}
