/**
 * User - ENTIDAD (Domain Layer)
 * 
 * Representa un usuario en el dominio de negocio.
 * Contiene solo lógica de negocio pura, sin dependencias técnicas.
 */

export class User {
  constructor(id, email, name = null) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  /**
   * Valida si el usuario está completo
   * @returns {boolean}
   */
  isValid() {
    return this.id && this.email;
  }

  /**
   * Retorna una representación segura del usuario (sin datos sensibles)
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }
}
