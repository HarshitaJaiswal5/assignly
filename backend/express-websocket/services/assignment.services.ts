import type { CreateAssignmentParams, GigFilterParams } from '@repo/zod-validation/types';
import { assignmentRepository } from '@repositories/assignment.repository.js';
import { PostedAssignment, RequestedAssignment } from '../shared-types/assignment.js';

export const gigServices = {
  getFilteredGigs: async (filters: GigFilterParams) => {
    return assignmentRepository.getGigs(filters);
  },
  getGigDetails: async (gigId: string) => {
    return assignmentRepository.getGigDetails(gigId);
  },
  getPostedAssignments: async (
    userId: string,
  ): Promise<PostedAssignment[]> => {
    const assignments =
      await assignmentRepository.getAssignmentsByUserId(userId);

    return assignments.map((assignment) => ({
      ...assignment,
      _id: assignment.id,
    }));
  },

  getRequestedAssignments: async (
    userId: string,
  ): Promise<RequestedAssignment[]> => {
    const applications =
      await assignmentRepository.getApplicationsByApplicantId(userId);

    const assignmentIds = [
      ...new Set(applications.map((application) => application.gigId)),
    ];

    const assignments =
      await assignmentRepository.getAssignmentsByIds(assignmentIds);

    const assignmentsById = new Map(
      assignments.map((assignment) => [assignment.id, assignment]),
    );

    return applications.flatMap((application) => {
      const assignment = assignmentsById.get(application.gigId);

      if (!assignment) {
        return [];
      }

      return [{
        ...assignment,
        _id: assignment.id,
        applicationId: application.id,
        applicationStatus: application.status,
        negotiatedPrice: application.negotiatedPrice,
        appliedAt: application.createdAt,
      }];
    });
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
