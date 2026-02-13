/**
 * LoginUserUseCase - CASO DE USO (Application Layer)
 * 
 * Orquesta el flujo de login sin saber los detalles técnicos.
 * Depende de IAuthRepository (abstracción) recibida por inyección de dependencias.
 * 
 * Si mañana cambias Supabase por Firebase, este archivo NO cambia.
 */

export class LoginUserUseCase {
  /**
   * Constructor Injection: El repositorio se inyecta aquí
   * @param {IAuthRepository} authRepository - Implementación del puerto
   */
  constructor(authRepository) {
    if (!authRepository) {
      throw new Error('authRepository es requerido en LoginUserUseCase');
    }
    this.authRepository = authRepository;
  }

  /**
   * Ejecuta el login
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */
  async execute(email, password) {
    // Validaciones de negocio
    if (!email || typeof email !== 'string') {
      throw new Error('Email es requerido y debe ser un string');
    }
    if (!password || typeof password !== 'string') {
      throw new Error('Contraseña es requerida y debe ser un string');
    }
    if (email.trim().length === 0) {
      throw new Error('Email no puede estar vacío');
    }
    if (password.length < 6) {
      throw new Error('Contraseña debe tener al menos 6 caracteres');
    }

    // Delega la autenticación al repositorio (le importa si es Supabase, Firebase, etc.)
    try {
      const user = await this.authRepository.login(email, password);
      return user;
    } catch (error) {
      // Re-lanzamos el error para que el adaptador primario lo maneje
      throw new Error(`Login fallido: ${error.message}`);
    }
  }
}
