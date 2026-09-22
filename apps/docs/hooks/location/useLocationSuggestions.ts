import { useMutation, useQuery } from '@tanstack/react-query';

import { locationApiService } from '@/app/api/location/location.api';

export const useLocationSuggestions = (
  query: string
) => {
  return useQuery({
    queryKey: ['location-suggestions', query],

    queryFn: () =>
      locationApiService.getSuggestions(query),

    enabled: query.trim().length >= 2,

    staleTime: 5 * 60 * 1000,

    gcTime: 10 * 60 * 1000,

    retry: 1,
  });
};

export const reverseGeocodeMutation = useMutation({
  mutationFn:
    locationApiService.reverseGeocode.bind(
      locationApiService
    ),
});
