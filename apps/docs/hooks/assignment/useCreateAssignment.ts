import { useMutation } from '@tanstack/react-query';
import type { CreateAssignmentPayload } from '@/types/uploadAssignments.types';
import { gigService } from '@/services/assignmentService';

export const useCreateAssignment = () => {
  return useMutation({
    mutationKey: ['create-assignment'],
    mutationFn: (data: CreateAssignmentPayload) =>
      gigService.createAssignment(data),
  });
};