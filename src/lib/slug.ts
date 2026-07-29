export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Appends -2, -3, ... to `base` until `exists` reports no collision.
 * `exists` should check uniqueness against the current record set,
 * excluding the record being updated (if any).
 */
export function ensureUniqueSlug(base: string, exists: (candidate: string) => boolean): string {
  const slugBase = generateSlug(base) || 'item';
  if (!exists(slugBase)) return slugBase;

  let suffix = 2;
  let candidate = `${slugBase}-${suffix}`;
  while (exists(candidate)) {
    suffix += 1;
    candidate = `${slugBase}-${suffix}`;
  }
  return candidate;
}
