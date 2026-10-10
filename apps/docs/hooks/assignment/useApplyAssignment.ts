import { useMutation } from '@tanstack/react-query';
import { applicationService } from '@/services/applicationService';
import type { Application } from '@/types/application.types';

export const useApplyAssignment = {
  apply: () =>
    useMutation<
      Application.ApplyResponse,
      Error,
      Application.ApplyAssignmentRequest
    >({
      mutationFn: (data) => applicationService.apply(data),
    }),
};