import type { GigFilterParams } from '@repo/zod-validation/types';
import { assignmentRepository } from '@repositories/assignment.repository.js';

export const gigServices = {
  getFilteredGigs: async (filters: GigFilterParams) => {
    return assignmentRepository.getGigs(filters);
  },
  getGigDetails: async (gigId: string) => {
    return assignmentRepository.getGigDetails(gigId);
  },
};
