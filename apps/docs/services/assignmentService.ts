import type { GigFilters } from '@/types/gigFilters.types';
import type { Assignment } from '@/types/assignment.types';
import { gigApiService } from '@/app/api/assignment/assignment.api';

export class GigService {
  public async getGigs(
    filters: GigFilters
  ): Promise<Assignment.TrackAssignment[]> {
    return gigApiService.getGigs(filters);
  }
}

export const gigService = new GigService();
