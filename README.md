# Inventario Profesional ST

Inventario Profesional ST es una aplicación web para la gestión profesional de inventarios. Está diseñada para ser clara, escalable y eficiente para equipos de producto y equipos técnicos.

**Resumen rápido:**

- **Qué hace:** Gestiona productos, usuarios y sincroniza el inventario entre almacenamiento local y remoto.
- **Por qué importa:** Opera en modo offline-first y sincroniza cuando hay conectividad, reduciendo pérdidas y conflictos en entornos con conectividad intermitente.
- **Público objetivo:** Equipos de logística, almacén y pymes que necesitan control fiable del stock.

## Estado de implementación

- Actualmente implementado: `Login` y `Register`.
- El resto de funcionalidades (gestión de productos, sincronización completa, paneles y reportes) están en pleno desarrollo.

## Tecnologías principales

- **Frontend:** React + Vite
- **Autenticación / Backend (opcional):** Supabase
- **Almacenamiento local:** base local + lógica de sincronización (`localDb`, `useSync`)

## Estructura del proyecto

Una vista simplificada de la estructura del proyecto que muestra dónde vive cada responsabilidad:

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

Esta disposición muestra cómo una funcionalidad (p. ej. autenticación) está dividida por capas: dominio, casos de uso, infraestructura y UI.

## Puntos destacados

- **Arquitectura modular:** Código organizado por módulos (`modules/auth`, `shared`) para facilitar pruebas y mantenibilidad.
- **Sincronización local/remote:** Soporta operaciones offline-first y resolución de conflictos, excelente para escalabilidad a largo plazo.
- **Separation of concerns:** Casos de uso, repositorios e infraestructura desacoplados (clean architecture ligera).

## Arquitectura: Hexagonal + Vertical Slicing

Se aplica una arquitectura hexagonal (puertos y adaptadores) combinada con vertical slicing. Resumen y motivos:

- **Hexagonal:** Separa la lógica del dominio de los detalles técnicos. El dominio define puertos (interfaces) y la infraestructura implementa adaptadores (p. ej. Supabase, almacenamiento local). Esto permite probar la lógica de negocio sin dependencias externas.
- **Vertical slicing:** En lugar de organizar todo por capas horizontales, cada funcionalidad (slice) agrupa su dominio, casos de uso, adaptadores e interfaz. Cada slice es independiente y entregable por sí sola.

Combinación y beneficios:

- **Desacoplamiento fuerte:** Hexagonal garantiza que el dominio no dependa de frameworks, mientras que vertical slicing mantiene las dependencias locales a cada característica.
- **Entrega más rápida:** Los equipos pueden desarrollar y desplegar slices individuales sin tocar el resto del sistema.
- **Escalabilidad y mantenibilidad:** Facilita refactorizaciones y reemplazo de infraestructuras (p. ej. cambiar Supabase por otro proveedor) con menor impacto.
- **Testing sencillo:** Se pueden probar slices completas (E2E de la característica) y, paralelamente, unit tests del dominio aislado.

En la práctica la comunicación sigue este flujo: UI (componente) → Use Case (caso de uso concreto de la feature) → Puerto (interfaz) → Adaptador (repositorio local o remoto).

## Ejemplo breve de arquitectura

- Cliente (React UI)
  - Hooks y contextos (`useAuth`, `AuthContext`) manejan estado y sesiones.
- Capa de aplicación
  - Use cases (p. ej. `LoginUserUseCase`) encapsulan lógica de negocio.
- Infraestructura
  - Repositorios (Local / Supabase) implementan persistencia y sincronización.

Por ejemplo: UI → Use Case → Repositorio (Local) → Sincronizador → Repositorio (Supabase).

## ¿Por qué es eficiente a largo plazo?

- **Modularidad:** Cada pieza (UI, casos de uso, repositorios) se puede reemplazar o escalar sin reescribir el sistema.
- **Offline-first y sincronización:** Reduce tiempos de inactividad y errores de datos; facilita despliegues en entornos con conectividad intermitente.
- **Buenas prácticas y patrones:** Usa inyección de dependencias, repositorios y casos de uso, lo que facilita la incorporación de desarrolladores y la revisión técnica.

## Para ejecutar (rápido)

Instalar dependencias y levantar el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173` en el navegador.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — construir para producción
- `npm run preview` — previsualizar build de producción
- `npm run lint` — ejecutar ESLint

## Licencia

Proyecto privado.
