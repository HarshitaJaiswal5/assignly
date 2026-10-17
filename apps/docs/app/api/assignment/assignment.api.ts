import { apiClient } from '@/lib/api/ApiClient';
import type { GigFilters } from '@/types/gigFilters.types';
import type { Assignment } from '@/types/assignment.types';
import { MyAssignments } from '@/types/myAssignments.types';

export class GigApiService {

  public async getGigs(
    filters: GigFilters
  ): Promise<Assignment.TrackAssignment[]> {
    const response = await apiClient.get<Assignment.Response>(
      '/assignment/get',
      {
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
      }
    );

    return response.data;
  }
  
  public async getGigDetails(
    gigId: string
  ): Promise<Assignment.AssignmentDetails> {
    const response = await apiClient.get<Assignment.DetailsResponse>(`/assignment/${gigId}/details`);

    return response.data;
  }

   public async getPostedAssignments(): Promise<MyAssignments.PostedAssignment[]> {
    const response = await apiClient.get<MyAssignments.>(
      '/assignment/my/posted'
    );

    return response.data;
  }

  public async getRequestedAssignments(): Promise<MyAssignments.RequestedAssignment[]> {
    const response = await apiClient.get<Assignment.Response>(
      '/assignment/my/requested'
    );

    return response.data;
  }
}

export const gigApiService = new GigApiService();
