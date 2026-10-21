import type { CreateAssignmentParams, GigFilterParams, cr } from '@repo/zod-validation/types';
import { assignmentRepository } from '@repositories/assignment.repository.js';

export const gigServices = {
  getFilteredGigs: async (filters: GigFilterParams) => {
    return assignmentRepository.getGigs(filters);
  },
  getGigDetails: async (gigId: string) => {
    return assignmentRepository.getGigDetails(gigId);
  },
  createAssignment: async (
    assignmentData: CreateAssignmentParams,
    userId: string,
  ) => {
    if (assignmentData.deliveryDate <= new Date()) {
      throw new Error('Delivery date must be in the future');
    }

    return assignmentRepository.createAssignment(
      assignmentData,
      userId,
    );
  },
};
