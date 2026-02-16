import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";
import { supabaseClient } from "../../../shared/infrastructure/supabaseClient";

/**
 * SupabaseAuthRepository - ADAPTADOR (Infrastructure Layer)
 *
 * Implementación concreta del puerto IAuthRepository usando Supabase.
 * Aquí vive toda la magia técnica de Supabase.
 *
 * Si cambias a Firebase mañana, crearías FirebaseAuthRepository.js
 * y solo cambiarías una línea en el DI Container.
 */

export class SupabaseAuthRepository extends IAuthRepository {
  /**
   * Login con Supabase
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */
  async login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Parsear respuesta de Supabase a entidad User del dominio
    return new User(
      data.user.id,
      data.user.email,
      data.user.user_metadata?.name,
    );
  }

  /**
   * Registro con Supabase
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */

  async register(email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return new User(
      data.user.id,
      data.user.email,
      data.user.user_metadata?.name,
    );
  }

  /**
   * Logout con Supabase
   * @returns {Promise<void>}
   */
  async logout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Obtener usuario actual de Supabase
   * @returns {Promise<User|null>}
   */
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();

    // Si el error es "Auth session missing!", es normal (usuario no logueado)
    // Retornamos null en lugar de lanzar error
    if (error) {
      // Solo lanzamos error si es algo grave (no es falta de sesión)
      if (
        error.message?.includes("session") ||
        error.message?.includes("Session")
      ) {
        return null; // Sin autenticación es normal
      }
      throw new Error(error.message);
    }

    if (!user) {
      return null;
    }

    return new User(user.id, user.email, user.user_metadata?.name);
  }
}
