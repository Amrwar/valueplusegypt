import { describe, expect, it } from 'vitest';
import { calculatePriorityScore } from './scoring';
import { ConsultationRequestInput } from '@/types/crm';

function makeInput(overrides: Partial<ConsultationRequestInput> = {}): ConsultationRequestInput {
  return {
    name: 'Test Client',
    email: 'client@example.com',
    phone: '01000000000',
    serviceType: 'other',
    budgetRange: 'under-1m',
    timeline: 'exploratory',
    message: '',
    ...overrides,
  };
}

describe('calculatePriorityScore', () => {
  it('scores the smallest budget and least urgent timeline lowest', () => {
    const score = calculatePriorityScore(
      makeInput({ budgetRange: 'under-1m', timeline: 'exploratory', serviceType: 'other' })
    );
    expect(score).toBe(5);
  });

  it('scores the largest budget and most urgent timeline highest', () => {
    const score = calculatePriorityScore(
      makeInput({
        budgetRange: 'over-200m',
        timeline: 'immediate',
        serviceType: 'investment-consultancy',
      })
    );
    expect(score).toBe(95);
  });

  it('adds a bonus for a detailed message of 100+ characters', () => {
    const shortMessage = makeInput({ message: 'short' });
    const longMessage = makeInput({ message: 'x'.repeat(120) });

    const shortScore = calculatePriorityScore(shortMessage);
    const longScore = calculatePriorityScore(longMessage);

    expect(longScore - shortScore).toBe(5);
  });

  it('does not award the detailed-message bonus at exactly 99 characters', () => {
    const almostLong = makeInput({ message: 'x'.repeat(99) });
    const exactlyLong = makeInput({ message: 'x'.repeat(100) });

    expect(calculatePriorityScore(exactlyLong) - calculatePriorityScore(almostLong)).toBe(5);
  });

  it('never exceeds 100', () => {
    const score = calculatePriorityScore(
      makeInput({
        budgetRange: 'over-200m',
        timeline: 'immediate',
        serviceType: 'investment-consultancy',
        message: 'x'.repeat(200),
      })
    );
    expect(score).toBeLessThanOrEqual(100);
  });

  it('is deterministic for identical inputs', () => {
    const input = makeInput({ budgetRange: '10m-50m', timeline: 'within-3-months' });
    expect(calculatePriorityScore(input)).toBe(calculatePriorityScore(input));
  });
});
