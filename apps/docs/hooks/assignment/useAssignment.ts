import { useQuery } from '@tanstack/react-query';
import type { GigFilters } from '@/types/gigFilters.types';
import { gigService } from '@/services/assignmentService';

export const useGigs = (filters: GigFilters) => {
  return useQuery({
    queryKey: ['gigs', filters],
    queryFn: () => gigService.getGigs(filters),
    staleTime: 30 * 1000,
  });
};

export const usePostedAssignments = () => {
  return useQuery({
    queryKey: ['my-assignments', 'posted'],
    queryFn: () => gigService.getPostedAssignments(),
    staleTime: 30 * 1000,
  });
};

export const useRequestedAssignments = () => {
  return useQuery({
    queryKey: ['my-assignments', 'requested'],
    queryFn: () => gigService.getRequestedAssignments(),
    staleTime: 30 * 1000,
  });
}
