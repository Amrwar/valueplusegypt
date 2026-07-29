import { describe, expect, it } from 'vitest';
import { ensureUniqueSlug, generateSlug } from './slug';

describe('generateSlug', () => {
  it('lowercases and hyphenates spaces', () => {
    expect(generateSlug('New Capital Residential Plot')).toBe('new-capital-residential-plot');
  });

  it('strips punctuation', () => {
    expect(generateSlug("Egypt's 2026 Market Signals!")).toBe('egypts-2026-market-signals');
  });

  it('collapses repeated whitespace and hyphens', () => {
    expect(generateSlug('Too   Many    Spaces')).toBe('too-many-spaces');
    expect(generateSlug('already--hyphenated')).toBe('already-hyphenated');
  });

  it('trims leading and trailing hyphens', () => {
    expect(generateSlug('  -Leading and Trailing-  ')).toBe('leading-and-trailing');
  });

  it('drops non-latin characters entirely', () => {
    expect(generateSlug('مشروع جديد')).toBe('');
  });
});

describe('ensureUniqueSlug', () => {
  it('returns the base slug when there is no collision', () => {
    const result = ensureUniqueSlug('Unique Title', () => false);
    expect(result).toBe('unique-title');
  });

  it('appends -2 on the first collision', () => {
    const existing = new Set(['duplicate-title']);
    const result = ensureUniqueSlug('Duplicate Title', (candidate) => existing.has(candidate));
    expect(result).toBe('duplicate-title-2');
  });

  it('keeps incrementing until a free slug is found', () => {
    const existing = new Set(['taken', 'taken-2', 'taken-3']);
    const result = ensureUniqueSlug('Taken', (candidate) => existing.has(candidate));
    expect(result).toBe('taken-4');
  });

  it('falls back to "item" when the title has no latin characters', () => {
    const result = ensureUniqueSlug('مشروع', () => false);
    expect(result).toBe('item');
  });
});
