import { apiClient } from '@/lib/api/ApiClient';
import type { GigFilters } from '@/types/gigFilters.types';
import type { Gig } from '@/types/assignment.types';

class GigApiService {
  public async getGigs(filters: GigFilters): Promise<Gig.Item[]> {
    const response = await apiClient.get<Gig.Response>('/gigs', {
      params: {
        search: filters.search.trim() || undefined,
        subject: filters.subject.trim() || undefined,
        college: filters.college.trim() || undefined,
        address: filters.address.trim() || undefined,
        radius: filters.radius || undefined,
        lat: filters.coordinates?.latitude,
        lon: filters.coordinates?.longitude,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      },
    });

    return response.data;
  }
}

export const gigApiService = new GigApiService();