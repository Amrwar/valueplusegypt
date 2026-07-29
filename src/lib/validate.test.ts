import { describe, expect, it } from 'vitest';
import { isValidEmail } from './validate';

describe('isValidEmail', () => {
  it('accepts a well-formed email', () => {
    expect(isValidEmail('client@valueplusegypt.com')).toBe(true);
  });

  it('accepts addresses with subdomains and plus tags', () => {
    expect(isValidEmail('user+tag@mail.example.co.uk')).toBe(true);
  });

  it('rejects an address with no @', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('rejects an address with no domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('rejects an address with a space', () => {
    expect(isValidEmail('user name@example.com')).toBe(false);
  });

  it('rejects an address with no TLD', () => {
    expect(isValidEmail('user@example')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});
