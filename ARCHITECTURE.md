# Arquitectura Hexagonal - Vertical Slicing

## 📐 Estructura General

Este proyecto implementa **Arquitectura Hexagonal (Puertos y Adaptadores)** con enfoque en **Vertical Slicing**. Cada módulo es autónomo y puede ser reutilizado o reemplazado independientemente.

```
src/
├── modules/                          # Módulos de negocio autónomos
│   └── auth/                         # Módulo de Autenticación (vertical slice)
│       ├── domain/                   # 🎯 NÚCLEO de negocio (sin dependencias externas)
│       │   ├── IAuthRepository.js    # Puerto (interfaz/contrato)
│       │   ├── User.js               # Entidad
│       │   └── index.js              # Barrel export
│       │
│       ├── application/              # 🔄 Orquestadores (lógica de negocio)
│       │   ├── LoginUserUseCase.js   # Caso de uso: Login
│       │   ├── LogoutUserUseCase.js  # Caso de uso: Logout
│       │   ├── GetCurrentUserUseCase.js
│       │   └── index.js              # Barrel export
│       │
│       ├── infrastructure/           # 🔌 Adaptadores técnicos
│       │   ├── SupabaseAuthRepository.js  # Implementación con Supabase
│       │   ├── LocalAuthRepository.js     # Implementación local (offline)
│       │   └── index.js              # Barrel export
│       │
│       ├── di/                       # 💉 Dependency Injection
│       │   └── container.js          # IoC Container (configura todo)
│       │
│       ├── ui/                       # 🎨 Adaptadores Primarios (React)
│       │   ├── contexts/             
│       │   │   └── AuthContext.jsx   # Bridge: Consume casos de uso
│       │   ├── pages/
│       │   │   └── LoginPage.jsx     # Componente de UI
│       │   └── index.js              # Barrel export
│       │
│       └── index.js                  # Barrel export global del módulo
│
├── shared/                           # 📦 Código transversal reutilizable
│   ├── infrastructure/
│   │   └── supabaseClient.js         # Cliente de Supabase (centralizado)
│   │
│   └── ui/
│       ├── components/               # Componentes globales (botones, modales, etc.)
│       ├── hooks/
│       │   ├── useAuth.js            # Hook para consumir AuthContext
│       │   └── index.js              # Barrel export
│       ├── layouts/                  # Layouts reutilizables
│       ├── theme/
│       │   └── theme.js              # Configuración de Material-UI
│       └── utils/                    # Utilidades globales
│
├── App.jsx                           # Root component
├── main.jsx                          # Entry point
└── index.css                         # Estilos globales
```

---

## 🏗️ Capas de la Arquitectura Hexagonal

### 1. **Domain (核心 Core)**
- **Responsabilidad:** Lógica de negocio pura
- **Dependencias:** NINGUNA (sin React, Supabase, librerías externas)
- **Ejemplo:** `User.js`, `IAuthRepository.js`
- **Cambio sin impacto:** Si cambias de base de datos, el dominio NO cambia

### 2. **Application (Casos de Uso)**
- **Responsabilidad:** Orquestación de flujos de negocio
- **Depende de:** Dominio (interfaces/puertos)
- **Independiente de:** Infraestructura específica
- **Ejemplo:** `LoginUserUseCase.execute(email, password)`

### 3. **Infrastructure (Adaptadores)**
- **Responsabilidad:** Implementaciones técnicas concretas
- **Aquí vive:** Supabase, Firebase, bases de datos, APIs externas
- **Implementa:** Los puertos definidos en Domain
- **Ejemplo:** `SupabaseAuthRepository` implementa `IAuthRepository`

### 4. **Primary Adapters (UI/React)**
- **Responsabilidad:** Interacción con el usuario
- **Depende de:** Casos de uso (a través del DI Container)
- **Ejemplo:** `LoginPage.jsx` → `useAuth()` → Casos de Uso

### 5. **DI Container (IoC)**
- **Responsabilidad:** Inyectar dependencias y configurar el hexágono
- **ÚNICA FUENTE DE VERDAD:** Aquí defines qué implementación usar
- **Ejemplo:** Si cambias de Supabase a Firebase, cambias UNA línea aquí

---

## 🔄 Flujo de Datos

```
LoginPage (UI)
    ↓
useAuth() → AuthContext
    ↓
authContainer.getLoginUserUseCase()
    ↓
LoginUserUseCase.execute()
    ↓
IAuthRepository (puerto)
    ↓
SupabaseAuthRepository (adaptador)
    ↓
supabaseClient.auth.signInWithPassword()
    ↓
Supabase 🌐
```

