import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { Loading } from '@/components/states/Loading';

type QueryBoundaryProps<T> = {
  query: UseQueryResult<T>;
  children: (data: T) => ReactNode;
  isEmpty?: (data: T) => boolean;
  loading?: ReactNode;
  empty?: ReactNode;
};

function QueryBoundary<T>({
  query,
  children,
  isEmpty,
  loading,
  empty,
}: QueryBoundaryProps<T>) {
  if (query.isPending) return <>{loading ?? <Loading />}</>;
  if (query.isError) {
    return (
      <ErrorState
        description={query.error instanceof Error ? query.error.message : undefined}
        onRetry={() => {
          void query.refetch();
        }}
      />
    );
  }
  const { data } = query;
  if (isEmpty?.(data)) return <>{empty ?? <EmptyState title="Nothing here yet" />}</>;
  return <>{children(data)}</>;
}

export { QueryBoundary };
