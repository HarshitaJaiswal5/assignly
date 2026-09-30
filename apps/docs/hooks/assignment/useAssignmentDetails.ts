import { useQuery } from '@tanstack/react-query';
import { gigApiService } from '@/app/api/assignment/assignment.api';

export const useGigDetails = (gigId: string) => {
  return useQuery({
    queryKey: ['gig-details', gigId],
    queryFn: () => gigApiService.getGigDetails(gigId),
    enabled: Boolean(gigId),
    staleTime: 0,
  });
};