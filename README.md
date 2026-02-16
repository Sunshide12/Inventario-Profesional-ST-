# Inventario Profesional ST

Inventario Profesional ST es una aplicación web para la gestión profesional de inventarios. Está diseñada para ser clara, escalable y eficiente para equipos técnicos y de producto —ideal para mostrar en procesos de selección técnica o product design.

**Resumen rápido (para reclutadores):**

- **Qué hace:** Gestiona productos, usuarios y sincronización local/ remota del inventario.
- **Por qué importa:** Permite operar sin conexión y sincronizar cambios cuando hay conectividad, reduciendo pérdidas y conflictos en entornos reales.
- **Público objetivo:** Equipos de logística, almacén y pymes que requieren control fiable de inventario.

## Tecnologías principales

- **Frontend:** React + Vite
- **Autenticación / Backend (opcional):** Supabase
- **Almacenamiento local:** base local + lógica de sincronización (`localDb`, `useSync`)

## Puntos destacados para evaluación técnica

- **Arquitectura modular:** Código organizado por módulos (`modules/auth`, `shared`) para facilitar pruebas y mantenibilidad.
- **Sincronización local/remote:** Soporta operaciones offline-first y resolución de conflictos, excelente para escalabilidad a largo plazo.
- **Separation of concerns:** Casos de uso, repositorios e infraestructura desacoplados (clean architecture ligera).

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
- **Prácticas comunitarias:** Usa patrones probados (DI, repositorios, casos de uso), lo que facilita incorporar nuevos desarrolladores y realizar revisiones técnicas en procesos de reclutamiento.

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