---

## 🎯 Ventajas de esta Estructura

| Problema | Solución |
|----------|----------|
| **Cambiar proveedor (Supabase → Firebase)** | Crea nuevo adaptador, cambia 1 línea en `container.js` |
| **Testear lógica sin BD** | El dominio es testeable sin dependencias |
| **Reutilizar lógica en otro proyecto** | Copiar toda la carpeta `src/modules/auth` |
| **Deuda técnica** | Cada capa tiene responsabilidad clara |
| **Crecimiento descontrolado** | Módulos auto-contenidos y escalables |

---

## 📝 Ejemplo: Cambiar de Supabase a Firebase

### Antes (Acoplado - ❌ NO hacer esto):
```javascript
// ❌ Acoplado a Supabase
import { supabase } from '@/api/supabase';

const login = async (email, password) => {
  const result = await supabase.auth.signInWithPassword({...});
  // Lógica de negocio mezclada con Supabase
};
```

### Después (Desacoplado - ✅ Hexagonal):

**Paso 1: Crear nuevo adaptador**
```javascript
// src/modules/auth/infrastructure/FirebaseAuthRepository.js
import { initializeApp } from 'firebase/app';

export class FirebaseAuthRepository extends IAuthRepository {
  async login(email, password) {
    // Implementación con Firebase
  }
}
```

**Paso 2: Cambiar 1 línea en el container**
```javascript
// src/modules/auth/di/container.js

// this.authRepository = new SupabaseAuthRepository(); ❌ Comenta esto
this.authRepository = new FirebaseAuthRepository(); ✅ Descomenta esto
// ¡Listo! Todo el resto funciona sin cambios
```

**Resultado:**
- Domain: `User.js`, `IAuthRepository.js` → **NO cambian**
- Application: `LoginUserUseCase.js` → **NO cambia**
- UI: `LoginPage.jsx`, `AuthContext.jsx` → **NO cambian**

---

## 💡 Constructor Injection (¿Por qué?)

```javascript
// ❌ Mala: LoginUserUseCase trae su propia dependencia
export class LoginUserUseCase {
  async execute(email, password) {
    const user = await SupabaseAuthRepository.login(email, password); // ❌ Acoplado
  }
}

// ✅ Buena: LoginUserUseCase recibe su dependencia
export class LoginUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email, password) {
    const user = await this.authRepository.login(email, password); // ✅ Desacoplado
  }
}
```

**Por qué Constructor Injection:**
1. **Testeable:** Inyectas un mock sin tocar el código
2. **Flexible:** Cambias adaptadores sin cambiar el caso de uso
3. **Explícito:** Las dependencias están claras en el constructor

---

## 🧪 Testing (Ejemplo)

```javascript
// ✅ Test con adaptador mock (sin Supabase)
import { LoginUserUseCase } from '@/modules/auth/application';

const mockRepository = {
  login: async (email, password) => ({
    id: '123',
    email: email,
  }),
};

const loginUseCase = new LoginUserUseCase(mockRepository);
const user = await loginUseCase.execute('test@test.com', 'pass123');

assert(user.email === 'test@test.com'); // ✅ Pasa
```

---

## 📚 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `src/modules/auth/di/container.js` | **PUNTO ÚNICO de cambio** para swapear infraestructura |
| `src/modules/auth/domain/IAuthRepository.js` | Contrato que deben cumplir todos los adaptadores |
| `src/modules/auth/application/LoginUserUseCase.js` | Lógica de negocio pura (sin dependencias técnicas) |
| `src/shared/infrastructure/supabaseClient.js` | Cliente centralizado (evita múltiples instancias) |
| `src/modules/auth/ui/contexts/AuthContext.jsx` | Bridge entre UI y casos de uso |

---

## 🚀 Próximos Pasos

1. **Crear más módulos:** Inventario, Productos, Reportes, etc.
2. **Implementar LocalAuthRepository:** Para modo offline
3. **Agregar testing:** Jest + React Testing Library
4. **Error handling centralizado:** Crear `AuthErrors.js` en domain
5. **Logging:** Agregar sistema de logs en infrastructure

---

## 📖 Referencias

- [Hexagonal Architecture - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Dependency Injection Pattern](https://refactoring.guru/design-patterns/dependency-injection)
- [Vertical Slicing Architecture](https://jimmybogard.com/vertical-slice-architecture/)
