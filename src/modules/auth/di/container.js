import { LoginUserUseCase } from "../application/LoginUserUseCase";
import { RegisterUserUseCase } from "../application/RegisterUserUseCase";
import { LogoutUserUseCase } from "../application/LogoutUserUseCase";
import { GetCurrentUserUseCase } from "../application/GetCurrentUserUseCase";
import { SupabaseAuthRepository } from "../infrastructure/SupabaseAuthRepository";
// import { LocalAuthRepository } from '../infrastructure/LocalAuthRepository'; // Descomentar para offline

/**
 * AuthContainer - Contenedor de Inyección de Dependencias (DI Container)
 *
 * ✨ ESTA ES LA ÚNICA FUENTE DE VERDAD PARA OBTENER CASOS DE USO ARMADOS
 *
 * Responsabilidades:
 * 1. Instanciar el adaptador de repositorio (SupabaseAuthRepository)
 * 2. Inyectarlo en los Casos de Uso a través del constructor
 * 3. Exportar los casos de uso "listos para usar"
 *
 * CAMBIO RÁPIDO DE INFRAESTRUCTURA (Supabase ↔ Firebase ↔ Local):
 * Solo descomenta/comenta la línea:
 *   this.authRepository = new SupabaseAuthRepository();
 *   // this.authRepository = new LocalAuthRepository();
 *
 * Todo lo demás sigue funcionando. El hexágono está desacoplado.
 */

class AuthContainer {
  constructor() {
    // PASO 1: Instancia del repositorio
    // ➜ Para cambiar a Firebase, creas FirebaseAuthRepository y pones:
    //   this.authRepository = new FirebaseAuthRepository();
    this.authRepository = new SupabaseAuthRepository();
    // this.authRepository = new LocalAuthRepository(); // Descomentar para offline/testing

    // PASO 2: Inyecta el repositorio en los casos de uso
    // (Constructor Injection)
    this.loginUserUseCase = new LoginUserUseCase(this.authRepository);
    this.registerUserUseCase = new RegisterUserUseCase(this.authRepository);
    this.logoutUserUseCase = new LogoutUserUseCase(this.authRepository);
    this.currentUserUseCase = new GetCurrentUserUseCase(this.authRepository);
  }

  /**
   * Getters públicos: La UI obtiene casos de uso desde aquí
   */
  getLoginUserUseCase() {
    return this.loginUserUseCase;
  }

  getRegisterUserUseCase() {
    return this.registerUserUseCase;
  }

  getLogoutUserUseCase() {
    return this.logoutUserUseCase;
  }

  getCurrentUserUseCase() {
    return this.currentUserUseCase;
  }
}

/**
 * Instancia Singleton del contenedor
 * Se crea una sola vez en toda la aplicación
 */
export const authContainer = new AuthContainer();
