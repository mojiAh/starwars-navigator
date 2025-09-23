# Star Wars Navigator

A React + TypeScript + Vite application for browsing the Star Wars universe.  
It uses the [SWAPI](https://swapi.py4e.com/) API to display **planets**, **characters**, and **starships**, with searchable and sortable lists.

---

## Features

- **Planets**
  - Browse all planets with name & population.
  - View planet details: population, climate, films, and residents.
  - Residents link to their character details.

- **Characters**
  - Browse all characters with name & homeworld.
  - View character details: homeworld, starships, and films.
  - Starships and planets are cross-linked.

- **Starships**
  - Browse all starships with name & model.
  - View starship details: model, crew size, and films.

- **Shared functionality**
  - Search & sort lists (by name, homeworld, etc.).
  - Pagination via SWAPI.
  - Reusable components (`ResourceList`, `Pagination`).
  - Reusable hooks (`useCharacters`, `useResourceNames`, etc.).

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- [Vite](https://vitejs.dev/) for fast dev/build  
- [React Router](https://reactrouter.com/) for navigation  
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for testing  
- ESLint + TypeScript rules for code quality  

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Run tests
```bash
npm run test
```


---

## Possible Improvements

- Use React Query (TanStack Query) for caching and background refetching.

- Add UI polish (loading skeletons, spinners).

- Implement virtualized lists for performance with large data.

- Add end-to-end tests (Cypress).

- Deploy via Vercel/Netlify.

## License

MIT — free to use and modify.
