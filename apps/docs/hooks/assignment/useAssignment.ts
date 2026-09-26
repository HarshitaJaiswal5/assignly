import { useQuery } from '@tanstack/react-query';
import type { GigFilters } from '@/types/gigFilters.types';
import { gigApiService } from '@/services/assignmentApiService';

export const useGigs = (filters: GigFilters) => {
  return useQuery({
    queryKey: ['gigs', filters],
    queryFn: () => gigApiService.getGigs(filters),
    staleTime: 30 * 1000,
  });
};