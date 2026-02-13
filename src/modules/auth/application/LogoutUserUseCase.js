/**
 * LogoutUserUseCase - CASO DE USO (Application Layer)
 */

export class LogoutUserUseCase {
  /**
   * Constructor Injection
   * @param {IAuthRepository} authRepository
   */
  constructor(authRepository) {
    if (!authRepository) {
      throw new Error('authRepository es requerido en LogoutUserUseCase');
    }
    this.authRepository = authRepository;
  }

  /**
   * Ejecuta el logout
   * @returns {Promise<void>}
   */
  async execute() {
    try {
      await this.authRepository.logout();
    } catch (error) {
      throw new Error(`Logout fallido: ${error.message}`);
    }
  }
}
