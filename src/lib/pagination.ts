import { PaginatedResult } from '@/types/crm';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export interface NormalizedPagination {
  page: number;
  pageSize: number;
  offset: number;
}

export function normalizePagination(page?: number, pageSize?: number): NormalizedPagination {
  const normalizedPage = Math.max(1, Math.floor(page ?? 1));
  const normalizedPageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(pageSize ?? DEFAULT_PAGE_SIZE))
  );
  return {
    page: normalizedPage,
    pageSize: normalizedPageSize,
    offset: (normalizedPage - 1) * normalizedPageSize,
  };
}

export function toPaginatedResult<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number
): PaginatedResult<T> {
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
