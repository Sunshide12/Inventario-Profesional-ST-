import { createContext, useCallback, useEffect, useState } from "react";
import { authContainer } from "../../di/container";

/**
 * AuthContext - Adaptador Primario (Primary Adapter)
 *
 * Bridge limpio que conecta:
 * - La capa de presentación (Componentes React)
 * - Con los Casos de Uso del dominio (a través del container)
 *
 * IMPORTANTE: Este contexto NO contiene lógica de Supabase.
 * Solo consume casos de uso del contenedor y gestiona estado de UI.
 */

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los casos de uso del contenedor
  const loginUseCase = authContainer.getLoginUserUseCase();
  const registerUseCase = authContainer.getRegisterUserUseCase();
  const logoutUseCase = authContainer.getLogoutUserUseCase();
  const getCurrentUserUseCase = authContainer.getCurrentUserUseCase();

  /**
   * Wrapper de login: Coordina el flujo UI + Caso de Uso
   */
  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        // El caso de uso hace toda la lógica (validaciones, Supabase, etc.)
        const userData = await loginUseCase.execute(email, password);
        setUser(userData);
        return userData;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido en login";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loginUseCase],
  );

  /**
   * Wrapper de register: Coordina el flujo UI + Caso de Uso
   */
  const register = useCallback(
    async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        // El caso de uso hace toda la lógica (validaciones, Supabase, etc.)
        const userData = await registerUseCase.execute(email, password); // llamada al caso de uso
        setUser(userData);
        return userData;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido en register";
        setError(errorMessage);
        throw err; // re-lanzar para que el componente que llamó a register pueda manejarlo
      } finally {
        setLoading(false); // siempre desactivar loading
      }
    },
    [registerUseCase], // dependencia: recrear solo si cambia registerUseCase
  );

  /**
   * Wrapper de logout
   */
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutUseCase.execute();
      setUser(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido en logout";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [logoutUseCase]);

  /**
   * Al montar el componente, verifica si hay usuario activo
   */
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUserUseCase.execute();
        setUser(currentUser); // null si no hay sesión, User si hay sesión
      } catch (err) {
        // Solo log errores genuinos (no "sesión no existe" que es normal)
        console.debug("Verificación de sesión:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [getCurrentUserUseCase]);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
