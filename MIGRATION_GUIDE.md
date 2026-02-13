# 🔄 Guía de Migración - Refactorización a Arquitectura Hexagonal

## Resumen de Cambios

Se refactorizó la aplicación **hacia una Arquitectura Hexagonal con Vertical Slicing**. Esto significa:

✅ **Lógica de negocio desacoplada** de detalles técnicos (Supabase)  
✅ **Constructor Injection** en lugar de imports directos  
✅ **IoC Container** como punto único de configuración  
✅ **Módulos autónomos** que pueden coexistir o ser reemplazados  

---

## 🗂️ Cambios en la Estructura de Carpetas

### Archivos Movidos

| Origen | Destino | Nota |
|--------|---------|------|
| `src/api/supabase.js` | `src/shared/infrastructure/supabaseClient.js` | Centralizado para evitar múltiples instancias |
| `src/context/AuthContext.jsx` | `src/modules/auth/ui/contexts/AuthContext.jsx` | Ahora consume el DI Container |
| `src/pages/loginPage.jsx` | `src/modules/auth/ui/pages/LoginPage.jsx` | Usa `useAuth()` hook |
| `src/services/authService.js` | `src/modules/auth/infrastructure/SupabaseAuthRepository.js` | Refactorizado a adaptador |
| `src/theme/theme.js` | `src/shared/ui/theme/theme.js` | Movido con imports (shared) |

### Nuevas Carpetas (Hexágono)

```
src/modules/auth/
├── domain/              # Entidades e interfaces (puro)
├── application/         # Casos de uso (orquestadores)
├── infrastructure/      # Adaptadores (Supabase, Local, future: Firebase)
├── di/                  # IoC Container
└── ui/                  # Componentes React + Contextos
```

---

## 📝 Cambios en Imports

### `src/main.jsx`
```javascript
// ANTES
import { AuthProvider } from './context/AuthContext';
import theme from './theme/theme';

// DESPUÉS
import { AuthProvider } from './modules/auth/ui/contexts/AuthContext';
import theme from './shared/ui/theme/theme';
```

### `src/App.jsx`
```javascript
// ANTES
import LoginPage from "./pages/loginPage";

// DESPUÉS
import LoginPage from './modules/auth/ui/pages/LoginPage';
```

### `src/modules/auth/ui/pages/LoginPage.jsx`
```javascript
// ANTES
import { loginUser } from '../services/authService';

// DESPUÉS
import { useAuth } from '../../../shared/ui/hooks/useAuth';

// En el componente:
const { login, loading, error } = useAuth();
```

---

## 🔧 Cambiar de Supabase a Firebase (Ejemplo Real)

### Paso 1: Crear nuevo adaptador

```javascript
// src/modules/auth/infrastructure/FirebaseAuthRepository.js
import { IAuthRepository } from '../domain/IAuthRepository';
import { User } from '../domain/User';
import { firebaseAuth } from '../../../shared/infrastructure/firebaseClient';

export class FirebaseAuthRepository extends IAuthRepository {
  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return new User(userCredential.user.uid, userCredential.user.email);
  }
  // ... resto de métodos
}
```

### Paso 2: Cambiar en el container

```javascript
// src/modules/auth/di/container.js

// Línea anterior:
// this.authRepository = new SupabaseAuthRepository();

// Nueva línea:
this.authRepository = new FirebaseAuthRepository();

// ✨ ¡Listo! No cambias nada más
```

---

## ❌ Archivos Antiguos (Eliminar o Deprecar)

Los siguientes archivos son **DEPRECATED** y pueden ser eliminados:

- ❌ `src/services/authService.js` → Lógica movida a `SupabaseAuthRepository.js`
- ❌ `src/api/supabase.js` → Migrado a `src/shared/infrastructure/supabaseClient.js`
- ❌ `src/context/AuthContext.jsx` → Movido a `src/modules/auth/ui/contexts/AuthContext.jsx`
- ❌ `src/pages/loginPage.jsx` → Movido a `src/modules/auth/ui/pages/LoginPage.jsx`
- ❌ `src/theme/theme.js` → Movido a `src/shared/ui/theme/theme.js`

