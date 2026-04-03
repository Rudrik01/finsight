/**
 * Frontend-only API types not present in shared/types
 */

/** Count field added by some API responses */
export interface ICategoryBreakdownExtended {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}
