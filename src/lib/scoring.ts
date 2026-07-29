import { BudgetRange, ConsultationRequestInput, ServiceType, Timeline } from '@/types/crm';

const BUDGET_POINTS: Record<BudgetRange, number> = {
  'under-1m': 5,
  '1m-10m': 15,
  '10m-50m': 30,
  '50m-200m': 45,
  'over-200m': 55,
};

const TIMELINE_POINTS: Record<Timeline, number> = {
  exploratory: 0,
  'within-6-months': 10,
  'within-3-months': 20,
  immediate: 30,
};

const SERVICE_TYPE_POINTS: Record<ServiceType, number> = {
  'investment-consultancy': 10,
  'feasibility-study': 8,
  'real-estate-valuation': 6,
  'value-engineering': 5,
  'quantity-surveying': 5,
  'market-study': 5,
  'project-marketing': 4,
  other: 0,
};

const DETAILED_MESSAGE_BONUS = 5;
const DETAILED_MESSAGE_THRESHOLD = 100;

/**
 * Scores a consultation request 0–100 from budget, urgency, service type,
 * and message detail, so higher-value/higher-urgency leads surface first
 * in the admin queue without a human triaging every submission by hand.
 */
export function calculatePriorityScore(input: ConsultationRequestInput): number {
  let score = 0;

  score += BUDGET_POINTS[input.budgetRange];
  score += TIMELINE_POINTS[input.timeline];
  score += SERVICE_TYPE_POINTS[input.serviceType];

  if (input.message.trim().length >= DETAILED_MESSAGE_THRESHOLD) {
    score += DETAILED_MESSAGE_BONUS;
  }

  return Math.min(100, Math.max(0, score));
}
