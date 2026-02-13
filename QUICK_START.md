# 🚀 Quick Start - Cómo Usar la Nueva Arquitectura

## 📍 Ubicaciones Principales

| Componente | Ruta |
|-----------|------|
| **Páginas** | `src/modules/auth/ui/pages/` |
| **Contextos** | `src/modules/auth/ui/contexts/` |
| **Lógica de negocio** | `src/modules/auth/application/` |
| **Base de datos** | `src/modules/auth/infrastructure/` |
| **Entidades** | `src/modules/auth/domain/` |
| **Configuración global** | `src/modules/auth/di/container.js` |

---

## 📖 Usar AuthContext en un Componente

```jsx
import { useAuth } from '@/shared/ui/hooks';

function MiComponente() {
  const { user, loading, error, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Bienvenido {user.email}</p>
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <p>No autenticado</p>
      )}
    </div>
  );
}
```

---

## 🔧 Cambiar de Supabase a Firebase

### 1. Crear nuevo adaptador
```javascript
// src/modules/auth/infrastructure/FirebaseAuthRepository.js
export class FirebaseAuthRepository extends IAuthRepository {
  async login(email, password) { /* tu código Firebase */ }
  // ...más métodos
}
```

### 2. Cambiar en container.js
```javascript
// src/modules/auth/di/container.js
// this.authRepository = new SupabaseAuthRepository();
this.authRepository = new FirebaseAuthRepository();
```

### 3. ¡Listo! 🎉

---

## ✨ Agregar un Nuevo Caso de Uso

Ejemplo: `SignUpUserUseCase`

### 1. Crear en application/
```javascript
// src/modules/auth/application/SignUpUserUseCase.js
export class SignUpUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email, password) {
    const user = await this.authRepository.signUp(email, password);
    return user;
  }
}
```

### 2. Exportar en application/index.js
```javascript
export { SignUpUserUseCase } from './SignUpUserUseCase';
```

### 3. Inyectar en container.js
```javascript
this.signUpUserUseCase = new SignUpUserUseCase(this.authRepository);
getSignUpUserUseCase() { return this.signUpUserUseCase; }
```

### 4. Usar en AuthContext
```jsx
const signUpUseCase = authContainer.getSignUpUserUseCase();
await signUpUseCase.execute(email, password);
```

---

## 📂 Agregar un Nuevo Módulo

Ejemplo: Sistema de Inventario

```
src/modules/inventory/
├── domain/
│   ├── IInventoryRepository.js
│   ├── InventoryItem.js
│   └── index.js
├── application/
│   ├── GetInventoryUseCase.js
│   ├── AddItemUseCase.js
│   └── index.js
├── infrastructure/
│   ├── SupabaseInventoryRepository.js
│   └── index.js
├── di/
│   └── container.js
├── ui/
│   ├── pages/
│   │   └── InventoryPage.jsx
│   ├── components/
│   │   └── InventoryList.jsx
│   └── index.js
└── index.js
```

---

## 🧪 Testing (Ejemplo)

```javascript
import { LoginUserUseCase } from '@/modules/auth/application';

// ✅ Mock: No necesitas Supabase
const mockRepository = {
  login: async (email, password) => ({
    id: '123',
    email: email,
  }),
};

const useCase = new LoginUserUseCase(mockRepository);
const user = await useCase.execute('test@test.com', 'pass');

// ✅ Funciona sin tocar la BD
expect(user.email).toBe('test@test.com');
```

---

## ❌ Errores Comunes

### Error: "useAuth debe usarse dentro de AuthProvider"
**Solución:** Verifica que `main.jsx` está envolviendo la app:
```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Error: "Cannot find module 'src/context/AuthContext'"
**Solución:** Usa la nueva ruta:
```javascript
import { AuthProvider } from '@/modules/auth/ui/contexts/AuthContext';
```

### Error: "Container is not defined"
**Solución:** En `AuthContext.jsx`, importa:
```javascript
import { authContainer } from '../../di/container';
```

---

## 🔍 Ver Estructura del Proyecto

```bash
tree src/modules/auth/
```

Resultado esperado:
```
auth/
├── domain/
│   ├── IAuthRepository.js
│   ├── User.js
│   └── index.js
├── application/
│   ├── LoginUserUseCase.js
│   ├── LogoutUserUseCase.js
│   ├── GetCurrentUserUseCase.js
│   └── index.js
├── infrastructure/
│   ├── SupabaseAuthRepository.js
│   ├── LocalAuthRepository.js
│   └── index.js
├── di/
│   └── container.js
├── ui/
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   └── LoginPage.jsx
│   └── index.js
└── index.js
```

---

## 📚 Documentación Completa

- **ARCHITECTURE.md** - Conceptos y patrones
- **MIGRATION_GUIDE.md** - Cambios y cómo migrar
- **REFACTORING_SUMMARY.md** - Resumen de qué se hizo
- **QUICK_START.md** - Este archivo

---

**¡Listo! Empieza a desarrollar con la nueva arquitectura.** ✨
