import { describe, expect, it } from 'vitest';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, normalizePagination, toPaginatedResult } from './pagination';

describe('normalizePagination', () => {
  it('defaults to page 1 and the default page size', () => {
    expect(normalizePagination()).toEqual({ page: 1, pageSize: DEFAULT_PAGE_SIZE, offset: 0 });
  });

  it('computes the correct offset for later pages', () => {
    expect(normalizePagination(3, 10)).toEqual({ page: 3, pageSize: 10, offset: 20 });
  });

  it('floors non-integer page and pageSize values', () => {
    expect(normalizePagination(2.9, 15.9)).toEqual({ page: 2, pageSize: 15, offset: 15 });
  });

  it('clamps page below 1 up to 1', () => {
    expect(normalizePagination(0)).toMatchObject({ page: 1, offset: 0 });
    expect(normalizePagination(-5)).toMatchObject({ page: 1, offset: 0 });
  });

  it('clamps pageSize above the maximum', () => {
    expect(normalizePagination(1, 1000)).toMatchObject({ pageSize: MAX_PAGE_SIZE });
  });

  it('clamps pageSize below 1 up to 1', () => {
    expect(normalizePagination(1, 0)).toMatchObject({ pageSize: 1 });
  });
});

describe('toPaginatedResult', () => {
  it('computes totalPages by rounding up', () => {
    const result = toPaginatedResult(['a', 'b'], 25, 1, 10);
    expect(result.totalPages).toBe(3);
  });

  it('reports at least 1 total page even when there are no items', () => {
    const result = toPaginatedResult([], 0, 1, 10);
    expect(result.totalPages).toBe(1);
  });

  it('passes through items, total, page, and pageSize unchanged', () => {
    const items = [1, 2, 3];
    const result = toPaginatedResult(items, 3, 2, 3);
    expect(result).toEqual({ items, total: 3, page: 2, pageSize: 3, totalPages: 1 });
  });
});
