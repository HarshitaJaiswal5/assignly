import type { GigFilterParams } from '@repo/zod-validation/types';

import { getGigs } from '@repositories/assignment.repository.js';

export const getFilteredGigs = async (
  filters: GigFilterParams
) => {
  return getGigs(filters);
};