# Inventario Profesional ST

A professional inventory management web application built with React and Vite.

## Stack

- **React 19** + **Vite 7**
- **Supabase** (backend / auth, planned)
- Local storage and sync (via `localDb` and `useSync`)

## Project structure

- `src/api/` — Supabase client and API
- `src/context/` — Auth context
- `src/hooks/` — Sync and other hooks
- `src/services/` — Local database / storage logic

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command     | Description              |
|------------|--------------------------|
| `npm run dev`    | Start development server |
| `npm run build`  | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`   | Run ESLint               |

## License

Private project.
