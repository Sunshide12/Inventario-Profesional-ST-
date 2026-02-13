/**
 * IAuthRepository - PUERTO/INTERFAZ (Domain Layer)
 * 
 * Define el contrato que debe cumplir cualquier repositorio de autenticación.
 * No importa si usas Supabase, Firebase, SQL Server o un mock local.
 * 
 * El dominio DEFINE el contrato; la infraestructura lo IMPLEMENTA.
 */

export class IAuthRepository {
  /**
   * Autentica un usuario con email y contraseña
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{id: string, email: string, name?: string}>}
   */
  async login(email, password) {
    throw new Error('login() debe ser implementado por la subclase');
  }

  /**
   * Desautentica al usuario actual
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('logout() debe ser implementado por la subclase');
  }

  /**
   * Obtiene el usuario autenticado actualmente
   * @returns {Promise<{id: string, email: string, name?: string} | null>}
   */
  async getCurrentUser() {
    throw new Error('getCurrentUser() debe ser implementado por la subclase');
  }

  /**
   * Registra un nuevo usuario
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{id: string, email: string, name?: string}>}
   */
  async signUp(email, password) {
    throw new Error('signUp() debe ser implementado por la subclase');
  }
}
