/**
 * GetCurrentUserUseCase - CASO DE USO (Application Layer)
 */

export class GetCurrentUserUseCase {
  /**
   * Constructor Injection
   * @param {IAuthRepository} authRepository
   */
  constructor(authRepository) {
    if (!authRepository) {
      throw new Error('authRepository es requerido en GetCurrentUserUseCase');
    }
    this.authRepository = authRepository;
  }

  /**
   * Obtiene el usuario actual
   * @returns {Promise<User|null>}
   */
  async execute() {
    try {
      const user = await this.authRepository.getCurrentUser();
      return user;
    } catch (error) {
      // Si es un error de sesión, retornar null (es un estado normal)
      if (error.message?.includes('session') || error.message?.includes('Session')) {
        return null;
      }
      throw new Error(`Error obteniendo usuario actual: ${error.message}`);
    }
  }
}
