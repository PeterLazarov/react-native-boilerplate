import { createContext, useContext, type ReactNode } from 'react';
import { repositories as defaultRepositories } from '@/data';
import { Repositories } from './types';

// Repositories are injected via context so tests (and future variants) can swap
// in fakes without touching screens.
const RepositoriesContext = createContext<Repositories>(defaultRepositories);

export function RepositoriesProvider({
  value = defaultRepositories,
  children,
}: {
  value?: Repositories;
  children: ReactNode;
}) {
  return (
    <RepositoriesContext.Provider value={value}>{children}</RepositoriesContext.Provider>
  );
}

export function useRepositories(): Repositories {
  return useContext(RepositoriesContext);
}
