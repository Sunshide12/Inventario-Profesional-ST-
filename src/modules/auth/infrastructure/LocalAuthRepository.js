import { IAuthRepository } from '../domain/IAuthRepository';
import { User } from '../domain/User';

/**
 * LocalAuthRepository - ADAPTADOR ALTERNATIVO (Infrastructure Layer)
 * 
 * Implementación del puerto IAuthRepository usando almacenamiento local.
 * Útil para modo offline o testing sin Supabase.
 * 
 * Para usar esta implementación en lugar de Supabase:
 * En container.js, descomenta: this.authRepository = new LocalAuthRepository();
 * Y comenta: this.authRepository = new SupabaseAuthRepository();
 */

export class LocalAuthRepository extends IAuthRepository {
  constructor() {
    super();
    // Usuarios de prueba almacenados en memoria
    this.users = new Map([
      ['test@example.com', { id: '1', email: 'test@example.com', password: 'test123', name: 'Test User' }],
      ['admin@example.com', { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin' }],
    ]);
    this.currentUser = null;
  }

  /**
   * Login local
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */
  async login(email, password) {
    // Simular delay de red
    await this._delay(500);

    const user = this.users.get(email);
    if (!user || user.password !== password) {
      throw new Error('Credenciales inválidas');
    }

    this.currentUser = user;
    return new User(user.id, user.email, user.name);
  }

  /**
   * Logout local
   * @returns {Promise<void>}
   */
  async logout() {
    await this._delay(300);
    this.currentUser = null;
  }

  /**
   * Obtener usuario actual
   * @returns {Promise<User|null>}
   */
  async getCurrentUser() {
    await this._delay(200);
    if (!this.currentUser) {
      return null;
    }
    return new User(this.currentUser.id, this.currentUser.email, this.currentUser.name);
  }

  /**
   * Registro local
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */
  async signUp(email, password) {
    await this._delay(500);

    if (this.users.has(email)) {
      throw new Error('El usuario ya existe');
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name: email.split('@')[0],
    };

    this.users.set(email, newUser);
    this.currentUser = newUser;

    return new User(newUser.id, newUser.email, newUser.name);
  }

  /**
   * Utilidad: Simular delay de red
   * @private
   */
  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