**Nota:** Antes de eliminar, asegúrate de que:
1. Todos los imports fueron actualizados
2. No hay referencias a archivos antiguos en tu código
3. La aplicación compila sin errores

---

## 🎯 Cómo Agregar un Nuevo Caso de Uso

### Ejemplo: `SignUpUserUseCase`

**1. Crear el caso de uso**
```javascript
// src/modules/auth/application/SignUpUserUseCase.js
export class SignUpUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email, password) {
    // Validaciones de negocio
    const user = await this.authRepository.signUp(email, password);
    return user;
  }
}
```

**2. Exportar en `application/index.js`**
```javascript
export { SignUpUserUseCase } from './SignUpUserUseCase';
```

**3. Inyectar en el container**
```javascript
// src/modules/auth/di/container.js
this.signUpUserUseCase = new SignUpUserUseCase(this.authRepository);

getSignUpUserUseCase() {
  return this.signUpUserUseCase;
}
```

**4. Usar en UI**
```javascript
const { signUp } = useAuth(); // (O exponer desde AuthContext)
await signUp(email, password);
```

---

## 📚 Barrel Exports (Importaciones Simplificadas)

Gracias a los archivos `index.js`, ahora puedes importar así:

```javascript
// ✅ Limpio (usando barrel exports)
import { LoginUserUseCase } from '@/modules/auth';

// ❌ Verboso (sin barrel exports)
import { LoginUserUseCase } from '@/modules/auth/application/LoginUserUseCase';
```

---

## ✅ Checklist de Verificación

- [ ] `main.jsx` importa `AuthProvider` de la nueva ruta
- [ ] `main.jsx` importa `theme` de `shared/ui/theme`
- [ ] `App.jsx` importa `LoginPage` de la nueva ruta
- [ ] `LoginPage` usa `useAuth()` hook
- [ ] `AuthContext.jsx` consume el `authContainer`
- [ ] No hay imports a `src/api/supabase.js`
- [ ] No hay imports a `src/services/authService.js`
- [ ] No hay imports a la carpeta `src/context/`
- [ ] La aplicación **compila sin warnings**

---

## 🚀 Próximos Módulos

La estructura está lista para agregar más módulos siguiendo el mismo patrón:

```
src/modules/
├── auth/          ✅ (Ya refactorizado)
├── inventory/     (Próximo: Gestión de inventario)
├── products/      (Próximo: Gestión de productos)
├── reports/       (Próximo: Reportes)
└── ...
```

Cada módulo tendrá su propio:
- Domain (IProductRepository, Product)
- Application (CreateProductUseCase, GetProductsUseCase, etc.)
- Infrastructure (SupabaseProductRepository, LocalProductRepository)
- UI (Componentes React específicos)

---

## 🐛 Troubleshooting

### Error: "useAuth debe usarse dentro de AuthProvider"
**Solución:** Verifica que `main.jsx` envuelve la app con `<AuthProvider>`

### Error: "Cannot find module 'src/api/supabase'"
**Solución:** Busca y reemplaza todos los imports antiguos. Usa:
```javascript
import { supabaseClient } from '@/shared/infrastructure/supabaseClient';
```

### Error: "Container is not defined"
**Solución:** En `AuthContext.jsx`, asegúrate de importar:
```javascript
import { authContainer } from '../../di/container';
```

---

## 📖 Recursos

- `ARCHITECTURE.md` - Documentación completa de la arquitectura
- `src/modules/auth/` - Ejemplo práctico de hexágono completo
- `src/modules/auth/di/container.js` - Punto de cambio único

---

**Versión:** 1.0  
**Fecha:** Febrero 2026  
**Autor:** Senior Architect (Hexagonal Architecture Pattern)
